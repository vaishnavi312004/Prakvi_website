import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Cloud, Layers, Users, BarChart3 } from 'lucide-react';

const globeCards = [
  { title: 'Cloud Engineering', subtitle: 'Built to scale', icon: Cloud },
  { title: 'Enterprise Solutions', subtitle: 'Connected systems', icon: Layers },
  { title: 'Talent Solutions', subtitle: 'Specialized workforce', icon: Users },
  { title: 'Data & Analytics', subtitle: 'Actionable insights', icon: BarChart3 },
];

// Global enterprise hub coordinates (lat/long in degrees)
const GLOBAL_HUBS: { name: string; lat: number; lng: number }[] = [
  { name: 'Hyderabad (HQ)', lat: 17.385, lng: 78.4867 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
  { name: 'New York', lat: 40.7128, lng: -74.006 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
];

// Helper to convert lat/long to 3D Cartesian coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate a smooth 3D curved arc above the sphere connecting two points
function createArcBetween(v1: THREE.Vector3, v2: THREE.Vector3, radius: number, elevation = 0.35): THREE.CatmullRomCurve3 {
  const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
  const dist = v1.distanceTo(v2);
  const altitude = radius + dist * elevation;
  mid.normalize().multiplyScalar(altitude);
  return new THREE.CatmullRomCurve3([v1, mid, v2]);
}

// Pre-allocated scratch vectors to prevent GC spikes in animation loop
const _mouseTarget = new THREE.Vector2(0, 0);
const _currentMouse = new THREE.Vector2(0, 0);
const _packetPos = new THREE.Vector3();

interface HeroSceneProps {
  journeyRef?: React.RefObject<{ theme: number; progress: number }>;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ journeyRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Detect software rendering
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
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

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;
    let viewportWidth = width;
    let viewportHeight = height;
    const cardAnchors = globeCards.map((_, index) => {
      const angle = Math.PI / 4 + index * Math.PI / 2;
      return new THREE.Vector3(Math.cos(angle) * 1.65, index % 2 === 0 ? 0.65 : -0.65, Math.sin(angle) * 1.65);
    });
    const cardWorld = new THREE.Vector3();
    const cardScreen = new THREE.Vector3();

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080d19, 0.035);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    container.appendChild(renderer.domElement);

    // 2. Futuristic Studio Lighting Rig with Cyan Glow
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00aeef, 3.2);
    cyanRim.position.set(-5, -2, -3);
    scene.add(cyanRim);

    const secondaryCyan = new THREE.DirectionalLight(0x16b8f3, 2.0);
    secondaryCyan.position.set(3, -4, 2);
    scene.add(secondaryCyan);

    const hemiLight = new THREE.HemisphereLight(0x00aeef, 0x02060d, 0.9);
    scene.add(hemiLight);

    // Root Globe Group
    const globeGroup = new THREE.Group();
    // Default pleasant tilt for realistic planetary alignment
    globeGroup.rotation.x = 0.28;
    globeGroup.rotation.z = -0.12;
    scene.add(globeGroup);

    const GLOBE_RADIUS = 1.35;

    // 3. Inner Dark Obsidian Core Sphere
    const coreGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 48, 48);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x080d19,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: 0x001d3a,
      emissiveIntensity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 4. Digital Grid Mesh & Points (Fibonacci sphere algorithm for uniform glowing network points)
    const DOTS_COUNT = 1600;
    const dotPositions = new Float32Array(DOTS_COUNT * 3);
    const dotColors = new Float32Array(DOTS_COUNT * 3);
    const colorCyan = new THREE.Color(0x00aeef);
    const colorSky = new THREE.Color(0x16b8f3);
    const colorIce = new THREE.Color(0xe0f7fe);

    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < DOTS_COUNT; i++) {
      const y = 1 - (i / (DOTS_COUNT - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      dotPositions[i * 3] = x * GLOBE_RADIUS;
      dotPositions[i * 3 + 1] = y * GLOBE_RADIUS;
      dotPositions[i * 3 + 2] = z * GLOBE_RADIUS;

      // Subtle cyan/ice shimmer gradient
      const chosenColor = i % 7 === 0 ? colorIce : i % 3 === 0 ? colorSky : colorCyan;
      dotColors[i * 3] = chosenColor.r;
      dotColors[i * 3 + 1] = chosenColor.g;
      dotColors[i * 3 + 2] = chosenColor.b;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(pointsMesh);

    // 5. Latitude & Longitude Digital Rings
    const ringsGroup = new THREE.Group();
    globeGroup.add(ringsGroup);

    // 4 Latitude rings
    [-0.5, -0.2, 0.2, 0.5].forEach((latRatio) => {
      const r = Math.sqrt(1 - latRatio * latRatio) * GLOBE_RADIUS;
      const ringGeo = new THREE.RingGeometry(r - 0.003, r + 0.003, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00aeef,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = latRatio * GLOBE_RADIUS;
      ringsGroup.add(ringMesh);
    });

    // Outer Geodesic subtle lattice
    const cageGeo = new THREE.IcosahedronGeometry(GLOBE_RADIUS * 1.05, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x087fc1,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    globeGroup.add(cageMesh);

    // 6. Global Enterprise Hubs (prominent glowing node markers)
    const hubPositions: THREE.Vector3[] = [];
    const hubsGroup = new THREE.Group();
    globeGroup.add(hubsGroup);

    const hubDotGeo = new THREE.SphereGeometry(0.024, 16, 16);
    const hubDotMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const hubRingGeo = new THREE.RingGeometry(0.038, 0.052, 24);
    const hubRingMat = new THREE.MeshBasicMaterial({
      color: 0x00aeef,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });

    GLOBAL_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, GLOBE_RADIUS);
      hubPositions.push(pos);

      // Core white node
      const hubNode = new THREE.Mesh(hubDotGeo, hubDotMat);
      hubNode.position.copy(pos);
      hubsGroup.add(hubNode);

      // Outer cyan target ring aligned with normal
      const ring = new THREE.Mesh(hubRingGeo, hubRingMat);
      ring.position.copy(pos.clone().multiplyScalar(1.004));
      ring.lookAt(pos.clone().multiplyScalar(2));
      hubsGroup.add(ring);
    });

    // 7. Great-Circle Cyber Connectivity Arcs
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    // Connection pairs (indexes in GLOBAL_HUBS)
    const hubConnections: [number, number][] = [
      [0, 1], // Hyderabad -> Bengaluru
      [0, 2], // Hyderabad -> Singapore
      [0, 4], // Hyderabad -> London
      [0, 8], // Hyderabad -> Dubai
      [2, 3], // Singapore -> Tokyo
      [2, 9], // Singapore -> Sydney
      [4, 5], // London -> Frankfurt
      [4, 6], // London -> New York
      [6, 7], // New York -> San Francisco
      [7, 3], // San Francisco -> Tokyo
      [8, 4], // Dubai -> London
    ];

    const arcCurves: THREE.CatmullRomCurve3[] = [];
    const arcMaterials: THREE.LineBasicMaterial[] = [];

    hubConnections.forEach(([i1, i2]) => {
      const v1 = hubPositions[i1];
      const v2 = hubPositions[i2];
      if (!v1 || !v2) return;

      const curve = createArcBetween(v1, v2, GLOBE_RADIUS, 0.28);
      arcCurves.push(curve);

      const points = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x00aeef,
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
      });
      arcMaterials.push(arcMat);

      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);
    });

    // 8. Dynamic Data Packets (Glowing photons traveling along the arcs)
    const PACKETS_COUNT = hubConnections.length * 2;
    const packetGeo = new THREE.SphereGeometry(0.018, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x00aeef,
    });
    const packetMeshGroup = new THREE.Group();
    globeGroup.add(packetMeshGroup);

    const packets: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = [];

    for (let p = 0; p < PACKETS_COUNT; p++) {
      const curveIndex = p % arcCurves.length;
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      packetMeshGroup.add(mesh);
      packets.push({
        mesh,
        curveIndex,
        progress: (p / PACKETS_COUNT),
        speed: 0.18 + Math.random() * 0.12,
      });
    }

    // 9. Soft Outer Atmospheric Halo (Glow Sprite)
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 256;
    haloCanvas.height = 256;
    const hCtx = haloCanvas.getContext('2d');
    if (hCtx) {
      const grad = hCtx.createRadialGradient(128, 128, 40, 128, 128, 128);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
      grad.addColorStop(0.4, 'rgba(0, 158, 219, 0.18)');
      grad.addColorStop(0.7, 'rgba(4, 14, 30, 0.05)');
      grad.addColorStop(1, 'rgba(2, 6, 13, 0)');
      hCtx.fillStyle = grad;
      hCtx.fillRect(0, 0, 256, 256);
    }
    const haloTexture = new THREE.CanvasTexture(haloCanvas);
    const haloGeo = new THREE.PlaneGeometry(GLOBE_RADIUS * 3.4, GLOBE_RADIUS * 3.4);
    const haloMat = new THREE.MeshBasicMaterial({
      map: haloTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    // Position halo slightly behind center of globe
    haloMesh.position.z = -0.2;
    scene.add(haloMesh);

    // 10. Floating Ambient Quantum Dust
    const DUST_COUNT = 90;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = GLOBE_RADIUS * 1.3 + Math.random() * 1.2;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x16b8f3,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const dustMesh = new THREE.Points(dustGeo, dustMat);
    globeGroup.add(dustMesh);

    // 11. Interactive Pointer Parallax
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      if (!reducedMotion.matches) _mouseTarget.set(x * 0.35, y * 0.25);
    };
    window.addEventListener('mousemove', handlePointerMove);

    // 12. Animation Loop with Exponential Damping
    let animationFrameId = 0;
    const clock = new THREE.Clock();
    const darkCore = new THREE.Color(0x080d19);
    const lightCore = new THREE.Color(0xe6eff1);
    const darkGlow = new THREE.Color(0x001d3a);
    const lightGlow = new THREE.Color(0xb4cbd1);
    let lastProgress = journeyRef?.current.progress || 0;

    function renderLoop() {
      const delta = reducedMotion.matches ? 0 : Math.min(clock.getDelta(), 0.1);
      

      // Mouse damping
      const damp = 1 - Math.exp(-4 * delta);
      _currentMouse.lerp(_mouseTarget, damp);

      // Continuous soft spin, plus rotation driven by the same scroll journey.
      const journey = journeyRef?.current;
      const theme = journey?.theme || 0;
      const scrollTurn = reducedMotion.matches ? 0 : ((journey?.progress || 0) - lastProgress) * Math.PI * 0.8;
      lastProgress = journey?.progress || 0;
      globeGroup.rotation.y += delta * 0.055 + scrollTurn;
      coreMat.color.lerpColors(darkCore, lightCore, theme);
      coreMat.emissive.lerpColors(darkGlow, lightGlow, theme);
      coreMat.metalness = 0.85 - theme * 0.6;
      coreMat.roughness = 0.15 + theme * 0.45;
      haloMat.opacity = 0.65 - theme * 0.57;
      cageMat.opacity = 0.14 - theme * 0.04;
      dotMaterial.opacity = 0.85 - theme * 0.4;
      dustMat.opacity = 0.5 - theme * 0.38;
      hubRingMat.opacity = 0.8 - theme * 0.45;
      arcMaterials.forEach(material => { material.opacity = 0.35 - theme * 0.2; });
      pointsMesh.rotation.y += delta * 0.01;
      cageMesh.rotation.y -= delta * 0.02;

      // Gentle interactive tilt towards mouse pointer
      globeGroup.rotation.x = 0.28 + _currentMouse.y * 0.2 * (1 - theme);
      globeGroup.rotation.z = -0.12 - _currentMouse.x * 0.2 * (1 - theme);

      // Update traveling data packets
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];
        p.progress = (p.progress + delta * p.speed * 0.55) % 1;
        const curve = arcCurves[p.curveIndex];
        if (curve) {
          curve.getPointAt(p.progress, _packetPos);
          p.mesh.position.copy(_packetPos);
        }
      }

      // Keep halo facing camera
      haloMesh.lookAt(camera.position);

      renderer.render(scene, camera);

      // Project anchors using the globe's actual matrix so cards share its rotation
      // and pointer tilt. Update DOM transforms directly instead of React each frame.
      const cardWidth = viewportWidth < 400 ? 118 : 150;
      cardAnchors.forEach((anchor, index) => {
        const card = cardRefs.current[index];
        if (!card) return;
        cardWorld.copy(anchor).applyMatrix4(globeGroup.matrixWorld);
        cardScreen.copy(cardWorld).project(camera);
        const visibility = THREE.MathUtils.smoothstep(cardWorld.z, -0.1, 0.65);
        const scale = THREE.MathUtils.clamp(0.88 + cardWorld.z * 0.07, 0.8, 1.02);
        const px = THREE.MathUtils.clamp((cardScreen.x * 0.5 + 0.5) * viewportWidth, cardWidth / 2 + 4, viewportWidth - cardWidth / 2 - 4);
        const py = THREE.MathUtils.clamp((-cardScreen.y * 0.5 + 0.5) * viewportHeight, 48, viewportHeight - 48);
        card.style.width = `${cardWidth}px`;
        card.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${scale})`;
        card.style.opacity = String(visibility);
        card.style.zIndex = String(10 + Math.round(cardWorld.z * 10));
      });
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    // 13. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      viewportWidth = w;
      viewportHeight = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      coreGeo.dispose();
      coreMat.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      hubDotGeo.dispose();
      hubDotMat.dispose();
      hubRingGeo.dispose();
      hubRingMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      haloTexture.dispose();
      arcMaterials.forEach((m) => m.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [journeyRef]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 pointer-events-auto"
      />
      <div className="globe-service-cards" aria-hidden="true">
        {globeCards.map(({ title, subtitle, icon: Icon }, index) => (
          <div key={title} ref={element => { cardRefs.current[index] = element; }} className="globe-service-card">
            <Icon className="globe-service-icon" aria-hidden="true" />
            <strong>{title}</strong>
            <span>{subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
