# Portfolio Anael Torres

Portfolio personal con dos versiones visuales: moderna y 8-bit. La version lista para publicar vive en `static-site` y el build final se genera en `dist/portfolio-ready`.

## Desarrollo local

Para ver la version Angular mientras se trabaja:

```bash
npm start
```

Para ver directamente la version estatica:

```bash
npm run start:static
```

## Build para publicar

```bash
npm run build
```

Ese comando valida la version estatica y copia el sitio final a:

```bash
dist/portfolio-ready
```

Esa es la carpeta que se puede subir a Vercel, Netlify, Cloudflare Pages o cualquier hosting estatico.

Vercel esta configurado para servir `dist/portfolio-ready`.

Netlify esta configurado para servir `dist/portfolio-freelance/browser`, que el build genera con la misma version estatica. Esa ruta evita el error del plugin automatico `@netlify/angular-runtime`.

Tambien genera `docs/`, preparada para publicar gratis en GitHub Pages desde el repo `anaeltorres9/artorres-dev`.

Para activar GitHub Pages:

1. Entrar al repo en GitHub.
2. Ir a `Settings`.
3. Abrir `Pages`.
4. En `Build and deployment`, elegir `Deploy from a branch`.
5. Seleccionar branch `main` y carpeta `/docs`.
6. Guardar.

La URL gratuita queda:

```text
https://anaeltorres9.github.io/artorres-dev/
```

## Seguridad incluida

El sitio publicable incluye:

- Content Security Policy para permitir scripts propios y bloquear scripts inline.
- `X-Content-Type-Options: nosniff`.
- `X-Frame-Options: DENY`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` bloqueando permisos no usados.

## Notas

El build Angular original queda disponible como:

```bash
npm run build:angular
```

Para subir online, usar `npm run build` y publicar `dist/portfolio-ready`.

El audit productivo (`npm audit --omit=dev`) debe quedar en `0 vulnerabilities`. El audit completo puede marcar una vulnerabilidad moderada en tooling de desarrollo de Angular CLI; no forma parte del sitio estatico publicado.
