(() => {
  const storageKey = 'anael-portfolio-theme';
  const languageStorageKey = 'anael-portfolio-language';
  const viewStorageKey = 'anael-portfolio-view';
  const root = document.documentElement;
  const english = {
    'Ir al inicio': 'Go to home',
    'Navegacion principal': 'Main navigation',
    Preferencias: 'Preferences',
    'Idioma actual: Español': 'Current language: Spanish',
    'Idioma actual: English': 'Current language: English',
    Experiencia: 'Experience',
    Proyectos: 'Projects',
    Educacion: 'Education',
    Contacto: 'Contact',
    'Desarrollador Frontend / Mobile': 'Frontend / Mobile Developer',
    'Frontend & Mobile Developer': 'Frontend & Mobile Developer',
    'Frontend & Mobile Developer | Portfolio': 'Frontend & Mobile Developer | Portfolio',
    'Construyo interfaces web y mobile que conectan producto, APIs y experiencia de usuario. Trabajo sobre aplicaciones reales en produccion, resolviendo flujos criticos, integraciones y detalles de UI que hacen que una entrega se sienta estable y profesional.':
      'I build web and mobile interfaces that connect product, APIs and user experience. I work on real production apps, solving critical flows, integrations and UI details that make every delivery feel stable and professional.',
    'Desarrollo productos web y mobile con React, React Native, Expo, TypeScript y JavaScript. Actualmente trabajo en una wallet fintech, integrando APIs, corrigiendo bugs productivos y mejorando la experiencia de usuario.':
      'I build web and mobile products with React, React Native, Expo, TypeScript and JavaScript. I currently work on a fintech wallet, integrating APIs, fixing production bugs and improving the user experience.',
    Contactar: 'Contact',
    'Descargar CV': 'Download CV',
    Resumen: 'Summary',
    'Avatar pixel art de Anael Torres': 'Pixel art avatar of Anael Torres',
    'Retrato moderno de Anael Torres': 'Modern portrait of Anael Torres',
    'Disponible para proyectos remotos': 'Available for remote projects',
    'Disponible para proyectos freelance y equipos remotos': 'Available for freelance projects and remote teams',
    'Menu principal': 'Main menu',
    'Producto fintech, herramientas enterprise y trabajo freelance real.':
      'Fintech product work, enterprise tools and real freelance delivery.',
    'Tecnologias que uso para construir, integrar, probar y mantener.':
      'Technologies I use to build, integrate, test and maintain.',
    'Casos concretos donde aporte interfaz, integracion y criterio UX.':
      'Concrete cases where I contributed interface work, integration and UX judgment.',
    'Formacion formal y aprendizaje continuo aplicado a proyectos.':
      'Formal education and continuous learning applied to real projects.',
    'Polynomium, Palta Wallet, Globant, EY y experiencia previa.':
      'Polynomium, Palta Wallet, Globant, EY and previous experience.',
    'Stack tecnico real para web, mobile, APIs y herramientas.':
      'Real technical stack for web, mobile, APIs and tools.',
    'Productos y herramientas en las que trabaje.': 'Products and tools I worked on.',
    'UADE y formacion web frontend.': 'UADE and frontend web training.',
    'Trabajo construyendo interfaces, integrando servicios y resolviendo problemas tecnicos en entornos agiles. Me destaco por adaptarme rapido, trabajar en equipo y cuidar que cada entrega sea clara, estable y facil de mantener.':
      'I work building interfaces, integrating services and solving technical problems in agile environments. I stand out for adapting quickly, working well with teams and making every delivery clear, stable and easy to maintain.',
    'Me especializo en convertir requerimientos en pantallas usables, integradas y listas para produccion. Puedo moverme entre frontend web, mobile, APIs y debugging sin perder de vista lo que necesita el usuario final.':
      'I specialize in turning requirements into usable, integrated screens ready for production. I can move across web frontend, mobile, APIs and debugging without losing sight of the end user.',
    'Mi experiencia combina productos fintech mobile, herramientas internas para EY y formacion continua en desarrollo de software en UADE.':
      'My experience combines mobile fintech products, internal tools for EY and continuous software development training at UADE.',
    'Mi experiencia combina una wallet fintech mobile, herramientas internas para equipos enterprise, proyectos freelance y formacion continua en desarrollo de software en UADE. Busco proyectos donde la calidad de la interfaz, la comunicacion y la velocidad de entrega importen.':
      'My experience combines a mobile fintech wallet, internal tools for enterprise teams, freelance projects and continuous software development training at UADE. I look for projects where interface quality, communication and delivery speed matter.',
    'Desarrollador Frontend / Mobile | Angular retro build': 'Frontend / Mobile Developer | Angular retro build',
    'Desarrollador Frontend / Mobile | Portfolio': 'Frontend / Mobile Developer | Portfolio',
    'Linea temporal de trabajos, productos y clientes con los logos principales de cada etapa.':
      'Timeline of jobs, products and clients with the main logos for each stage.',
    'Una linea temporal de productos, equipos y responsabilidades reales, desde fintech mobile hasta herramientas internas enterprise.':
      'A timeline of real products, teams and responsibilities, from mobile fintech to internal enterprise tools.',
    Actualidad: 'Present',
    'Construccion y mantenimiento de una wallet fintech en produccion para Android e iOS, con foco en estabilidad, seguridad de sesion y experiencia de usuario.':
      'Building and maintaining a production fintech wallet for Android and iOS, focused on stability, session security and user experience.',
    'Desarrollo y mantenimiento de una wallet mobile fintech para Android e iOS.':
      'Development and maintenance of a mobile fintech wallet for Android and iOS.',
    'Implementacion de flujos sensibles: autenticacion, PIN, biometria, terminos y condiciones, navegacion protegida y persistencia de sesion.':
      'Implementation of sensitive flows: authentication, PIN, biometrics, terms and conditions, protected navigation and session persistence.',
    'Implementacion de flujos de autenticacion, PIN, biometria, terminos y condiciones, navegacion protegida y manejo de sesion.':
      'Implementation of authentication flows, PIN, biometrics, terms and conditions, protected navigation and session handling.',
    'Integracion de APIs REST para cuentas, transferencias, actividad, notificaciones y funcionalidades de cuenta empresa.':
      'REST API integration for accounts, transfers, activity, notifications and business account features.',
    'Integracion con APIs REST para cuentas, transferencias, actividad, notificaciones y cuenta empresa.':
      'Integration with REST APIs for accounts, transfers, activity, notifications and business accounts.',
    'Resolucion de bugs productivos en navegacion, Home, actividad, transferencias, onboarding y estados visuales de cuenta.':
      'Resolution of production bugs in navigation, Home, activity, transfers, onboarding and account visual states.',
    'Correccion de bugs productivos en navegacion, Home, actividad, transferencias, Cuenta Empresa y formularios de onboarding.':
      'Fixing production bugs in navigation, Home, activity, transfers, Business Account and onboarding forms.',
    'Diagnostico de inconsistencias entre mobile, web y backend revisando logs, payloads, respuestas de servicios y comportamiento real.':
      'Diagnosis of inconsistencies between mobile, web and backend by reviewing logs, payloads, service responses and real behavior.',
    'Diagnostico de inconsistencias entre mobile, web y backend mediante logs, payloads y comparacion de comportamientos.':
      'Diagnosing inconsistencies between mobile, web and backend using logs, payloads and behavior comparison.',
    'Mejoras de UX/UI en pull to refresh, modales, teclados numericos custom, feedback visual y pantallas de alto uso.':
      'UX/UI improvements in pull to refresh, modals, custom numeric keyboards, visual feedback and high-use screens.',
    'Mejoras de UX/UI en pull to refresh, modales, teclados numericos custom y estados visuales de cuentas.':
      'UX/UI improvements in pull to refresh, modals, custom numeric keyboards and account visual states.',
    'React Native, Expo, TypeScript, JavaScript, Axios, Expo Router, React Navigation, SecureStore, Local Authentication, SignalR, Lottie, Git, Bitbucket, Android Studio y Xcode.':
      'React Native, Expo, TypeScript, JavaScript, Axios, Expo Router, React Navigation, SecureStore, Local Authentication, SignalR, Lottie, Git, Bitbucket, Android Studio and Xcode.',
    'Globant | Proyectos internos para EY': 'Globant | Internal projects for EY',
    'Programador / Desarrollador Web UI': 'Programmer / Web UI Developer',
    'Desarrollo de interfaces internas para entornos enterprise, conectando pantallas, documentacion tecnica y servicios utilizados por equipos de EY.':
      'Development of internal interfaces for enterprise environments, connecting screens, technical documentation and services used by EY teams.',
    'Desarrollo frontend, construccion de interfaces e integracion con APIs en productos internos.':
      'Frontend development, interface building and API integration for internal products.',
    'Catalogo de APIs: construccion de una interfaz web para ordenar documentacion interna y facilitar el acceso a informacion tecnica.':
      'API Catalog: building a web interface to organize internal documentation and make technical information easier to access.',
    'Catalogo de APIs: interfaz web para gestion de documentacion interna de APIs y acceso a informacion.':
      'API Catalog: web interface for managing internal API documentation and accessing information.',
    'Gestion de Prompts: herramienta para administrar comunicaciones basadas en prompts dentro de sistemas corporativos.':
      'Prompt Management: tool to manage prompt-based communications inside corporate systems.',
    'Gestion de Prompts: herramienta para administrar y configurar comunicaciones basadas en prompts dentro de sistemas internos.':
      'Prompt Management: tool to manage and configure prompt-based communications inside internal systems.',
    'EYQ Chat: optimizacion de una aplicacion de chat interna, mejorando la interfaz y la integracion con servicios existentes.':
      'EYQ Chat: optimization of an internal chat application, improving the interface and integration with existing services.',
    'EYQ Chat: desarrollo y optimizacion de una aplicacion de chat interna, mejorando UI e integracion con servicios de EY.':
      'EYQ Chat: development and optimization of an internal chat application, improving UI and integration with EY services.',
    'Trabajo con buenas practicas frontend, reutilizacion de componentes, criterios de mantenimiento y colaboracion en equipos agiles.':
      'Work with frontend best practices, component reuse, maintainability criteria and collaboration in agile teams.',
    'Aplicacion de buenas practicas de desarrollo, reutilizacion de componentes y trabajo colaborativo en equipos agiles.':
      'Application of development best practices, component reuse and collaborative work in agile teams.',
    'HTML5, CSS3, JavaScript y React.': 'HTML5, CSS3, JavaScript and React.',
    'Freelance | Portfolios, landing pages y mejoras UI': 'Freelance | Portfolios, landing pages and UI improvements',
    'Desarrollador Web / Mobile independiente': 'Independent Web / Mobile Developer',
    'Diseño y construccion de presencia digital para profesionales y negocios que necesitan comunicar valor, captar consultas y lanzar rapido.':
      'Design and development of digital presence for professionals and businesses that need to communicate value, capture leads and launch quickly.',
    'Construccion de sitios, interfaces y soluciones digitales para presentar servicios, captar clientes y validar productos.':
      'Building websites, interfaces and digital solutions to present services, capture clients and validate products.',
    'Maquetacion responsive para portfolios, landing pages, pantallas comerciales y primeras versiones de producto.':
      'Responsive layout for portfolios, landing pages, commercial screens and first product versions.',
    'Maquetacion responsive para portfolios, landing pages y pantallas comerciales.':
      'Responsive layouts for portfolios, landing pages and commercial screens.',
    'Integracion de formularios, enlaces de contacto, WhatsApp, CV, perfiles profesionales y llamadas a la accion claras.':
      'Integration of forms, contact links, WhatsApp, CV, professional profiles and clear calls to action.',
    'Integracion de formularios, enlaces de contacto, WhatsApp, CV y perfiles profesionales.':
      'Integration of forms, contact links, WhatsApp, CV and professional profiles.',
    'Organizacion de contenido, mejora visual y adaptacion de estilos a la identidad y objetivo comercial del cliente.':
      'Content organization, visual improvement and style adaptation to the client identity and business goal.',
    'Mejoras visuales, organizacion de contenido y adaptacion de estilos a la identidad del cliente.':
      'Visual improvements, content organization and style adaptation to the client identity.',
    'Angular, React, TypeScript, HTML5, CSS3, JavaScript, Framer y WordPress.':
      'Angular, React, TypeScript, HTML5, CSS3, JavaScript, Framer and WordPress.',
    'Experiencia previa': 'Previous experience',
    Operativo: 'Operations',
    'Empresa Maman | Proveedor de Mercado Libre': 'Empresa Maman | Mercado Libre provider',
    'Logistica y Distribucion': 'Logistics and Distribution',
    'Experiencia operativa previa en logistica y distribucion, con foco en responsabilidad, organizacion y cumplimiento de tiempos.':
      'Previous operations experience in logistics and distribution, focused on responsibility, organization and meeting deadlines.',
    'Distribucion y logistica de productos para una empresa tercerizada vinculada a Mercado Libre.':
      'Product distribution and logistics for a third-party company connected to Mercado Libre.',
    'Gestion diaria de entregas, recorridos y coordinacion operativa.':
      'Daily management of deliveries, routes and operational coordination.',
    'Gestion operativa de entregas y distribucion.': 'Operational management of deliveries and distribution.',
    'Cultura de trabajo basada en responsabilidad, orden, comunicacion clara y cumplimiento.':
      'Work culture based on responsibility, organization, clear communication and follow-through.',
    'Trabajo con responsabilidad, organizacion y cumplimiento de tiempos.':
      'Responsible, organized work with strong time commitment.',
    'Logistica, organizacion y resolucion operativa.': 'Logistics, organization and operational problem solving.',
    'Tecnologias, herramientas y capacidades que uso en proyectos web y mobile.':
      'Technologies, tools and capabilities I use in web and mobile projects.',
    'Stack aplicado en proyectos reales: mobile, frontend, integraciones, debugging y herramientas de entrega.':
      'Stack applied in real projects: mobile, frontend, integrations, debugging and delivery tools.',
    'Skills por tecnologia': 'Skills by technology',
    Lenguajes: 'Languages',
    Integracion: 'Integration',
    Herramientas: 'Tools',
    Otros: 'Other',
    'APIs REST': 'REST APIs',
    'Experiencias destacadas en productos fintech y herramientas internas.':
      'Highlighted experience in fintech products and internal tools.',
    'Una seleccion de productos y herramientas donde trabaje sobre flujos, UI, integraciones y mantenimiento.':
      'A selection of products and tools where I worked on flows, UI, integrations and maintenance.',
    'Catalogo de APIs': 'API Catalog',
    'Gestion de Prompts': 'Prompt Management',
    'Chat interno': 'Internal chat',
    'Wallet mobile para Android e iOS con autenticacion, biometria, transferencias, actividad, notificaciones, cuenta empresa y sesiones protegidas.':
      'Mobile wallet for Android and iOS with authentication, biometrics, transfers, activity, notifications, business account and protected sessions.',
    'Aplicacion mobile fintech para Android e iOS con autenticacion, biometria, transferencias, actividad, notificaciones, cuenta empresa y sesiones protegidas.':
      'Mobile fintech application for Android and iOS with authentication, biometrics, transfers, activity, notifications, business account and protected sessions.',
    'Interfaz web para documentacion interna de APIs, organizada para consulta y acceso eficiente a informacion tecnica.':
      'Web interface for internal API documentation, organized for efficient access to technical information.',
    'Herramienta web para organizar documentacion interna de APIs y acelerar la consulta de informacion tecnica en equipos enterprise.':
      'Web tool to organize internal API documentation and accelerate technical information lookup in enterprise teams.',
    'Herramienta interna para administrar y configurar comunicaciones basadas en prompts dentro de sistemas corporativos.':
      'Internal tool to manage and configure prompt-based communications inside corporate systems.',
    'Panel interno para administrar comunicaciones basadas en prompts, mantener criterios consistentes y simplificar configuraciones corporativas.':
      'Internal panel to manage prompt-based communications, keep criteria consistent and simplify corporate configurations.',
    'Optimizacion de una aplicacion de chat interna, mejorando interfaz de usuario e integracion con servicios de EY.':
      'Optimization of an internal chat application, improving user interface and integration with EY services.',
    'Mejoras de UI e integracion para una aplicacion de chat interna, enfocadas en claridad, velocidad de uso y mantenimiento.':
      'UI and integration improvements for an internal chat application, focused on clarity, speed of use and maintainability.',
    'Formacion tecnica y aprendizaje continuo.': 'Technical education and continuous learning.',
    'Base academica, formacion frontend y aprendizaje continuo aplicado directamente al trabajo diario.':
      'Academic foundation, frontend training and continuous learning applied directly to daily work.',
    '2024 - presente': '2024 - present',
    'Desarrollo de Software': 'Software Development',
    'Ingenieria en Sistemas': 'Systems Engineering',
    'Programacion, metodologias de desarrollo, arquitectura, redes, diseno de sistemas, bases de datos y gestion de proyectos de TI.':
      'Programming, development methodologies, architecture, networks, systems design, databases and IT project management.',
    'Formacion en programacion, arquitectura, redes, diseño de sistemas, bases de datos, metodologias de desarrollo y gestion de proyectos de TI.':
      'Training in programming, architecture, networks, systems design, databases, development methodologies and IT project management.',
    'Carrera en curso con foco en programacion, arquitectura, redes, diseño de sistemas, bases de datos, metodologias de desarrollo y gestion de proyectos de TI.':
      'Degree in progress focused on programming, architecture, networks, systems design, databases, development methodologies and IT project management.',
    'Curso de Desarrollo Web': 'Web Development Course',
    'Formacion frontend': 'Frontend training',
    'HTML5, CSS3, JavaScript, React, interfaces responsivas, buenas practicas de UI y metodologias agiles como Scrum.':
      'HTML5, CSS3, JavaScript, React, responsive interfaces, UI best practices and agile methodologies such as Scrum.',
    'Base tecnica en HTML5, CSS3, JavaScript, React, interfaces responsivas, buenas practicas de UI y trabajo con metodologias agiles.':
      'Technical foundation in HTML5, CSS3, JavaScript, React, responsive interfaces, UI best practices and agile workflows.',
    'Si necesitas construir, mejorar o estabilizar una interfaz web/mobile, escribime. Podemos revisar objetivo, alcance, stack y una primera forma concreta de llevarlo a produccion.':
      'If you need to build, improve or stabilize a web/mobile interface, message me. We can review the goal, scope, stack and a concrete first path to production.',
    'Tenes un proyecto web o mobile para desarrollar? Escribime y vemos requerimientos, alcance, tecnologia y la mejor forma de llevarlo a una primera version funcional.':
      'Do you have a web or mobile project to build? Message me and we can review requirements, scope, technology and the best way to bring it to a functional first version.',
    'Descargar PDF': 'Download PDF',
    'Entender el objetivo, usuarios, alcance y comportamiento esperado':
      'Understand the goal, users, scope and expected behavior',
    'Analisis del requerimiento y comportamiento esperado': 'Requirement analysis and expected behavior',
    'Construir la interfaz, navegacion e integracion con servicios reales':
      'Build the interface, navigation and integration with real services',
    'Desarrollo de interfaz, navegacion e integracion con APIs': 'Interface development, navigation and API integration',
    'Probar flujos criticos, diagnosticar errores y corregir con evidencia':
      'Test critical flows, diagnose issues and fix them with evidence',
    'Pruebas, diagnostico con logs y correccion de bugs': 'Testing, log-based diagnosis and bug fixing',
    'Entregar una version clara, mantenible y lista para iterar':
      'Deliver a clear, maintainable version ready to iterate',
    'Entrega mantenible con foco en calidad y UX': 'Maintainable delivery focused on quality and UX',
    'Anael Torres | Portfolio': 'Anael Torres | Portfolio',
    'Experiencia | Anael Torres': 'Experience | Anael Torres',
    'Proyectos | Anael Torres': 'Projects | Anael Torres',
    'Educacion | Anael Torres': 'Education | Anael Torres',
    'Contacto | Anael Torres': 'Contact | Anael Torres',
  };

  function getTheme() {
    try {
      return window.localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch {
      // Local storage can be unavailable in some browser privacy modes.
    }
  }

  function getLanguage() {
    try {
      return window.localStorage.getItem(languageStorageKey) === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  }

  function getViewMode() {
    try {
      return window.localStorage.getItem(viewStorageKey) === 'retro' ? 'retro' : 'modern';
    } catch {
      return 'modern';
    }
  }

  function saveViewMode(viewMode) {
    try {
      window.localStorage.setItem(viewStorageKey, viewMode);
    } catch {
      // The visual switch should still work when storage is unavailable.
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(languageStorageKey, language);
    } catch {
      // Keep language switching usable even without storage.
    }
  }

  function normalizeText(text) {
    return (text || '').trim().replace(/\s+/g, ' ');
  }

  function registerTranslations() {
    const textSelector = [
      '.js-pixel-title',
      'a',
      'p',
      'span',
      'strong',
      'h1',
      'h2',
      'h3',
      'li',
      'time',
      'small',
    ].join(',');

    document.querySelectorAll(textSelector).forEach((element) => {
      if (
        element.closest('.locale-control__icon') ||
        element.closest('.version-toggle') ||
        element.classList.contains('fallback-title') ||
        element.classList.contains('theme-toggle__icon') ||
        element.classList.contains('locale-control__chevron')
      ) {
        return;
      }

      if (element.matches('.process-list li')) {
        const source = normalizeText(
          Array.from(element.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent)
            .join(' '),
        );

        if (english[source]) {
          element.dataset.i18nProcess = source;
        }

        return;
      }

      const source = normalizeText(element.classList.contains('js-pixel-title') ? element.getAttribute('aria-label') : element.textContent);
      if (english[source]) {
        element.dataset.i18n = source;
      }
    });

    document.querySelectorAll('[aria-label], [alt]').forEach((element) => {
      const aria = normalizeText(element.getAttribute('aria-label'));
      const alt = normalizeText(element.getAttribute('alt'));

      if (english[aria]) {
        element.dataset.i18nAria = aria;
      }

      if (english[alt]) {
        element.dataset.i18nAlt = alt;
      }
    });

    if (!document.documentElement.dataset.i18nTitle) {
      document.documentElement.dataset.i18nTitle = document.title;
    }
  }

  function translateValue(source, language) {
    return language === 'en' ? english[source] || source : source;
  }

  function paintLanguage(language) {
    root.lang = language;
    root.dataset.language = language;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const source = element.dataset.i18n;
      const value = translateValue(source, language);

      if (element.classList.contains('js-pixel-title')) {
        element.setAttribute('aria-label', value);
        const fallback = element.querySelector('.fallback-title') || document.createElement('span');
        fallback.className = 'fallback-title';
        fallback.textContent = value;
        element.textContent = '';
        element.append(fallback);
      } else {
        element.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-process]').forEach((element) => {
      const source = element.dataset.i18nProcess;
      const marker = element.querySelector(':scope > span');
      const value = translateValue(source, language);

      Array.from(element.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .forEach((node) => node.remove());

      if (marker) {
        marker.insertAdjacentText('afterend', value);
      } else {
        element.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      element.setAttribute('aria-label', translateValue(element.dataset.i18nAria, language));
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
      element.setAttribute('alt', translateValue(element.dataset.i18nAlt, language));
    });

    const sourceTitle = document.documentElement.dataset.i18nTitle;
    if (sourceTitle) {
      document.title = translateValue(sourceTitle, language);
    }

    document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
      const text = button.querySelector('.locale-control__text');
      button.setAttribute('aria-label', language === 'en' ? 'Current language: English' : 'Idioma actual: Español');

      if (text) {
        text.textContent = language === 'en' ? 'English' : 'Español';
      }
    });

    paintViewMode(getViewMode());
    window.renderPixelTitles?.();
  }

  function toggleLanguage() {
    const nextLanguage = root.dataset.language === 'en' ? 'es' : 'en';
    saveLanguage(nextLanguage);
    paintLanguage(nextLanguage);
  }

  function paint(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const isLight = theme === 'light';
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('aria-label', isLight ? 'Cambiar a dark mode' : 'Cambiar a light mode');
    });
  }

  function toggleTheme() {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    saveTheme(nextTheme);
    paint(nextTheme);
  }

  function paintViewMode(viewMode, options = {}) {
    root.dataset.view = viewMode;

    document.querySelectorAll('[data-version-toggle]').forEach((button) => {
      const isRetro = viewMode === 'retro';
      button.setAttribute('aria-pressed', String(isRetro));
      button.setAttribute('aria-label', isRetro ? 'Cambiar a version moderna' : 'Cambiar a version 8-bit');
      button.textContent = isRetro ? 'Modern' : '8-bit';
    });

    if (options.replayReveal && viewMode === 'modern') {
      window.requestAnimationFrame(replayRevealAnimations);
    }
  }

  function toggleViewMode() {
    const nextViewMode = root.dataset.view === 'retro' ? 'modern' : 'retro';
    saveViewMode(nextViewMode);
    paintViewMode(nextViewMode, { replayReveal: nextViewMode === 'modern' });
  }

  let revealAnimationsReady = false;
  let revealObserver;
  let revealReducedMotion = false;
  let revealTimers = [];
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

  function getRevealElements() {
    return Array.from(document.querySelectorAll(revealSelector));
  }

  function createRevealObserver() {
    if (revealObserver || revealReducedMotion || !('IntersectionObserver' in window)) {
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.16,
      },
    );
  }

  function prepareRevealElement(element, index) {
    element.classList.add('reveal-item');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
  }

  function setupRevealAnimations() {
    if (revealAnimationsReady) {
      return;
    }

    revealAnimationsReady = true;
    revealReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.add('reveal-ready');

    const elements = getRevealElements();

    if (revealReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element, index) => {
        prepareRevealElement(element, index);
        element.classList.add('is-visible');
      });
      return;
    }

    createRevealObserver();
    elements.forEach((element, index) => {
      prepareRevealElement(element, index);
      revealObserver.observe(element);
    });
  }

  function replayRevealAnimations() {
    setupRevealAnimations();

    const elements = getRevealElements();

    revealTimers.forEach((timer) => window.clearTimeout(timer));
    revealTimers = [];

    if (revealReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element, index) => {
        prepareRevealElement(element, index);
        element.classList.add('is-visible');
      });
      return;
    }

    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = undefined;
    }

    root.classList.add('reveal-ready', 'reveal-replaying');
    elements.forEach((element, index) => {
      prepareRevealElement(element, index);
      element.classList.remove('is-visible');
    });

    document.body.offsetHeight;
    root.classList.add('reveal-ready');
    createRevealObserver();

    window.requestAnimationFrame(() => {
      root.classList.remove('reveal-replaying');
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isInCurrentView = rect.bottom > 0 && rect.top < viewportHeight;

        if (isInCurrentView) {
          const timer = window.setTimeout(() => {
            element.classList.add('is-visible');
          }, 420 + Math.min(index, 8) * 120);
          revealTimers.push(timer);
          return;
        }

        revealObserver.observe(element);
      });
    });
  }

  paintViewMode(getViewMode());
  paint(getTheme());
  registerTranslations();
  paintLanguage(getLanguage());
  setupRevealAnimations();

  window.addEventListener('DOMContentLoaded', () => {
    paint(getTheme());
    registerTranslations();
    paintLanguage(getLanguage());

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
      button.addEventListener('click', toggleLanguage);
    });

    document.querySelectorAll('[data-version-toggle]').forEach((button) => {
      button.addEventListener('click', toggleViewMode);
    });

    setupRevealAnimations();
  });
})();
