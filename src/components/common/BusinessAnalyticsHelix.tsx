import React, { useEffect, useRef } from 'react';
import type { BufferGeometry, Material, WebGLRenderer } from 'three';

type ThreeModule = typeof import('three');

const HELIX_HEIGHT = 8.2;
const HELIX_RADIUS = 0.9;
const HELIX_TURNS = 5;

const initializeHelix = (
  canvas: HTMLCanvasElement,
  reducedMotion: boolean,
  THREE: ThreeModule,
) => {
  const getPoint = (progress: number, phase: number) => {
    const angle = progress * HELIX_TURNS * Math.PI * 2 + phase;
    return new THREE.Vector3(
      HELIX_RADIUS * Math.cos(angle),
      (progress - 0.5) * HELIX_HEIGHT,
      HELIX_RADIUS * Math.sin(angle),
    );
  };

  let renderer: WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
  } catch (error) {
    console.error('Unable to initialize the Business Analytics DNA animation.', error);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  camera.position.set(0, 0, 14.8);

  const helix = new THREE.Group();
  scene.add(helix);

  scene.add(new THREE.AmbientLight(0xd8f6ff, 1.25));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(-3.5, 4, 7);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0x23c9fa, 3.2, 12);
  rimLight.position.set(3.2, 0.5, 3);
  scene.add(rimLight);

  const geometries: BufferGeometry[] = [];
  const materials: Material[] = [];
  const strandPhases = [0, Math.PI];
  const strandColors = [0x0789c8, 0x31b9dc];
  const strandGlowColors = [0x159fe0, 0x37d5ef];

  strandPhases.forEach((phase, strandIndex) => {
    const points = Array.from({ length: 501 }, (_, index) =>
      getPoint(index / 500, phase),
    );
    const curve = new THREE.CatmullRomCurve3(points);
    const glowGeometry = new THREE.TubeGeometry(curve, 500, 0.16, 12, false);
    const strandGeometry = new THREE.TubeGeometry(curve, 500, 0.083, 16, false);
    const highlightGeometry = new THREE.TubeGeometry(curve, 500, 0.026, 10, false);
    geometries.push(glowGeometry, strandGeometry, highlightGeometry);

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: strandGlowColors[strandIndex],
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const strandMaterial = new THREE.MeshPhysicalMaterial({
      color: strandColors[strandIndex],
      emissive: strandGlowColors[strandIndex],
      emissiveIntensity: 0.38,
      metalness: 0.28,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
    });
    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xc3f7ff,
      transparent: true,
      opacity: 0.76,
    });
    materials.push(glowMaterial, strandMaterial, highlightMaterial);

    helix.add(
      new THREE.Mesh(glowGeometry, glowMaterial),
      new THREE.Mesh(strandGeometry, strandMaterial),
      new THREE.Mesh(highlightGeometry, highlightMaterial),
    );
  });

  const rungMaterials = [
    new THREE.MeshStandardMaterial({
      color: 0x72d9f2,
      emissive: 0x169dc9,
      emissiveIntensity: 0.3,
      metalness: 0.34,
      roughness: 0.28,
      transparent: true,
      opacity: 0.88,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x80bff0,
      emissive: 0x1678b9,
      emissiveIntensity: 0.26,
      metalness: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.82,
    }),
  ];
  materials.push(...rungMaterials);

  const rungGeometry = new THREE.CylinderGeometry(0.027, 0.027, 1, 10, 1);
  const rungNodes = new THREE.SphereGeometry(0.083, 12, 10);
  const nodeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xa6efff,
    emissive: 0x25aeda,
    emissiveIntensity: 0.28,
    metalness: 0.25,
    roughness: 0.2,
    clearcoat: 1,
  });
  geometries.push(rungGeometry, rungNodes);
  materials.push(nodeMaterial);

  const rungCount = 25;
  for (let index = 0; index < rungCount; index += 1) {
    const progress = (index + 0.5) / rungCount;
    const start = getPoint(progress, strandPhases[0]);
    const end = getPoint(progress, strandPhases[1]);
    const direction = new THREE.Vector3().subVectors(end, start);
    const rung = new THREE.Mesh(rungGeometry, rungMaterials[index % rungMaterials.length]);
    rung.position.copy(start).add(end).multiplyScalar(0.5);
    rung.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    rung.scale.y = direction.length();
    helix.add(rung);

    const startNode = new THREE.Mesh(rungNodes, nodeMaterial);
    const endNode = new THREE.Mesh(rungNodes, nodeMaterial);
    startNode.position.copy(start);
    endNode.position.copy(end);
    helix.add(startNode, endNode);
  }

  const particleGeometry = new THREE.SphereGeometry(1, 14, 12);
  const particleMaterial = new THREE.MeshBasicMaterial({
    color: 0xc4faff,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const particleGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x2dcdf3,
    transparent: true,
    opacity: 0.23,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  geometries.push(particleGeometry);
  materials.push(particleMaterial, particleGlowMaterial);

  const particles = Array.from({ length: 6 }, (_, index) => {
    const strandIndex = index % strandPhases.length;
    const core = new THREE.Mesh(particleGeometry, particleMaterial);
    const glow = new THREE.Mesh(particleGeometry, particleGlowMaterial);
    const radius = index % 3 === 0 ? 0.068 : 0.048;
    core.scale.setScalar(radius);
    glow.scale.setScalar(radius * 2.7);
    helix.add(glow, core);
    return { core, glow, strandIndex, offset: index / 6, radius };
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  let elapsed = 0;
  const draw = () => {
    helix.rotation.y = elapsed * 0.24;
    helix.rotation.x = Math.sin(elapsed * 0.17) * 0.025;
    helix.position.y = Math.sin(elapsed * 0.38) * 0.045;
    particles.forEach(({ core, glow, strandIndex, offset, radius }) => {
      const progress = (elapsed * 0.045 + offset) % 1;
      const point = getPoint(progress, strandPhases[strandIndex]);
      core.position.copy(point);
      glow.position.copy(point);
      const pulse = 0.88 + Math.sin(elapsed * 2 + offset * Math.PI * 2) * 0.12;
      core.scale.setScalar(radius * pulse);
      glow.scale.setScalar(radius * 2.7 * pulse);
    });
    renderer.render(scene, camera);
  };

  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0].contentRect;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    draw();
  });
  resizeObserver.observe(canvas);

  if (reducedMotion) {
    draw();
  } else {
    let previousTime = performance.now();
    renderer.setAnimationLoop(() => {
      const currentTime = performance.now();
      elapsed += Math.min((currentTime - previousTime) / 1000, 0.05);
      previousTime = currentTime;
      draw();
    });
  }

  return () => {
    resizeObserver.disconnect();
    renderer.setAnimationLoop(null);
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
  };
};

interface BusinessAnalyticsHelixProps {
  reducedMotion: boolean;
}

export const BusinessAnalyticsHelix: React.FC<BusinessAnalyticsHelixProps> = ({ reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let dispose: (() => void) | undefined;
    let cancelled = false;
    void import('three').then((THREE) => {
      if (!cancelled) dispose = initializeHelix(canvas, reducedMotion, THREE);
    }, (error: unknown) => {
      console.error('Unable to load the Business Analytics DNA animation.', error);
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [reducedMotion]);

  return (
    <div className="business-analytics-process__helix" aria-hidden="true">
      <canvas ref={canvasRef} className="business-analytics-process__helix-canvas" />
    </div>
  );
};
