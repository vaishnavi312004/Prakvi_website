import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Exact original Prakvi logo blue sampled directly from /public/img/prakvi-logo.png
const PRAKVI_EXACT_LOGO_BLUE = 0x0193dd;
// Darker tonal shade of the exact same blue solely for extruded 3D side bevel depth
const PRAKVI_SIDE_DEPTH_BLUE = 0x01699e;
// Supporting soft infinity ribbon blue tint (strictly same corporate blue family, zero orange/lavender/cyan)
const PRAKVI_INFINITY_SOFT_BLUE = 0x4db5eb;
// Neutral floor shadow tint
const FLOOR_SHADOW_NEUTRAL = 0x0f172a;

function createSoftShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.24)');
    grad.addColorStop(0.45, 'rgba(15, 23, 42, 0.10)');
    grad.addColorStop(0.78, 'rgba(15, 23, 42, 0.02)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

const _mouseTarget = new THREE.Vector2(0, 0);
const _currentMouse = new THREE.Vector2(0, 0);

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        const param = ext
          ? ext.UNMASKED_RENDERER_WEBGL
          : (gl as WebGLRenderingContext).RENDERER;
        const gpu = String((gl as WebGLRenderingContext).getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const initialW = container.clientWidth || 480;
    const initialH = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, initialW / initialH, 0.1, 100);
    camera.position.set(0, -0.08, 7.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(initialW, initialH);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    container.appendChild(renderer.domElement);

    // Pure neutral white lighting (never alters or tints the exact #0193DD brand color)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.65);
    keyLight.position.set(2.6, 5.8, 4.8);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 16;
    keyLight.shadow.camera.left = -2.8;
    keyLight.shadow.camera.right = 2.8;
    keyLight.shadow.camera.top = 2.8;
    keyLight.shadow.camera.bottom = -2.8;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.radius = 5;
    scene.add(keyLight);

    const heroRig = new THREE.Group();
    heroRig.position.set(0, 0.18, 0);
    scene.add(heroRig);

    const disposables: { dispose: () => void }[] = [];

    // Strict #0193DD un-tinted front/back logo face + clean extruded 3D side shade
    // Color stays 100% locked across all 3 website themes!
    const frontFaceMat = new THREE.MeshBasicMaterial({
      color: PRAKVI_EXACT_LOGO_BLUE,
      toneMapped: false,
      transparent: true,
      opacity: 1,
    });

    const sideExtrudeMat = new THREE.MeshStandardMaterial({
      color: PRAKVI_SIDE_DEPTH_BLUE,
      roughness: 0.55,
      metalness: 0.0,
      transparent: true,
      opacity: 1,
    });

    const infinityPrimaryMat = new THREE.MeshBasicMaterial({
      color: PRAKVI_EXACT_LOGO_BLUE,
      toneMapped: false,
      transparent: true,
      opacity: 1,
    });

    const infinitySecondaryMat = new THREE.MeshBasicMaterial({
      color: PRAKVI_INFINITY_SOFT_BLUE,
      toneMapped: false,
      transparent: true,
      opacity: 1,
    });

    disposables.push(
      frontFaceMat,
      sideExtrudeMat,
      infinityPrimaryMat,
      infinitySecondaryMat,
    );

    const prakviMaterials = [frontFaceMat, sideExtrudeMat];

    // ========================================================================
    // 1. EXACT GEOMETRIC 3-PART PRAKVI LOGO (1:1 Coordinates from prakvi-logo.png)
    // ========================================================================
    const prakviGroup = new THREE.Group();
    heroRig.add(prakviGroup);

    const extrudeOpts: THREE.ExtrudeGeometryOptions = {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.014,
      bevelSize: 0.01,
      bevelSegments: 2,
      curveSegments: 36,
    };

    const outerPShape = new THREE.Shape();
    outerPShape.moveTo(-1.12, 1.19);
    outerPShape.lineTo(0.44, 1.19);
    outerPShape.absarc(0.44, 0.41, 0.78, Math.PI / 2, -Math.PI / 2, true);
    outerPShape.lineTo(0.03, -0.37);
    outerPShape.lineTo(-0.09, -1.22);
    outerPShape.lineTo(-0.37, -1.22);
    outerPShape.lineTo(-0.26, -0.02);
    outerPShape.lineTo(0.44, -0.02);
    outerPShape.absarc(0.44, 0.41, 0.43, -Math.PI / 2, Math.PI / 2, false);
    outerPShape.lineTo(-1.17, 0.84);
    outerPShape.closePath();

    const outerPGeo = new THREE.ExtrudeGeometry(outerPShape, extrudeOpts);
    outerPGeo.translate(0, 0, -0.12);
    disposables.push(outerPGeo);

    const outerPMesh = new THREE.Mesh(outerPGeo, prakviMaterials);
    outerPMesh.castShadow = !isSoftwareGl;
    outerPMesh.receiveShadow = !isSoftwareGl;
    prakviGroup.add(outerPMesh);

    const leftPillarShape = new THREE.Shape();
    leftPillarShape.moveTo(-1.19, 0.53);
    leftPillarShape.lineTo(-0.51, 0.53);
    leftPillarShape.lineTo(-0.67, -0.67);
    leftPillarShape.lineTo(-0.99, -0.67);
    leftPillarShape.lineTo(-0.88, 0.16);
    leftPillarShape.lineTo(-1.24, 0.16);
    leftPillarShape.closePath();

    const leftPillarGeo = new THREE.ExtrudeGeometry(leftPillarShape, extrudeOpts);
    leftPillarGeo.translate(0, 0, -0.12);
    disposables.push(leftPillarGeo);

    const leftPillarMesh = new THREE.Mesh(leftPillarGeo, prakviMaterials);
    leftPillarMesh.castShadow = !isSoftwareGl;
    leftPillarMesh.receiveShadow = !isSoftwareGl;
    prakviGroup.add(leftPillarMesh);

    const innerCoreShape = new THREE.Shape();
    innerCoreShape.moveTo(-0.12, 0.53);
    innerCoreShape.lineTo(0.32, 0.53);
    innerCoreShape.absarc(0.32, 0.34, 0.19, Math.PI / 2, -Math.PI / 2, true);
    innerCoreShape.lineTo(-0.17, 0.15);
    innerCoreShape.closePath();

    const innerCoreGeo = new THREE.ExtrudeGeometry(innerCoreShape, extrudeOpts);
    innerCoreGeo.translate(0, 0, -0.12);
    disposables.push(innerCoreGeo);

    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, prakviMaterials);
    innerCoreMesh.castShadow = !isSoftwareGl;
    innerCoreMesh.receiveShadow = !isSoftwareGl;
    prakviGroup.add(innerCoreMesh);

    // ========================================================================
    // 2. INFINITY-INSPIRED MOTION RIBBON (Weaves together into Exact #0193DD P)
    // ========================================================================
    const infinityGroup = new THREE.Group();
    heroRig.add(infinityGroup);

    const infCurvePrimary = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-1.22, -0.26, -0.04),
        new THREE.Vector3(-1.38, 0.16, 0.0),
        new THREE.Vector3(-1.02, 0.56, 0.05),
        new THREE.Vector3(-0.44, 0.48, 0.10),
        new THREE.Vector3(0.0, 0.0, 0.14),
        new THREE.Vector3(0.44, -0.48, 0.10),
        new THREE.Vector3(1.04, -0.54, 0.04),
        new THREE.Vector3(1.40, -0.06, 0.0),
        new THREE.Vector3(1.16, 0.46, -0.04),
        new THREE.Vector3(0.68, 0.58, -0.05),
        new THREE.Vector3(0.30, 0.36, -0.06),
      ],
      false,
      'centripetal',
      0.5,
    );

    const infCurveSecondary = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-0.26, -0.26, -0.12),
        new THREE.Vector3(-0.54, -0.54, -0.09),
        new THREE.Vector3(-1.0, -0.56, -0.05),
        new THREE.Vector3(-1.30, -0.32, -0.03),
        new THREE.Vector3(-1.36, -0.02, -0.01),
      ],
      false,
      'centripetal',
      0.5,
    );

    const infGeoA = new THREE.TubeGeometry(infCurvePrimary, 96, 0.13, 20, false);
    const infGeoB = new THREE.TubeGeometry(infCurveSecondary, 48, 0.128, 20, false);
    disposables.push(infGeoA, infGeoB);

    const infMeshA = new THREE.Mesh(infGeoA, infinityPrimaryMat);
    infMeshA.castShadow = !isSoftwareGl;
    const infMeshB = new THREE.Mesh(infGeoB, infinitySecondaryMat);
    infMeshB.castShadow = !isSoftwareGl;
    infinityGroup.add(infMeshA, infMeshB);

    const capGeo = new THREE.SphereGeometry(0.128, 20, 20);
    disposables.push(capGeo);
    const capEnds = [
      infCurvePrimary.getPointAt(1),
      infCurvePrimary.getPointAt(0),
      infCurveSecondary.getPointAt(0),
      infCurveSecondary.getPointAt(1),
    ];
    capEnds.forEach((pt, i) => {
      const cap = new THREE.Mesh(capGeo, i < 2 ? infinityPrimaryMat : infinitySecondaryMat);
      cap.position.copy(pt);
      infinityGroup.add(cap);
    });

    // ========================================================================
    // 3. VISIBLE NEUTRAL CAST SHADOW DIRECTLY BELOW FLOATING EMBLEM
    // ========================================================================
    const shadowCatcherGeo = new THREE.PlaneGeometry(5.5, 4.2);
    const shadowCatcherMat = new THREE.ShadowMaterial({
      color: FLOOR_SHADOW_NEUTRAL,
      opacity: 0.2,
    });
    const shadowCatcher = new THREE.Mesh(shadowCatcherGeo, shadowCatcherMat);
    shadowCatcher.rotation.x = -Math.PI / 2;
    shadowCatcher.position.set(0, -1.46, 0.04);
    shadowCatcher.receiveShadow = !isSoftwareGl;
    heroRig.add(shadowCatcher);

    const softShadowTex = createSoftShadowTexture();
    const ambientShadowGeo = new THREE.PlaneGeometry(2.9, 1.85);
    const ambientShadowMat = new THREE.MeshBasicMaterial({
      map: softShadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const ambientShadow = new THREE.Mesh(ambientShadowGeo, ambientShadowMat);
    ambientShadow.rotation.x = -Math.PI / 2;
    ambientShadow.position.set(0.02, -1.47, 0);
    heroRig.add(ambientShadow);

    disposables.push(
      shadowCatcherGeo,
      shadowCatcherMat,
      softShadowTex,
      ambientShadowGeo,
      ambientShadowMat,
    );

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      _mouseTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      _mouseTarget.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => _mouseTarget.set(0, 0);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    let frameId = 0;
    let isDisposed = false;
    const clock = new THREE.Clock();

    // Animation Sequence:
    // 0.0s - 1.9s: Subtle infinity-inspired movement
    // 1.9s - 3.2s: Visual elements smoothly converge & transform into the Prakvi P
    // 3.2s - 8.2s: Exact #0193DD Prakvi P holds with gentle floating/depth motion
    // 8.2s - 9.4s: Smoothly unfolds back into Infinity movement
    function computeEmblemMix(elapsed: number): number {
      const cycle = elapsed % 9.4;
      if (cycle < 1.9) return 0;
      if (cycle < 3.2) return easeInOutCubic((cycle - 1.9) / 1.3);
      if (cycle < 8.2) return 1;
      return 1 - easeInOutCubic((cycle - 8.2) / 1.2);
    }

    function updateScene(elapsed: number, delta: number) {
      const mix = reducedMotion.matches ? 1 : computeEmblemMix(elapsed);

      if (!reducedMotion.matches) {
        _currentMouse.x = THREE.MathUtils.damp(_currentMouse.x, _mouseTarget.x, 4.2, delta);
        _currentMouse.y = THREE.MathUtils.damp(_currentMouse.y, _mouseTarget.y, 4.2, delta);

        const floatY = Math.sin(elapsed * 1.15) * 0.075;
        const rotY = Math.sin(elapsed * 0.55) * 0.13 + _currentMouse.x * 0.22;
        const rotX = Math.cos(elapsed * 0.45) * 0.04 - _currentMouse.y * 0.12;

        // Infinity-inspired weave before transforming
        const infVis = 1 - smoothstep(0.08, 0.55, mix);
        infinityGroup.visible = infVis > 0.01;
        infinityPrimaryMat.opacity = infVis;
        infinitySecondaryMat.opacity = infVis;
        infinityGroup.position.y = floatY;
        infinityGroup.rotation.set(rotX, rotY + mix * 0.65, mix * -0.15);
        infinityGroup.scale.setScalar(1 - smoothstep(0, 0.65, mix) * 0.24);

        // Exact #0193DD Prakvi 'P' reveal & gentle floating depth animation
        const pVis = smoothstep(0.35, 0.85, mix);
        prakviGroup.visible = pVis > 0.01;
        frontFaceMat.opacity = pVis;
        sideExtrudeMat.opacity = pVis;

        prakviGroup.scale.setScalar(0.84 + 0.16 * pVis);
        prakviGroup.position.y = floatY;
        prakviGroup.rotation.set(rotX, rotY - (1 - pVis) * 0.6, 0);

        // Subtle convergence of the 3 P pieces during assembly, locked seamlessly when formed
        const spread = (1 - pVis) * 0.42;
        outerPMesh.position.set(spread * 0.7, spread * 0.25, 0);
        leftPillarMesh.position.set(
          -spread,
          Math.sin(elapsed * 1.5 + 0.7) * 0.012 * pVis,
          Math.sin(elapsed * 1.3) * 0.012 * pVis,
        );
        innerCoreMesh.position.set(
          spread * 0.3,
          Math.sin(elapsed * 1.5 + 1.4) * 0.014 * pVis,
          Math.cos(elapsed * 1.3) * 0.014 * pVis + spread * 0.35,
        );

        ambientShadow.scale.setScalar(1.02 - floatY * 0.45);
        ambientShadowMat.opacity = 0.84 - floatY * 0.45;
        ambientShadow.position.x = 0.02 + _currentMouse.x * 0.06;
      } else {
        infinityGroup.visible = false;
        prakviGroup.visible = true;
        frontFaceMat.opacity = 1;
        sideExtrudeMat.opacity = 1;
        prakviGroup.rotation.set(0.03, -0.1, 0);
        outerPMesh.position.set(0, 0, 0);
        leftPillarMesh.position.set(0, 0, 0);
        innerCoreMesh.position.set(0, 0, 0);
      }
    }

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync =
        typeof gl.fenceSync === 'function'
          ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)
          : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (isDisposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    function tick() {
      if (isDisposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      updateScene(elapsed, delta);
      renderer.render(scene, camera);

      if (reducedMotion.matches) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    const onReducedMotionChange = () => {
      if (reducedMotion.matches) {
        cancelAnimationFrame(frameId);
        clearTimeout(frameId);
        updateScene(0, 0.016);
        renderer.render(scene, camera);
      } else {
        tick();
      }
    };
    reducedMotion.addEventListener('change', onReducedMotionChange);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      reducedMotion.removeEventListener('change', onReducedMotionChange);
      window.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      resizeObserver.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
};
