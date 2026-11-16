import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PrakviThemeId, usePrakviTheme } from '../../context/ThemeContext';

// Global & India enterprise hub coordinates
const GLOBAL_HUBS: { name: string; lat: number; lng: number }[] = [
  { name: 'New Delhi (HQ)', lat: 28.6139, lng: 77.209 },
  { name: 'Nashik', lat: 19.9975, lng: 73.7898 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
  { name: 'New York', lat: 40.7128, lng: -74.006 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
];

interface GlobePalette {
  core: number;
  emissive: number;
  primary: number;
  secondary: number;
  ring: number;
  wire: number;
  packet: number;
}

const THEME_PALETTES: Record<PrakviThemeId, GlobePalette> = {
  'soft-innovation': {
    core: 0xfffdf8,
    emissive: 0xe6f4fc,
    primary: 0x009edb,
    secondary: 0xf97316,
    ring: 0x38bdf8,
    wire: 0x9bd6f3,
    packet: 0xf97316,
  },
  'lavender-mist': {
    core: 0xf8f6fe,
    emissive: 0xe9e3ff,
    primary: 0x6d5ce6,
    secondary: 0x3b9ee8,
    ring: 0x8f82ef,
    wire: 0xb7aff5,
    packet: 0x5846d4,
  },
  'fresh-mint': {
    core: 0xf4fcf9,
    emissive: 0xd8f3eb,
    primary: 0x0d9488,
    secondary: 0x0ea5e9,
    ring: 0x39b8ac,
    wire: 0x8ad7cf,
    packet: 0x0b7b71,
  },
};

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function createArcBetween(
  v1: THREE.Vector3,
  v2: THREE.Vector3,
  radius: number,
  elevation = 0.28
): THREE.CatmullRomCurve3 {
  const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
  const dist = v1.distanceTo(v2);
  mid.normalize().multiplyScalar(radius + dist * elevation);
  return new THREE.CatmullRomCurve3([v1, mid, v2]);
}

const _mouseTarget = new THREE.Vector2(0, 0);
const _currentMouse = new THREE.Vector2(0, 0);
const _packetPos = new THREE.Vector3();

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = usePrakviTheme();
  const themeRef = useRef<PrakviThemeId>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas');
        const gl = probe.getContext('webgl2') || probe.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as WebGLRenderingContext).RENDERER;
        const gpu = String((gl as WebGLRenderingContext).getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const initialW = container.clientWidth || 480;
    const initialH = container.clientHeight || 460;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, initialW / initialH, 0.1, 100);
    camera.position.set(0, 0.08, 4.35);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialW, initialH);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();

    // Soft light ceramic studio lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xeef6fc, 1.1);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x079ceb, 1.4);
    rimLight.position.set(-4, 4, -4);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xddebf7, 1.1);
    scene.add(hemiLight);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.24;
    globeGroup.rotation.z = -0.1;
    scene.add(globeGroup);

    const GLOBE_RADIUS = 1.32;
    const initPalette = THEME_PALETTES[themeRef.current];

    // 1. Pearlescent Clay-Glass Inner Core Sphere
    const coreGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.96, 48, 48);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: initPalette.core,
      roughness: 0.28,
      metalness: 0.06,
      clearcoat: 0.85,
      clearcoatRoughness: 0.16,
      emissive: initPalette.emissive,
      emissiveIntensity: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 2. Fibonacci Surface Network Nodes
    const DOTS_COUNT = 1350;
    const dotPositions = new Float32Array(DOTS_COUNT * 3);
    const dotColors = new Float32Array(DOTS_COUNT * 3);
    const phiSpan = Math.PI * (3 - Math.sqrt(5));

    const colA = new THREE.Color(initPalette.primary);
    const colB = new THREE.Color(initPalette.secondary);
    const colSoft = new THREE.Color(0xbcdaf3);

    for (let i = 0; i < DOTS_COUNT; i++) {
      const y = 1 - (i / (DOTS_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;
      dotPositions[i * 3] = Math.cos(theta) * radiusAtY * GLOBE_RADIUS;
      dotPositions[i * 3 + 1] = y * GLOBE_RADIUS;
      dotPositions[i * 3 + 2] = Math.sin(theta) * radiusAtY * GLOBE_RADIUS;

      const c = i % 5 === 0 ? colB : i % 3 === 0 ? colSoft : colA;
      dotColors[i * 3] = c.r;
      dotColors[i * 3 + 1] = c.g;
      dotColors[i * 3 + 2] = c.b;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
    });
    const pointsMesh = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(pointsMesh);

    // 3. Soft Outer Geodesic Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(GLOBE_RADIUS * 1.045, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: initPalette.wire,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    globeGroup.add(cageMesh);

    // 4. Dual Tilted Clay-Light Orbital Rings
    const orbitMaterialA = new THREE.MeshBasicMaterial({
      color: initPalette.ring,
      transparent: true,
      opacity: 0.42,
    });
    const orbitGeoA = new THREE.TorusGeometry(GLOBE_RADIUS * 1.24, 0.009, 12, 96);
    const orbitRingA = new THREE.Mesh(orbitGeoA, orbitMaterialA);
    orbitRingA.rotation.x = Math.PI * 0.38;
    orbitRingA.rotation.y = 0.3;
    globeGroup.add(orbitRingA);

    const orbitMaterialB = new THREE.MeshBasicMaterial({
      color: initPalette.secondary,
      transparent: true,
      opacity: 0.34,
    });
    const orbitGeoB = new THREE.TorusGeometry(GLOBE_RADIUS * 1.32, 0.007, 12, 96);
    const orbitRingB = new THREE.Mesh(orbitGeoB, orbitMaterialB);
    orbitRingB.rotation.x = -Math.PI * 0.32;
    orbitRingB.rotation.z = 0.45;
    globeGroup.add(orbitRingB);

    // 5. Hub Markers & Great-Circle Arcs
    const hubPositions: THREE.Vector3[] = [];
    const hubDotGeo = new THREE.SphereGeometry(0.028, 16, 16);
    const hubDotMat = new THREE.MeshBasicMaterial({ color: initPalette.primary });
    const hubRingGeo = new THREE.RingGeometry(0.042, 0.058, 24);
    const hubRingMat = new THREE.MeshBasicMaterial({
      color: initPalette.secondary,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });

    GLOBAL_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, GLOBE_RADIUS * 1.005);
      hubPositions.push(pos);

      const node = new THREE.Mesh(hubDotGeo, hubDotMat);
      node.position.copy(pos);
      globeGroup.add(node);

      const ring = new THREE.Mesh(hubRingGeo, hubRingMat);
      ring.position.copy(pos.clone().multiplyScalar(1.006));
      ring.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(ring);
    });

    const hubConnections: [number, number][] = [
      [0, 1],
      [0, 2],
      [0, 4],
      [0, 8],
      [2, 3],
      [2, 9],
      [4, 5],
      [4, 6],
      [6, 7],
      [7, 3],
      [8, 4],
    ];

    const arcCurves: THREE.CatmullRomCurve3[] = [];
    const arcGeometries: THREE.BufferGeometry[] = [];
    const arcMat = new THREE.LineBasicMaterial({
      color: initPalette.primary,
      transparent: true,
      opacity: 0.42,
    });

    hubConnections.forEach(([i1, i2]) => {
      const v1 = hubPositions[i1];
      const v2 = hubPositions[i2];
      if (!v1 || !v2) return;
      const curve = createArcBetween(v1, v2, GLOBE_RADIUS, 0.25);
      arcCurves.push(curve);
      const pts = curve.getPoints(48);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);
      arcGeometries.push(arcGeo);
      globeGroup.add(new THREE.Line(arcGeo, arcMat));
    });

    // 6. Traveling Data Packets along arcs
    const PACKETS_COUNT = hubConnections.length * 2;
    const packetGeo = new THREE.SphereGeometry(0.022, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: initPalette.packet });
    const packets: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = [];

    for (let p = 0; p < PACKETS_COUNT; p++) {
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      globeGroup.add(mesh);
      packets.push({
        mesh,
        curveIndex: p % arcCurves.length,
        progress: p / PACKETS_COUNT,
        speed: 0.16 + (p % 5) * 0.03,
      });
    }

    // 7. Ambient Soft Floating Dust Particles
    const DUST_COUNT = 64;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = GLOBE_RADIUS * 1.28 + ((i % 7) / 7) * 0.7;
      const u = (i * 0.6180339887) % 1;
      const v = ((i * 0.381966) % 0.8) + 0.1;
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: initPalette.primary,
      size: 0.024,
      transparent: true,
      opacity: 0.45,
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    globeGroup.add(dustMesh);

    const handlePointerMove = (e: MouseEvent) => {
      if (reducedMotion.matches) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      _mouseTarget.set(
        THREE.MathUtils.clamp(x, -1, 1) * 0.28,
        THREE.MathUtils.clamp(y, -1, 1) * 0.22
      );
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    let animationFrameId = 0;
    const clock = new THREE.Clock();
    let appliedTheme: PrakviThemeId = themeRef.current;

    const targetCore = new THREE.Color();
    const targetEmissive = new THREE.Color();
    const targetPrimary = new THREE.Color();
    const targetSecondary = new THREE.Color();
    const targetRing = new THREE.Color();
    const targetWire = new THREE.Color();
    const targetPacket = new THREE.Color();

    const applyThemeInstant = (nextId: PrakviThemeId) => {
      const p = THEME_PALETTES[nextId];
      targetCore.setHex(p.core);
      targetEmissive.setHex(p.emissive);
      targetPrimary.setHex(p.primary);
      targetSecondary.setHex(p.secondary);
      targetRing.setHex(p.ring);
      targetWire.setHex(p.wire);
      targetPacket.setHex(p.packet);
    };
    applyThemeInstant(appliedTheme);

    function renderLoop() {
      const delta = reducedMotion.matches ? 0 : Math.min(clock.getDelta(), 0.1);

      if (themeRef.current !== appliedTheme) {
        appliedTheme = themeRef.current;
        applyThemeInstant(appliedTheme);
      }

      const colorDamp = reducedMotion.matches ? 1 : 1 - Math.exp(-6 * Math.max(delta, 0.016));
      coreMat.color.lerp(targetCore, colorDamp);
      coreMat.emissive.lerp(targetEmissive, colorDamp);
      rimLight.color.lerp(targetPrimary, colorDamp);
      cageMat.color.lerp(targetWire, colorDamp);
      orbitMaterialA.color.lerp(targetRing, colorDamp);
      orbitMaterialB.color.lerp(targetSecondary, colorDamp);
      hubDotMat.color.lerp(targetPrimary, colorDamp);
      hubRingMat.color.lerp(targetSecondary, colorDamp);
      arcMat.color.lerp(targetPrimary, colorDamp);
      packetMat.color.lerp(targetPacket, colorDamp);
      dustMat.color.lerp(targetPrimary, colorDamp);

      const damp = 1 - Math.exp(-4 * delta);
      _currentMouse.lerp(_mouseTarget, damp);

      globeGroup.rotation.y += delta * 0.12;
      pointsMesh.rotation.y += delta * 0.025;
      cageMesh.rotation.y -= delta * 0.03;
      orbitRingA.rotation.z += delta * 0.18;
      orbitRingB.rotation.y -= delta * 0.14;

      if (!reducedMotion.matches) {
        globeGroup.rotation.x = 0.24 + _currentMouse.y * 0.18;
        globeGroup.rotation.z = -0.1 - _currentMouse.x * 0.18;
      }

      for (let i = 0; i < packets.length; i++) {
        const pkt = packets[i];
        pkt.progress = (pkt.progress + delta * pkt.speed) % 1;
        const curve = arcCurves[pkt.curveIndex];
        if (curve) {
          curve.getPointAt(pkt.progress, _packetPos);
          pkt.mesh.position.copy(_packetPos);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(240, Math.floor(entry.contentRect.width));
      const h = Math.max(240, Math.floor(entry.contentRect.height));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);

      coreGeo.dispose();
      coreMat.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      orbitGeoA.dispose();
      orbitMaterialA.dispose();
      orbitGeoB.dispose();
      orbitMaterialB.dispose();
      hubDotGeo.dispose();
      hubDotMat.dispose();
      hubRingGeo.dispose();
      hubRingMat.dispose();
      arcGeometries.forEach((g) => g.dispose());
      arcMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      envTarget.dispose();
      pmremGenerator.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full pointer-events-auto"
      aria-hidden="true"
    />
  );
};
