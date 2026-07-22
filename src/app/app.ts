import { Component, Input, ViewEncapsulation } from '@angular/core';
import { provideRouter, Route, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

const profile = {
  name: 'Anael Torres',
  heroName: 'Anael Torres',
  initials: 'ART',
  role: 'Frontend & Mobile Developer',
  location: 'Disponible para proyectos freelance y equipos remotos',
  email: 'anaelr.torres@gmail.com',
  phone: '+11 3322 8700',
  whatsapp: 'https://wa.me/541133228700',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/in/anael-torres-2a3438251',
  cv: 'assets/Anael_Roman_Torres_CV.pdf',
  avatar: 'assets/avatar-anael-pixel.png',
  modernAvatar: 'assets/avatar-anael-modern.png',
};

const services = [
  'Aplicaciones mobile con React Native, Expo y TypeScript',
  'Interfaces web modernas con Angular, React y JavaScript',
  'Integracion de APIs, autenticacion, sesiones y estados protegidos',
  'Diagnostico de bugs, mejoras UX/UI y entregas mantenibles',
];

type SkillItem = {
  name: string;
  icon: string;
  note?: string;
};

type SkillGroup = {
  title: string;
  items: SkillItem[];
};

const experience = [
  {
    period: 'Actualidad',
    title: 'Frontend & Mobile Developer',
    company: 'Polynomium',
    project: 'Palta Wallet',
    logo: 'palta',
    logoLabel: 'Palta',
    badge: 'Fintech app',
    description:
      'Construccion y mantenimiento de una wallet fintech en produccion para Android e iOS, con foco en estabilidad, seguridad de sesion y experiencia de usuario.',
    bullets: [
      'Implementacion de flujos sensibles: autenticacion, PIN, biometria, terminos y condiciones, navegacion protegida y persistencia de sesion.',
      'Integracion de APIs REST para cuentas, transferencias, actividad, notificaciones y funcionalidades de cuenta empresa.',
      'Resolucion de bugs productivos en navegacion, Home, actividad, transferencias, onboarding y estados visuales de cuenta.',
      'Diagnostico de inconsistencias entre mobile, web y backend revisando logs, payloads, respuestas de servicios y comportamiento real.',
      'Mejoras de UX/UI en pull to refresh, modales, teclados numericos custom, feedback visual y pantallas de alto uso.',
    ],
    stack:
      'React Native, Expo, TypeScript, JavaScript, Axios, Expo Router, React Navigation, SecureStore, Local Authentication, SignalR, Lottie, Git, Bitbucket, Android Studio y Xcode.',
  },
  {
    period: 'Globant / EY',
    title: 'Programador / Desarrollador Web UI',
    company: 'Globant',
    project: 'Proyectos internos para EY',
    logo: 'globant-ey',
    logoLabel: 'Globant + EY',
    badge: 'Enterprise UI',
    description:
      'Desarrollo de interfaces internas para entornos enterprise, conectando pantallas, documentacion tecnica y servicios utilizados por equipos de EY.',
    bullets: [
      'Catalogo de APIs: construccion de una interfaz web para ordenar documentacion interna y facilitar el acceso a informacion tecnica.',
      'Gestion de Prompts: herramienta para administrar comunicaciones basadas en prompts dentro de sistemas corporativos.',
      'EYQ Chat: optimizacion de una aplicacion de chat interna, mejorando la interfaz y la integracion con servicios existentes.',
      'Trabajo con buenas practicas frontend, reutilizacion de componentes, criterios de mantenimiento y colaboracion en equipos agiles.',
    ],
    stack: 'HTML5, CSS3, JavaScript y React.',
  },
  {
    period: 'Freelance',
    title: 'Desarrollador Web / Mobile independiente',
    company: 'Freelance',
    project: 'Portfolios, landing pages y mejoras UI',
    logo: 'freelance',
    logoLabel: 'Freelance',
    badge: 'Client work',
    description:
      'Diseño y construccion de presencia digital para profesionales y negocios que necesitan comunicar valor, captar consultas y lanzar rapido.',
    bullets: [
      'Maquetacion responsive para portfolios, landing pages, pantallas comerciales y primeras versiones de producto.',
      'Integracion de formularios, enlaces de contacto, WhatsApp, CV, perfiles profesionales y llamadas a la accion claras.',
      'Organizacion de contenido, mejora visual y adaptacion de estilos a la identidad y objetivo comercial del cliente.',
    ],
    stack: 'Angular, React, TypeScript, HTML5, CSS3, JavaScript, Framer y WordPress.',
  },
  {
    period: 'Experiencia previa',
    title: 'Logistica y Distribucion',
    company: 'Empresa Maman',
    project: 'Proveedor de Mercado Libre',
    logo: 'operativo',
    logoLabel: 'Operativo',
    badge: 'Background',
    description:
      'Experiencia operativa previa en logistica y distribucion, con foco en responsabilidad, organizacion y cumplimiento de tiempos.',
    bullets: [
      'Gestion diaria de entregas, recorridos y coordinacion operativa.',
      'Cultura de trabajo basada en responsabilidad, orden, comunicacion clara y cumplimiento.',
    ],
    stack: 'Logistica, organizacion y resolucion operativa.',
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: 'Lenguajes',
    items: [
      { name: 'JavaScript', icon: 'assets/tech/javascript.svg' },
      { name: 'TypeScript', icon: 'assets/tech/typescript.svg' },
      { name: 'HTML', icon: 'assets/tech/html5.svg' },
      { name: 'CSS', icon: 'assets/tech/css3.svg' },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'Angular', icon: 'assets/tech/angular.svg' },
      { name: 'React', icon: 'assets/tech/react.svg' },
      { name: 'React Native', icon: 'assets/tech/react.svg' },
      { name: 'Astro', icon: 'assets/tech/astro.svg' },
      { name: 'Lit', icon: 'assets/tech/lit.svg' },
      { name: 'Solid', icon: 'assets/tech/solid.svg' },
    ],
  },
  {
    title: 'Testing',
    items: [
      { name: 'Jest', icon: 'assets/tech/jest.svg' },
      { name: 'Vitest', icon: 'assets/tech/vitest.svg' },
      { name: 'Playwright', icon: 'assets/tech/playwright.svg' },
    ],
  },
  {
    title: 'Otros',
    items: [
      { name: 'RXJS', icon: 'assets/tech/rxjs.svg' },
      { name: 'Sass', icon: 'assets/tech/sass.svg' },
      { name: 'Storybook', icon: 'assets/tech/storybook.svg' },
      { name: 'Tailwind', icon: 'assets/tech/tailwind.svg' },
      { name: 'Vite', icon: 'assets/tech/vite.svg' },
      { name: 'Webpack', icon: 'assets/tech/webpack.svg' },
      { name: 'Turborepo', icon: 'assets/tech/turborepo.svg' },
      { name: 'NPM', icon: 'assets/tech/npm.svg' },
      { name: 'Redux', icon: 'assets/tech/redux.svg' },
      { name: 'Ionic', icon: 'assets/tech/ionic.svg' },
      { name: 'Cordova', icon: 'assets/tech/cordova.svg' },
      { name: 'ThreeJS', icon: 'assets/tech/threejs.svg' },
    ],
  },
];

const projects = [
  {
    title: 'Palta Wallet',
    type: 'Fintech mobile app',
    description:
      'Aplicacion mobile fintech para Android e iOS con autenticacion, biometria, transferencias, actividad, notificaciones, cuenta empresa y sesiones protegidas.',
  },
  {
    title: 'Catalogo de APIs',
    type: 'EY internal tools',
    description:
      'Herramienta web para organizar documentacion interna de APIs y acelerar la consulta de informacion tecnica en equipos enterprise.',
  },
  {
    title: 'Gestion de Prompts',
    type: 'EY internal tools',
    description:
      'Panel interno para administrar comunicaciones basadas en prompts, mantener criterios consistentes y simplificar configuraciones corporativas.',
  },
  {
    title: 'EYQ Chat',
    type: 'Chat interno',
    description:
      'Mejoras de UI e integracion para una aplicacion de chat interna, enfocadas en claridad, velocidad de uso y mantenimiento.',
  },
];

const education = [
  {
    title: 'Ingenieria en Sistemas',
    place: 'Universidad Argentina de la Empresa (UADE)',
    period: '2024 - presente',
    description:
      'Carrera en curso con foco en programacion, arquitectura, redes, diseño de sistemas, bases de datos, metodologias de desarrollo y gestion de proyectos de TI.',
  },
  {
    title: 'Curso de Desarrollo Web',
    place: 'Formacion frontend',
    period: '2021 - 2022',
    description:
      'Base tecnica en HTML5, CSS3, JavaScript, React, interfaces responsivas, buenas practicas de UI y trabajo con metodologias agiles.',
  },
];

const process = [
  'Entender el objetivo, usuarios, alcance y comportamiento esperado',
  'Construir la interfaz, navegacion e integracion con servicios reales',
  'Probar flujos criticos, diagnosticar errores y corregir con evidencia',
  'Entregar una version clara, mantenible y lista para iterar',
];

type PixelCell = {
  key: string;
  x: number;
  y: number;
};

type PixelLetter = {
  char: string;
  cells: PixelCell[];
  key: string;
};

type PixelWord = {
  letters: PixelLetter[];
  key: string;
  text: string;
};

const pixelGlyphs: Record<string, string[]> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10011', '10001', '10001', '01110'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
};

function makePixelTitle(text: string): PixelWord[] {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z\s]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word, wordIndex) => ({
      key: `${word}-${wordIndex}`,
      text: word,
      letters: [...word].map((char, letterIndex) => {
        const rows = pixelGlyphs[char] ?? pixelGlyphs.A;
        const cells = rows.flatMap((row, y) =>
          [...row]
            .map((value, x) => (value === '1' ? { key: `${wordIndex}-${letterIndex}-${x}-${y}`, x, y } : null))
            .filter((cell): cell is PixelCell => cell !== null),
        );

        return {
          cells,
          char,
          key: `${wordIndex}-${letterIndex}-${char}`,
        };
      }),
    }));
}

@Component({
  selector: 'app-pixel-heading',
  template: `
    <span
      class="pixel-title"
      [class.pixel-title--card]="variant === 'card'"
      [class.pixel-title--page]="variant === 'page'"
      [class.pixel-title--project]="variant === 'project'"
      [class.pixel-title--statement]="variant === 'statement'"
      [attr.aria-label]="text"
      role="heading"
      [attr.aria-level]="level"
    >
      @for (word of pixelTitle; track word.key) {
        <span class="pixel-word" aria-hidden="true">
          @for (letter of word.letters; track letter.key) {
            <span class="pixel-letter">
              @for (cell of letter.cells; track cell.key) {
                <span
                  class="pixel-cell"
                  [class.r0]="cell.y === 0"
                  [class.r1]="cell.y === 1"
                  [class.r2]="cell.y === 2"
                  [class.r3]="cell.y === 3"
                  [class.r4]="cell.y === 4"
                  [class.r5]="cell.y === 5"
                  [class.r6]="cell.y === 6"
                  [style.--x]="cell.x"
                  [style.--y]="cell.y"
                ></span>
              }
            </span>
          }
        </span>
      }
    </span>
  `,
})
class PixelHeadingComponent {
  @Input() level: 1 | 2 = 1;
  @Input() text = '';
  @Input() variant: 'page' | 'card' | 'project' | 'statement' = 'page';

  protected get pixelTitle(): PixelWord[] {
    return makePixelTitle(this.text);
  }
}

@Component({
  selector: 'app-home-page',
  template: `
    <section class="screen home-screen pixel-stage" aria-labelledby="hero-title">
      <div class="crt-card hero-copy">
        <p class="eyebrow">PRESS START - PORTFOLIO</p>
        <h1 id="hero-title" class="pixel-title" [attr.aria-label]="profile.heroName">
          @for (word of pixelTitle; track word.key) {
            <span class="pixel-word" aria-hidden="true">
              @for (letter of word.letters; track letter.key) {
                <span class="pixel-letter">
                  @for (cell of letter.cells; track cell.key) {
                    <span
                      class="pixel-cell"
                      [class.r0]="cell.y === 0"
                      [class.r1]="cell.y === 1"
                      [class.r2]="cell.y === 2"
                      [class.r3]="cell.y === 3"
                      [class.r4]="cell.y === 4"
                      [class.r5]="cell.y === 5"
                      [class.r6]="cell.y === 6"
                      [style.--x]="cell.x"
                      [style.--y]="cell.y"
                    ></span>
                  }
                </span>
              }
            </span>
          }
        </h1>
        <p class="role">{{ profile.role }}</p>
        <p class="hero-text">
          Construyo interfaces web y mobile que conectan producto, APIs y experiencia de usuario.
          Trabajo sobre aplicaciones reales en produccion, resolviendo flujos criticos,
          integraciones y detalles de UI que hacen que una entrega se sienta estable y profesional.
        </p>

        <div class="hero-actions">
          <a class="pixel-button primary" routerLink="/contacto">Contactar</a>
          <a class="pixel-button" [href]="profile.cv" download>Descargar CV</a>
        </div>
      </div>

      <aside class="console-panel game-preview" aria-label="Resumen">
        <div class="avatar-frame">
          <span class="pixel-snow snow-a"></span>
          <span class="pixel-snow snow-b"></span>
          <span class="pixel-platform platform-a"></span>
          <span class="pixel-platform platform-b"></span>
          <img
            class="avatar-image avatar-image--retro"
            [src]="profile.avatar"
            alt="Avatar pixel art de Anael Torres"
          />
          <img
            class="avatar-image avatar-image--modern"
            [src]="profile.modernAvatar"
            alt="Retrato moderno de Anael Torres"
          />
        </div>
        <div class="save-slot">
          <span>MEMORY CARD 01</span>
          <strong>{{ profile.location }}</strong>
        </div>
      </aside>
    </section>

    <section class="menu-grid" aria-label="Menu principal">
      @for (item of menu; track item.path) {
        <a class="menu-card" [routerLink]="item.path">
          <span>{{ item.code }}</span>
          <app-pixel-heading [level]="2" [text]="item.label" variant="card"></app-pixel-heading>
          <p>{{ item.description }}</p>
        </a>
      }
    </section>

    <section class="screen split-screen">
      <div>
        <p class="eyebrow">PLAYER INFO</p>
        <app-pixel-heading
          [level]="2"
          text="Frontend Mobile"
          variant="statement"
        ></app-pixel-heading>
      </div>
      <div class="body-copy">
        <p>
          Me especializo en convertir requerimientos en pantallas usables, integradas y listas para
          produccion. Puedo moverme entre frontend web, mobile, APIs y debugging sin perder de vista
          lo que necesita el usuario final.
        </p>
        <p>
          Mi experiencia combina una wallet fintech mobile, herramientas internas para equipos
          enterprise, proyectos freelance y formacion continua en desarrollo de software en UADE.
          Busco proyectos donde la calidad de la interfaz, la comunicacion y la velocidad de entrega
          importen.
        </p>
      </div>
    </section>
  `,
  imports: [PixelHeadingComponent, RouterLink],
})
class HomePage {
  protected readonly profile = profile;
  protected readonly pixelTitle = makePixelTitle(profile.heroName);
  protected readonly menu = [
    {
      code: 'STAGE 01',
      label: 'Experiencia',
      path: '/experiencia',
      description: 'Producto fintech, herramientas enterprise y trabajo freelance real.',
    },
    {
      code: 'STAGE 02',
      label: 'Skills',
      path: '/skills',
      description: 'Tecnologias que uso para construir, integrar, probar y mantener.',
    },
    {
      code: 'STAGE 03',
      label: 'Proyectos',
      path: '/proyectos',
      description: 'Casos concretos donde aporte interfaz, integracion y criterio UX.',
    },
    {
      code: 'STAGE 04',
      label: 'Educacion',
      path: '/educacion',
      description: 'Formacion formal y aprendizaje continuo aplicado a proyectos.',
    },
  ];
}

@Component({
  selector: 'app-experience-page',
  template: `
    <section class="page-head">
      <p class="eyebrow">STAGE 01</p>
      <app-pixel-heading text="Experiencia"></app-pixel-heading>
      <p>Una linea temporal de productos, equipos y responsabilidades reales, desde fintech mobile hasta herramientas internas enterprise.</p>
    </section>

    <div class="works-timeline">
      @for (item of experience; track item.title) {
        <article class="work-entry">
          <time>{{ item.period }}</time>
          <div class="work-spine">
            <div
              class="work-logo"
              [class.palta]="item.logo === 'palta'"
              [class.globant-ey]="item.logo === 'globant-ey'"
              [class.freelance]="item.logo === 'freelance'"
              [class.operativo]="item.logo === 'operativo'"
              [attr.aria-label]="item.logoLabel"
            >
              @if (item.logo === 'palta') {
                <img class="work-logo-image palta-logo" src="assets/logo-palta-transparent.png" alt="" />
              } @else if (item.logo === 'globant-ey') {
                <span class="logo-pair">
                  <img class="work-logo-image theme-logo theme-logo--dark globant-logo" src="assets/logo-globant-dark.svg" alt="" />
                  <img class="work-logo-image theme-logo theme-logo--light globant-logo" src="assets/logo-globant-light.svg" alt="" />
                  <img class="work-logo-image theme-logo theme-logo--dark ey-logo" src="assets/logo-ey-dark.svg" alt="" />
                  <img class="work-logo-image theme-logo theme-logo--light ey-logo" src="assets/logo-ey-light.svg" alt="" />
                </span>
              } @else if (item.logo === 'freelance') {
                <img class="work-logo-image freelance-logo" src="assets/logo-freelance.svg" alt="" />
              } @else {
                <span>OP</span>
              }
            </div>
          </div>
          <div class="work-card">
            <p class="company">{{ item.company }} | {{ item.project }}</p>
            <span class="work-badge">{{ item.badge }}</span>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <ul>
              @for (bullet of item.bullets; track bullet) {
                <li>{{ bullet }}</li>
              }
            </ul>
            <p class="stack">{{ item.stack }}</p>
          </div>
        </article>
      }
    </div>
  `,
  imports: [PixelHeadingComponent],
})
class ExperiencePage {
  protected readonly experience = experience;
}

@Component({
  selector: 'app-skills-page',
  template: `
    <section class="page-head">
      <p class="eyebrow">STAGE 02</p>
      <app-pixel-heading text="Skills"></app-pixel-heading>
      <p>Stack aplicado en proyectos reales: mobile, frontend, integraciones, debugging y herramientas de entrega.</p>
    </section>

    <section class="skills-screen" aria-label="Skills por tecnologia">
      @for (group of skillGroups; track group.title) {
        <article class="skill-card">
          <header class="skill-card__bar">
            <h2>{{ group.title }}</h2>
            <span>{{ group.items.length }} tech</span>
          </header>

          <div class="skill-container">
            @for (skill of group.items; track skill.name) {
              <div class="skill-icon">
                <span class="skill-icon__frame">
                  <img [src]="skill.icon" [alt]="skill.name + ' logo'" loading="lazy" />
                </span>
                <span class="skill-icon__description">{{ skill.name }}</span>
                @if (skill.note) {
                  <small>{{ skill.note }}</small>
                }
              </div>
            }
          </div>
        </article>
      }
    </section>
  `,
  imports: [PixelHeadingComponent],
})
class SkillsPage {
  protected readonly skillGroups = skillGroups;
}

@Component({
  selector: 'app-projects-page',
  template: `
    <section class="page-head">
      <p class="eyebrow">STAGE 03</p>
      <app-pixel-heading text="Proyectos"></app-pixel-heading>
      <p>Una seleccion de productos y herramientas donde trabaje sobre flujos, UI, integraciones y mantenimiento.</p>
    </section>

    <div class="project-grid">
      @for (project of projects; track project.title) {
        <article class="project-card">
          <p>{{ project.type }}</p>
          <app-pixel-heading [level]="2" [text]="project.title" variant="project"></app-pixel-heading>
          <span>{{ project.description }}</span>
        </article>
      }
    </div>
  `,
  imports: [PixelHeadingComponent],
})
class ProjectsPage {
  protected readonly projects = projects;
}

@Component({
  selector: 'app-education-page',
  template: `
    <section class="page-head">
      <p class="eyebrow">STAGE 04</p>
      <app-pixel-heading text="Educacion"></app-pixel-heading>
      <p>Base academica, formacion frontend y aprendizaje continuo aplicado directamente al trabajo diario.</p>
    </section>

    <div class="education-grid">
      @for (item of education; track item.title) {
        <article class="education-card">
          <p>{{ item.period }}</p>
          <h2>{{ item.title }}</h2>
          <strong>{{ item.place }}</strong>
          <span>{{ item.description }}</span>
        </article>
      }
    </div>
  `,
  imports: [PixelHeadingComponent],
})
class EducationPage {
  protected readonly education = education;
}

@Component({
  selector: 'app-contact-page',
  template: `
    <section class="screen contact-screen">
      <p class="eyebrow">FINAL STAGE</p>
      <app-pixel-heading text="Contacto"></app-pixel-heading>
      <p>
        Si necesitas construir, mejorar o estabilizar una interfaz web/mobile, escribime. Podemos
        revisar objetivo, alcance, stack y una primera forma concreta de llevarlo a produccion.
      </p>

      <div class="contact-grid">
        <a class="contact-card contact-card--email" [href]="'mailto:' + profile.email" aria-label="Enviar email a Anael Torres">
          <div class="contact-logo-shell" aria-hidden="true">
            <img class="contact-logo" src="assets/contact-email.svg" alt="" />
          </div>
          <strong>Email</strong>
          <small>Enviar mensaje</small>
        </a>
        <a class="contact-card contact-card--whatsapp" [href]="profile.whatsapp" target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp de Anael Torres">
          <div class="contact-logo-shell" aria-hidden="true">
            <img class="contact-logo" src="assets/contact-whatsapp.svg" alt="" />
          </div>
          <strong>WhatsApp</strong>
          <small>Escribir ahora</small>
        </a>
        <a class="contact-card contact-card--linkedin" [href]="profile.linkedin" target="_blank" rel="noreferrer" aria-label="Abrir LinkedIn de Anael Torres">
          <div class="contact-logo-shell" aria-hidden="true">
            <img class="contact-logo" src="assets/contact-linkedin.svg" alt="" />
          </div>
          <strong>LinkedIn</strong>
          <small>Ver perfil</small>
        </a>
        <a class="contact-card contact-card--cv" [href]="profile.cv" download aria-label="Descargar CV de Anael Torres">
          <div class="contact-logo-shell" aria-hidden="true">
            <img class="contact-logo" src="assets/contact-cv.svg" alt="" />
          </div>
          <strong>CV</strong>
          <small>Descargar PDF</small>
        </a>
      </div>

      <ol class="process-list">
        @for (step of process; track step) {
          <li>
            <span>0{{ $index + 1 }}</span>
            {{ step }}
          </li>
        }
      </ol>
    </section>
  `,
  imports: [PixelHeadingComponent],
})
class ContactPage {
  protected readonly profile = profile;
  protected readonly process = process;
}

export const routes: Route[] = [
  { path: '', component: HomePage, title: 'Anael Torres | Portfolio' },
  { path: 'experiencia', component: ExperiencePage, title: 'Experiencia | Anael Torres' },
  { path: 'skills', component: SkillsPage, title: 'Skills | Anael Torres' },
  { path: 'proyectos', component: ProjectsPage, title: 'Proyectos | Anael Torres' },
  { path: 'educacion', component: EducationPage, title: 'Educacion | Anael Torres' },
  { path: 'contacto', component: ContactPage, title: 'Contacto | Anael Torres' },
  { path: '**', redirectTo: '' },
];

export const appRouterProviders = [provideRouter(routes)];

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly profile = profile;
  protected themeMode: 'dark' | 'light' = 'dark';
  protected languageMode: 'es' | 'en' = 'es';
  protected viewMode: 'modern' | 'retro' = 'modern';
  private revealReplayTimers: number[] = [];

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      this.themeMode = window.localStorage?.getItem('anael-portfolio-theme') === 'light' ? 'light' : 'dark';
    } catch {
      this.themeMode = 'dark';
    }

    try {
      this.languageMode = window.localStorage?.getItem('anael-portfolio-language') === 'en' ? 'en' : 'es';
    } catch {
      this.languageMode = 'es';
    }

    try {
      this.viewMode = window.localStorage?.getItem('anael-portfolio-view') === 'retro' ? 'retro' : 'modern';
    } catch {
      this.viewMode = 'modern';
    }

    this.applyViewMode();
    this.applyTheme();
    this.applyLanguage();
    this.setupRevealAnimations();
  }

  protected get isLightMode(): boolean {
    return this.themeMode === 'light';
  }

  protected toggleTheme(): void {
    this.themeMode = this.isLightMode ? 'dark' : 'light';

    if (typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem('anael-portfolio-theme', this.themeMode);
      } catch {
        // The button should still work when storage is unavailable.
      }
    }

    this.applyTheme();
  }

  protected get currentLanguageLabel(): string {
    return this.languageMode === 'en' ? 'Current language: English' : 'Idioma actual: Español';
  }

  protected get isRetroMode(): boolean {
    return this.viewMode === 'retro';
  }

  protected get currentViewModeLabel(): string {
    return this.viewMode === 'modern' ? 'Cambiar a version 8-bit' : 'Cambiar a version moderna';
  }

  protected toggleViewMode(): void {
    this.viewMode = this.isRetroMode ? 'modern' : 'retro';

    if (typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem('anael-portfolio-view', this.viewMode);
      } catch {
        // The visual mode should still switch when storage is unavailable.
      }
    }

    this.applyViewMode();
    this.replayRevealAnimations();
  }

  protected toggleLanguage(): void {
    this.languageMode = this.languageMode === 'en' ? 'es' : 'en';

    if (typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem('anael-portfolio-language', this.languageMode);
      } catch {
        // Language switching should still work when storage is unavailable.
      }
    }

    this.applyLanguage();
  }

  private applyTheme(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset['theme'] = this.themeMode;
    }
  }

  private applyLanguage(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.languageMode;
      document.documentElement.dataset['language'] = this.languageMode;
    }
  }

  private applyViewMode(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset['view'] = this.viewMode;
    }
  }

  private setupRevealAnimations(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('reveal-ready');

    if (reducedMotion || !('IntersectionObserver' in window)) {
      window.requestAnimationFrame(() => {
        this.getRevealElements().forEach((element) => {
          element.classList.add('reveal-item', 'is-visible');
        });
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.16,
      },
    );

    const observedElements = new WeakSet<Element>();
    let scanQueued = false;

    const scanRevealElements = () => {
      if (scanQueued) {
        return;
      }

      scanQueued = true;

      window.requestAnimationFrame(() => {
        scanQueued = false;

        this.getRevealElements().forEach((element, index) => {
          if (observedElements.has(element)) {
            return;
          }

          observedElements.add(element);
          element.classList.add('reveal-item');
          element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
          observer.observe(element);
        });
      });
    };

    scanRevealElements();

    const mutationObserver = new MutationObserver(scanRevealElements);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private getRevealElements(): HTMLElement[] {
    if (typeof document === 'undefined') {
      return [];
    }

    const revealSelector = [
      '.home-screen .hero-copy',
      '.home-screen .game-preview',
      '.menu-card',
      '.split-screen',
      '.page-head',
      '.work-entry',
      '.skill-card',
      '.project-card',
      '.education-card',
      '.contact-screen',
      '.contact-card',
      '.process-list li',
    ].join(',');

    return Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
  }

  private replayRevealAnimations(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined' || this.viewMode !== 'modern') {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = this.getRevealElements();
    const root = document.documentElement;

    this.revealReplayTimers.forEach((timer) => window.clearTimeout(timer));
    this.revealReplayTimers = [];

    if (reducedMotion) {
      elements.forEach((element) => {
        element.classList.add('reveal-item', 'is-visible');
      });
      return;
    }

    window.requestAnimationFrame(() => {
      root.classList.add('reveal-ready', 'reveal-replaying');

      elements.forEach((element, index) => {
        element.classList.add('reveal-item');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
        element.classList.remove('is-visible');
      });

      document.body.offsetHeight;
      root.classList.add('reveal-ready');

      window.requestAnimationFrame(() => {
        root.classList.remove('reveal-replaying');
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const isInCurrentView = rect.bottom > 0 && rect.top < viewportHeight;

          if (!isInCurrentView) {
            return;
          }

          const timer = window.setTimeout(() => {
            element.classList.add('is-visible');
          }, 420 + Math.min(index, 8) * 120);

          this.revealReplayTimers.push(timer);
        });
      });
    });
  }
}
