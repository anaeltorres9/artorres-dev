import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, 'static-site');
const distDir = path.join(root, 'dist');
const outputDir = path.join(distDir, 'portfolio-ready');
const netlifyOutputDir = path.join(distDir, 'portfolio-freelance', 'browser');
const githubPagesDir = path.join(root, 'docs');
const serverDir = path.join(distDir, 'server');
const serverEntry = path.join(serverDir, 'index.js');
const githubPagesBasePath = '/artorres-dev';
const threeSourceFile = path.join(root, 'node_modules', 'three', 'build', 'three.module.min.js');
const threeCoreSourceFile = path.join(root, 'node_modules', 'three', 'build', 'three.core.min.js');
const vendorDir = path.join(sourceDir, 'vendor');
const threeVendorFile = path.join(vendorDir, 'three.module.min.js');
const threeCoreVendorFile = path.join(vendorDir, 'three.core.min.js');

const htmlPages = [
  'index.html',
  'experiencia/index.html',
  'skills/index.html',
  'proyectos/index.html',
  'educacion/index.html',
  'contacto/index.html',
];

const requiredStaticFiles = [
  '_headers',
  'vercel.json',
  'styles.css',
  'pixel-title.js',
  'theme-toggle.js',
  'retro-scene.js',
  'vendor/three.module.min.js',
  'vendor/three.core.min.js',
];
const publicRoutes = new Set(['experiencia', 'experiencia/', 'skills', 'skills/', 'proyectos', 'proyectos/', 'educacion', 'educacion/', 'contacto', 'contacto/']);
const forbiddenNames = new Set(['.DS_Store']);

const failures = [];

function fail(message) {
  failures.push(message);
}

function walkFiles(dir, relativeBase = '') {
  return readdirSync(dir).flatMap((entry) => {
    const absolute = path.join(dir, entry);
    const relative = path.join(relativeBase, entry);
    const stats = statSync(absolute);

    if (stats.isDirectory()) {
      return walkFiles(absolute, relative);
    }

    return [relative];
  });
}

function validateNoLocalMetadata() {
  walkFiles(sourceDir).forEach((file) => {
    if (forbiddenNames.has(path.basename(file))) {
      fail(`Archivo local no publicable: ${file}`);
    }
  });
}

function validateRequiredFiles() {
  requiredStaticFiles.forEach((file) => {
    if (!existsSync(path.join(sourceDir, file))) {
      fail(`Falta archivo requerido: ${file}`);
    }
  });

  htmlPages.forEach((file) => {
    if (!existsSync(path.join(sourceDir, file))) {
      fail(`Falta pagina requerida: ${file}`);
    }
  });

  try {
    JSON.parse(readFileSync(path.join(sourceDir, 'vercel.json'), 'utf8'));
  } catch (error) {
    fail(`vercel.json invalido: ${error.message}`);
  }
}

function validateHtmlReferences() {
  htmlPages.forEach((file) => {
    const html = readFileSync(path.join(sourceDir, file), 'utf8');

    if (/<script(?![^>]*\ssrc=)/i.test(html)) {
      fail(`${file}: contiene script inline`);
    }

    for (const match of html.matchAll(/(?:src|href)="\/([^"#?]+)(?:[?#][^"]*)?"/g)) {
      const ref = match[1];

      if (publicRoutes.has(ref)) {
        continue;
      }

      if (!existsSync(path.join(sourceDir, ref))) {
        fail(`${file}: referencia inexistente /${ref}`);
      }
    }
  });
}

function validateHeaders() {
  const headers = readFileSync(path.join(sourceDir, '_headers'), 'utf8');

  [
    'Content-Security-Policy',
    "script-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    'X-Content-Type-Options: nosniff',
    'X-Frame-Options: DENY',
    'Referrer-Policy',
    'Permissions-Policy',
  ].forEach((needle) => {
    if (!headers.includes(needle)) {
      fail(`_headers incompleto: falta ${needle}`);
    }
  });
}

function validateStaticSite() {
  validateRequiredFiles();
  validateNoLocalMetadata();
  validateHtmlReferences();
  validateHeaders();

  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
}

function prepareVendorAssets() {
  if (!existsSync(threeSourceFile) || !existsSync(threeCoreSourceFile)) {
    fail('Falta Three.js local. Ejecuta npm install antes de compilar.');
    return;
  }

  mkdirSync(vendorDir, { recursive: true });
  cpSync(threeSourceFile, threeVendorFile);
  cpSync(threeCoreSourceFile, threeCoreVendorFile);
}

function copyForDeploy() {
  rmSync(distDir, { recursive: true, force: true });
  rmSync(githubPagesDir, { recursive: true, force: true });

  cpSync(sourceDir, distDir, {
    recursive: true,
    filter: (source) => !forbiddenNames.has(path.basename(source)),
  });

  mkdirSync(outputDir, { recursive: true });
  cpSync(sourceDir, outputDir, {
    recursive: true,
    filter: (source) => !forbiddenNames.has(path.basename(source)),
  });
  writeFileSync(path.join(outputDir, '.nojekyll'), '');

  mkdirSync(netlifyOutputDir, { recursive: true });
  cpSync(sourceDir, netlifyOutputDir, {
    recursive: true,
    filter: (source) => !forbiddenNames.has(path.basename(source)),
  });
  writeFileSync(path.join(netlifyOutputDir, '.nojekyll'), '');
}

function prepareGithubPages() {
  mkdirSync(githubPagesDir, { recursive: true });
  cpSync(sourceDir, githubPagesDir, {
    recursive: true,
    filter: (source) => !forbiddenNames.has(path.basename(source)),
  });

  htmlPages.forEach((file) => {
    const pagePath = path.join(githubPagesDir, file);
    const html = readFileSync(pagePath, 'utf8')
      .replaceAll('href="/', `href="${githubPagesBasePath}/`)
      .replaceAll('src="/', `src="${githubPagesBasePath}/`);
    writeFileSync(pagePath, html);
  });

  writeFileSync(path.join(githubPagesDir, '.nojekyll'), '');
}

function writeSitesWorker() {
  mkdirSync(serverDir, { recursive: true });
  writeFileSync(path.join(serverDir, 'package.json'), '{"type":"module"}\n');
  writeFileSync(
    serverEntry,
    `const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)',
};

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  Object.entries(securityHeaders).forEach(([key, value]) => headers.set(key, value));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function safePath(pathname) {
  const normalized = pathname.replace(/\\\\+/g, '/');
  if (normalized.includes('..') || /%2e|%5c/i.test(pathname)) {
    return null;
  }
  return normalized.startsWith('/') ? normalized : \`/\${normalized}\`;
}

function candidatesFor(pathname, acceptsHtml) {
  const cleanPath = safePath(pathname);
  if (!cleanPath) {
    return [];
  }

  const prefixes = ['', '/dist', '/portfolio-ready', '/dist/portfolio-ready'];
  const candidates = [];

  if (cleanPath === '/') {
    return prefixes.map((prefix) => \`\${prefix}/index.html\`);
  }

  const hasExtension = /\\/[^/]+\\.[^/]+$/.test(cleanPath);

  prefixes.forEach((prefix) => {
    candidates.push(\`\${prefix}\${cleanPath}\`);

    if (!hasExtension) {
      candidates.push(\`\${prefix}\${cleanPath.replace(/\\/$/, '')}/index.html\`);
    }

    if (acceptsHtml) {
      candidates.push(\`\${prefix}/index.html\`);
    }
  });

  return [...new Set(candidates.filter(Boolean))];
}

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return withSecurityHeaders(new Response('Method not allowed', { status: 405 }));
    }

    const url = new URL(request.url);
    const acceptsHtml = request.headers.get('accept')?.includes('text/html') ?? false;

    for (const candidate of candidatesFor(url.pathname, acceptsHtml)) {
      const assetUrl = new URL(candidate, request.url);
      const response = await env.ASSETS.fetch(new Request(assetUrl, request));

      if (response.status !== 404) {
        return withSecurityHeaders(response);
      }
    }

    return withSecurityHeaders(new Response('Not found', { status: 404 }));
  },
};
`,
  );
}

prepareVendorAssets();
validateStaticSite();
copyForDeploy();
prepareGithubPages();
writeSitesWorker();

console.log(`Portfolio listo para subir en ${path.relative(root, outputDir)}`);
