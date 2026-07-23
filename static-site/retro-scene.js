import * as THREE from './vendor/three.module.min.js';

(() => {
  const root = document.documentElement;
  const canvas = document.querySelector('[data-premium-scene]');
  const hero = canvas?.closest('.home-screen');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!canvas || !hero) {
    return;
  }

  let renderer;
  let scene;
  let camera;
  let particles;
  let model;
  let fieldGrid;
  let accents;
  let cursorLight;
  let rimLight;
  let animationFrame = 0;
  let initialized = false;
  let running = false;
  let width = 1;
  let height = 1;

  const pointer = { x: 0, y: 0 };
  const smoothPointer = { x: 0, y: 0 };
  const clock = new THREE.Clock();

  function isModernView() {
    return root.dataset.view === 'modern' && !reducedMotion.matches;
  }

  function material(color, emissive = color, emissiveIntensity = 0, options = {}) {
    return new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity,
      roughness: 0.36,
      metalness: 0.14,
      ...options,
    });
  }

  function outlineMaterial(color, opacity = 0.38) {
    return new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
    });
  }

  function outlinedMesh(geometry, meshMaterial, edgeColor = '#65d8ff', edgeOpacity = 0.34) {
    const group = new THREE.Group();
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), outlineMaterial(edgeColor, edgeOpacity));

    edges.scale.setScalar(1.01);
    group.add(mesh, edges);
    return group;
  }

  function createParticles(count) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#65d8ff'),
      new THREE.Color('#7c5cff'),
      new THREE.Color('#b66cff'),
      new THREE.Color('#ff5fd2'),
      new THREE.Color('#f9c74f'),
    ];

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 8.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 7.5 - 2.2;

      const color = palette[i % palette.length];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.66,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
  }

  function createPremiumGrid() {
    const points = [];
    const xLimit = 8;
    const zNear = 2.5;
    const zFar = -6.5;

    for (let x = -xLimit; x <= xLimit; x += 0.85) {
      points.push(new THREE.Vector3(x, -2.35, zNear));
      points.push(new THREE.Vector3(x, -2.35, zFar));
    }

    for (let z = zFar; z <= zNear; z += 0.65) {
      points.push(new THREE.Vector3(-xLimit, -2.35, z));
      points.push(new THREE.Vector3(xLimit, -2.35, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const grid = new THREE.LineSegments(
      geometry,
      new THREE.LineBasicMaterial({
        color: '#65d8ff',
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );

    grid.position.set(0, -0.2, -0.45);
    return grid;
  }

  function createRetroDevice() {
    const group = new THREE.Group();
    const mats = {
      shell: material('#15192c', '#0f1730', 0.3, { roughness: 0.42, metalness: 0.2 }),
      shellDark: material('#070b18', '#111827', 0.16),
      glass: material('#54e4ff', '#1dc7ff', 0.86, { roughness: 0.2, metalness: 0.08 }),
      violet: material('#7c5cff', '#5037ff', 0.52),
      pink: material('#ff5fd2', '#d827b9', 0.58),
      yellow: material('#f9c74f', '#f59e0b', 0.42),
      blue: material('#2563eb', '#1d4ed8', 0.34),
      glow: new THREE.MeshBasicMaterial({
        color: '#65d8ff',
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    };

    const body = outlinedMesh(new THREE.BoxGeometry(2.56, 1.44, 0.36), mats.shell, '#9bebff', 0.42);
    const screenBezel = outlinedMesh(new THREE.BoxGeometry(1.42, 0.84, 0.1), mats.shellDark, '#ff5fd2', 0.34);
    const screen = outlinedMesh(new THREE.BoxGeometry(1.12, 0.58, 0.12), mats.glass, '#ffffff', 0.5);
    const screenGlow = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.78, 0.02), mats.glow);
    const padH = outlinedMesh(new THREE.BoxGeometry(0.48, 0.12, 0.12), mats.violet, '#ffffff', 0.45);
    const padV = outlinedMesh(new THREE.BoxGeometry(0.12, 0.48, 0.13), mats.violet, '#ffffff', 0.45);
    const buttonA = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 18), mats.pink);
    const buttonB = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 18), mats.yellow);
    const buttonC = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.08, 14), mats.blue);
    const cartridge = outlinedMesh(new THREE.BoxGeometry(0.78, 0.2, 0.18), mats.yellow, '#ffffff', 0.34);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.055, 0.52, 12), mats.violet);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 12), mats.pink);
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.025, 0.88, 10), mats.blue);
    const antennaDot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), mats.glass);
    const ringA = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.TorusGeometry(1.78, 0.025, 8, 72)),
      outlineMaterial('#65d8ff', 0.2),
    );
    const ringB = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.TorusGeometry(2.08, 0.018, 8, 72)),
      outlineMaterial('#ff5fd2', 0.16),
    );

    screenBezel.position.set(-0.26, 0.12, 0.26);
    screen.position.set(-0.26, 0.12, 0.34);
    screenGlow.position.set(-0.26, 0.12, 0.39);
    padH.position.set(-0.9, -0.42, 0.31);
    padV.position.set(-0.9, -0.42, 0.32);
    buttonA.position.set(0.76, -0.4, 0.34);
    buttonB.position.set(1.03, -0.22, 0.34);
    buttonC.position.set(0.55, -0.12, 0.34);
    cartridge.position.set(0.44, 0.82, 0.22);
    stick.position.set(0.95, 0.7, 0.18);
    stick.rotation.z = -0.42;
    knob.position.set(0.78, 0.91, 0.32);
    antenna.position.set(-1.15, 1, 0.02);
    antenna.rotation.z = -0.44;
    antennaDot.position.set(-1.32, 1.39, 0.04);
    ringA.position.z = -0.12;
    ringB.position.z = -0.2;

    [buttonA, buttonB, buttonC].forEach((button) => {
      button.rotation.x = Math.PI / 2;
    });

    group.add(
      ringB,
      ringA,
      body,
      screenBezel,
      screen,
      screenGlow,
      padH,
      padV,
      buttonA,
      buttonB,
      buttonC,
      cartridge,
      stick,
      knob,
      antenna,
      antennaDot,
    );
    group.rotation.set(-0.22, -0.52, 0.16);

    return group;
  }

  function createAccents() {
    const group = new THREE.Group();
    const cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const cubeMaterials = [
      material('#65d8ff', '#37c8ff', 0.55),
      material('#ff5fd2', '#d827b9', 0.5),
      material('#f9c74f', '#f59e0b', 0.35),
      material('#7c5cff', '#5037ff', 0.45),
    ];
    const positions = [
      [-3.55, 1.75, -1.35],
      [-2.2, -1.1, -0.9],
      [1.48, 1.45, -1.95],
      [3.25, -1.35, -1.25],
      [0.15, 2.12, -2.8],
    ];

    positions.forEach((position, index) => {
      const cube = outlinedMesh(cubeGeometry, cubeMaterials[index % cubeMaterials.length], '#ffffff', 0.22);
      cube.position.set(position[0], position[1], position[2]);
      cube.userData.baseY = position[1];
      cube.userData.speed = 0.55 + index * 0.12;
      cube.userData.offset = index * 0.7;
      group.add(cube);
    });

    return group;
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));

    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 700 ? 1.15 : 1.55));

    camera.aspect = width / height;
    camera.position.z = width < 760 ? 7.6 : 6.15;
    camera.updateProjectionMatrix();

    if (particles) {
      particles.material.size = width < 760 ? 0.068 : 0.055;
      particles.material.opacity = width < 760 ? 0.5 : 0.66;
    }

    if (model) {
      model.visible = width >= 760;
      model.scale.setScalar(width < 980 ? 0.46 : 0.56);
      model.position.set(width < 980 ? 2.72 : 3.18, 2.24, -1.5);
    }

    if (fieldGrid) {
      fieldGrid.scale.set(width < 760 ? 0.72 : 1, 1, width < 760 ? 0.76 : 1);
      fieldGrid.material.opacity = width < 760 ? 0.14 : 0.2;
    }

    if (accents) {
      accents.visible = width >= 760;
    }
  }

  function init() {
    if (initialized) {
      return;
    }

    initialized = true;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      });
    } catch {
      canvas.hidden = true;
      return;
    }

    renderer.setClearColor(0x000000, 0);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.15);

    particles = createParticles(window.innerWidth < 760 ? 130 : 260);
    fieldGrid = createPremiumGrid();
    model = createRetroDevice();
    accents = createAccents();
    cursorLight = new THREE.PointLight('#65d8ff', 2.35, 9.5);
    rimLight = new THREE.PointLight('#ff5fd2', 1.35, 6.5);

    cursorLight.position.set(0, 1.4, 3.2);
    rimLight.position.set(3.6, 1.8, 1.2);

    scene.add(new THREE.AmbientLight('#9dbdff', 0.72));
    scene.add(new THREE.DirectionalLight('#ffffff', 1.1));
    scene.add(cursorLight, rimLight, fieldGrid, particles, accents, model);

    resize();
    window.addEventListener('resize', resize, { passive: true });
  }

  function animate() {
    if (!running || !renderer) {
      return;
    }

    const delta = Math.min(clock.getDelta(), 0.04);
    const elapsed = clock.elapsedTime;

    smoothPointer.x += (pointer.x - smoothPointer.x) * 0.065;
    smoothPointer.y += (pointer.y - smoothPointer.y) * 0.065;

    particles.rotation.y += delta * 0.038;
    particles.rotation.x = smoothPointer.y * 0.07;
    particles.position.x = smoothPointer.x * 0.16;

    fieldGrid.rotation.z = smoothPointer.x * 0.025;
    fieldGrid.position.x = smoothPointer.x * 0.18;
    fieldGrid.position.y = -0.2 + Math.sin(elapsed * 0.75) * 0.025;

    if (accents.visible) {
      accents.children.forEach((accent, index) => {
        accent.rotation.x += delta * (0.32 + index * 0.04);
        accent.rotation.y += delta * (0.44 + index * 0.035);
        accent.position.y = accent.userData.baseY + Math.sin(elapsed * accent.userData.speed + accent.userData.offset) * 0.12;
      });
    }

    if (model.visible) {
      model.rotation.y += delta * 0.28;
      model.rotation.x = -0.2 + Math.sin(elapsed * 1.15) * 0.07 + smoothPointer.y * 0.11;
      model.rotation.z = 0.14 + smoothPointer.x * 0.1;
      model.position.y = 2.24 + Math.sin(elapsed * 1.28) * 0.12 + smoothPointer.y * 0.08;
      model.position.x = (width < 980 ? 2.72 : 3.18) + smoothPointer.x * 0.24;
    }

    cursorLight.position.set(smoothPointer.x * 3.4, 1.1 + smoothPointer.y * 2.4, 3.1);
    rimLight.position.set(3.2 + smoothPointer.x * 0.7, 1.7 + smoothPointer.y * 0.45, 1.25);
    camera.position.x = smoothPointer.x * 0.18;
    camera.position.y = smoothPointer.y * 0.11;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    animationFrame = window.requestAnimationFrame(animate);
  }

  function start() {
    if (!isModernView()) {
      stop();
      return;
    }

    init();

    if (!renderer || running) {
      return;
    }

    running = true;
    canvas.removeAttribute('hidden');
    resize();
    clock.start();
    animationFrame = window.requestAnimationFrame(animate);
  }

  function stop() {
    running = false;
    window.cancelAnimationFrame(animationFrame);
    canvas.setAttribute('hidden', '');
  }

  function syncMode() {
    if (isModernView() && document.visibilityState === 'visible') {
      start();
    } else {
      stop();
    }
  }

  function updatePointer(event) {
    const x = event.clientX / Math.max(window.innerWidth, 1);
    const y = event.clientY / Math.max(window.innerHeight, 1);
    pointer.x = (x - 0.5) * 2;
    pointer.y = -(y - 0.5) * 2;
    root.style.setProperty('--cursor-x', `${Math.round(x * 100)}%`);
    root.style.setProperty('--cursor-y', `${Math.round(y * 100)}%`);
  }

  function resetTilt(card) {
    card.style.removeProperty('--tilt-rx');
    card.style.removeProperty('--tilt-ry');
    card.style.removeProperty('--tilt-tz');
    card.classList.remove('is-tilting');
  }

  function setupTilt() {
    if (reducedMotion.matches) {
      return;
    }

    document.querySelectorAll('[data-tilt-card]').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        if (root.dataset.view !== 'modern' || event.pointerType === 'touch') {
          resetTilt(card);
          return;
        }

        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / Math.max(rect.width, 1);
        const py = (event.clientY - rect.top) / Math.max(rect.height, 1);

        card.style.setProperty('--tilt-rx', `${(0.5 - py) * 8}deg`);
        card.style.setProperty('--tilt-ry', `${(px - 0.5) * 10}deg`);
        card.style.setProperty('--tilt-tz', '18px');
        card.classList.add('is-tilting');
      });

      card.addEventListener('pointerleave', () => resetTilt(card));
      card.addEventListener('blur', () => resetTilt(card), true);
    });
  }

  const modeObserver = new MutationObserver(syncMode);
  modeObserver.observe(root, {
    attributes: true,
    attributeFilter: ['data-view'],
  });

  window.addEventListener('pointermove', updatePointer, { passive: true });
  document.addEventListener('visibilitychange', syncMode);
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', syncMode);
  } else if (typeof reducedMotion.addListener === 'function') {
    reducedMotion.addListener(syncMode);
  }

  setupTilt();
  syncMode();
})();
