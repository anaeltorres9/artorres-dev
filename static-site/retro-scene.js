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
  let cursorLight;
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

  function createParticles(count) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#65d8ff'),
      new THREE.Color('#7c5cff'),
      new THREE.Color('#b66cff'),
      new THREE.Color('#f9c74f'),
    ];

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 16;
      positions[i3 + 1] = (Math.random() - 0.5) * 9;
      positions[i3 + 2] = (Math.random() - 0.5) * 7 - 2;

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
        size: width < 700 ? 0.045 : 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.68,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
  }

  function createRetroConsole() {
    const group = new THREE.Group();
    const shell = new THREE.MeshStandardMaterial({
      color: '#181d35',
      roughness: 0.44,
      metalness: 0.18,
      emissive: '#111827',
      emissiveIntensity: 0.2,
    });
    const screen = new THREE.MeshStandardMaterial({
      color: '#65d8ff',
      roughness: 0.25,
      metalness: 0.08,
      emissive: '#37c8ff',
      emissiveIntensity: 0.55,
    });
    const violet = new THREE.MeshStandardMaterial({
      color: '#7c5cff',
      roughness: 0.32,
      metalness: 0.12,
      emissive: '#4f46e5',
      emissiveIntensity: 0.36,
    });
    const pink = new THREE.MeshStandardMaterial({
      color: '#ff5fd2',
      roughness: 0.34,
      metalness: 0.1,
      emissive: '#b66cff',
      emissiveIntensity: 0.34,
    });
    const yellow = new THREE.MeshStandardMaterial({
      color: '#f9c74f',
      roughness: 0.36,
      metalness: 0.12,
      emissive: '#f59e0b',
      emissiveIntensity: 0.3,
    });

    const body = new THREE.Mesh(new THREE.BoxGeometry(2.05, 1.18, 0.32), shell);
    const face = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.92, 0.08), screen);
    const padH = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.14, 0.1), violet);
    const padV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.52, 0.1), violet);
    const buttonA = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 18), pink);
    const buttonB = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 18), yellow);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.54, 14), violet);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.18, 18, 14), pink);

    face.position.z = 0.21;
    face.position.y = 0.05;
    padH.position.set(-0.55, -0.27, 0.32);
    padV.position.set(-0.55, -0.27, 0.33);
    buttonA.position.set(0.55, -0.27, 0.33);
    buttonA.rotation.x = Math.PI / 2;
    buttonB.position.set(0.9, -0.12, 0.33);
    buttonB.rotation.x = Math.PI / 2;
    stick.position.set(0.22, 0.86, 0.05);
    stick.rotation.z = -0.42;
    knob.position.set(0.06, 1.11, 0.12);

    group.add(body, face, padH, padV, buttonA, buttonB, stick, knob);
    group.rotation.set(-0.2, -0.45, 0.18);
    group.position.set(2.95, -0.1, -1.4);
    group.scale.setScalar(width < 800 ? 0.54 : 0.72);

    return group;
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));

    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 700 ? 1.15 : 1.6));

    camera.aspect = width / height;
    camera.position.z = width < 760 ? 8.2 : 6.4;
    camera.updateProjectionMatrix();

    if (model) {
      model.visible = width >= 760;
      model.scale.setScalar(width < 760 ? 0.42 : 0.62);
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

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    particles = createParticles(window.innerWidth < 760 ? 90 : 210);
    model = createRetroConsole();
    cursorLight = new THREE.PointLight('#65d8ff', 2.1, 8.5);

    scene.add(new THREE.AmbientLight('#9dbdff', 0.82));
    scene.add(cursorLight);
    scene.add(new THREE.DirectionalLight('#ffffff', 1.25));
    scene.add(particles, model);

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

    particles.rotation.y += delta * 0.045;
    particles.rotation.x = smoothPointer.y * 0.08;

    if (model.visible) {
      model.rotation.y += delta * 0.32;
      model.rotation.x = -0.16 + Math.sin(elapsed * 1.2) * 0.08 + smoothPointer.y * 0.12;
      model.rotation.z = 0.14 + smoothPointer.x * 0.12;
      model.position.y = 2.05 + Math.sin(elapsed * 1.4) * 0.14;
      model.position.x = 2.05 + smoothPointer.x * 0.24;
    }

    cursorLight.position.set(smoothPointer.x * 3.5, smoothPointer.y * 2.4, 2.8);
    camera.position.x = smoothPointer.x * 0.18;
    camera.position.y = smoothPointer.y * 0.12;
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
