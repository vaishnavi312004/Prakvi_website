import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

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

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071d3a, 0.035);

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

    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 3.2);
    cyanRim.position.set(-5, -2, -3);
    scene.add(cyanRim);

    const secondaryCyan = new THREE.DirectionalLight(0x38bdf8, 2.0);
    secondaryCyan.position.set(3, -4, 2);
    scene.add(secondaryCyan);

    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0x02060d, 0.9);
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
      color: 0x030d1e,
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
    const colorCyan = new THREE.Color(0x00f0ff);
    const colorSky = new THREE.Color(0x38bdf8);
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
        color: 0x00f0ff,
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
      color: 0x009edb,
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
      color: 0x00f0ff,
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
        color: 0x00f0ff,
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
      color: 0x00f0ff,
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
      color: 0x38bdf8,
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
      _mouseTarget.set(x * 0.35, y * 0.25);
    };
    window.addEventListener('mousemove', handlePointerMove);

    // 12. Animation Loop with Exponential Damping
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    function renderLoop() {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Mouse damping
      const damp = 1 - Math.exp(-4 * delta);
      _currentMouse.lerp(_mouseTarget, damp);

      // Smooth auto-rotation of the digital network globe
      globeGroup.rotation.y += delta * 0.18;
      pointsMesh.rotation.y += delta * 0.02;
      cageMesh.rotation.y -= delta * 0.05;

      // Gentle interactive tilt towards mouse pointer
      globeGroup.rotation.x = 0.28 + _currentMouse.y * 0.4;
      globeGroup.rotation.z = -0.12 - _currentMouse.x * 0.4;

      // Update traveling data packets
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];
        p.progress = (p.progress + delta * p.speed) % 1;
        const curve = arcCurves[p.curveIndex];
        if (curve) {
          curve.getPointAt(p.progress, _packetPos);
          p.mesh.position.copy(_packetPos);
        }
      }

      // Keep halo facing camera
      haloMesh.lookAt(camera.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    // 13. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
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
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 pointer-events-auto"
      />
    </div>
  );
};
