import React, { useCallback, useEffect, useId, useRef, type RefObject } from 'react';
import { motion, useInView, useMotionValue, useSpring, type MotionValue } from 'motion/react';
import { Vector3 } from 'three/src/math/Vector3.js';

const turn = Math.PI * 2;
const radians = Math.PI / 180;
const centerX = 210;
const centerY = 130;
const radius = 109;
const turnMs = 27000;
const sky = ['#398fc4', '#8472ae', '#4198bd', '#a18ac3'];

function spherePoint(latitude: number, longitude: number) {
  const lat = latitude * radians;
  const lon = longitude * radians;
  return new Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon));
}

const latitudes = [-64, -40, -19, 0, 19, 40, 64].map(lat =>
  Array.from({ length: 37 }, (_, index) => spherePoint(lat, index * 10)));
const longitudes = Array.from({ length: 12 }, (_, index) =>
  Array.from({ length: 19 }, (_, step) => spherePoint(-90 + step * 10, index * 30)));
const globePoints = [[42, -32], [23, 16], [-7, 51], [49, 76], [-33, -39], [-22, 105], [13, 146], [47, -116], [-24, -92], [12, -55]]
  .map(([lat, lon]) => spherePoint(lat, lon));
const networkPairs = [[0, 1], [0, 3], [1, 2], [2, 3], [2, 5], [4, 1], [4, 8], [5, 6], [6, 7], [7, 9], [9, 4]];

function arcPoint(from: Vector3, to: Vector3, progress: number) {
  return new Vector3().lerpVectors(from, to, progress).normalize().multiplyScalar(1 + Math.sin(progress * Math.PI) * 0.06);
}

const routes = networkPairs.map(([from, to]) => Array.from({ length: 19 }, (_, i) => arcPoint(globePoints[from], globePoints[to], i / 18)));
const activeRoutes = [0, 2, 4, 7, 9];
const ringSettings = [
  { rx: 162, ry: 40, tilt: -28, drift: 11, swing: 18300, speed: 7300, offset: 0.16, color: '#509ec9' },
  { rx: 145, ry: 42, tilt: 28, drift: 9, swing: 21900, speed: -9100, offset: 0.57, color: '#9581b7' },
  { rx: 175, ry: 29, tilt: -5, drift: 7, swing: 25600, speed: 10800, offset: 0.79, color: '#7da9c8' },
];

type Projected = { x: number; y: number; z: number };
type Project = (point: Vector3) => Projected;

function projection(elapsed: number, pitch: number, yaw: number): Project {
  const turnAngle = elapsed / turnMs * turn + yaw;
  const cosYaw = Math.cos(turnAngle);
  const sinYaw = Math.sin(turnAngle);
  const cosPitch = Math.cos(pitch - 0.2);
  const sinPitch = Math.sin(pitch - 0.2);
  return point => {
    const x = point.x * cosYaw + point.z * sinYaw;
    const z = point.z * cosYaw - point.x * sinYaw;
    return {
      x: centerX + radius * x,
      y: centerY - radius * (point.y * cosPitch - z * sinPitch),
      z: point.y * sinPitch + z * cosPitch,
    };
  };
}

function trace(lines: Vector3[][], project: Project) {
  let front = '';
  let back = '';
  const position = (point: Projected) => `${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
  for (const line of lines) {
    let previous = project(line[0]);
    if (previous.z >= 0) front += `M${position(previous)}`;
    else back += `M${position(previous)}`;
    for (let index = 1; index < line.length; index++) {
      const current = project(line[index]);
      if ((previous.z >= 0) !== (current.z >= 0)) {
        const t = previous.z / (previous.z - current.z);
        const horizon = position({ x: previous.x + (current.x - previous.x) * t, y: previous.y + (current.y - previous.y) * t, z: 0 });
        if (previous.z >= 0) { front += `L${horizon}`; back += `M${horizon}`; }
        else { back += `L${horizon}`; front += `M${horizon}`; }
      }
      if (current.z >= 0) front += `L${position(current)}`;
      else back += `L${position(current)}`;
      previous = current;
    }
  }
  return { front, back };
}

const grid = [...latitudes, ...longitudes];
const initialProject = projection(0, 0, 0);
const initialGrid = trace(grid, initialProject);
const initialNetwork = trace(routes, initialProject);

function setPoint(element: SVGCircleElement | null, point: Projected, opacity: number) {
  element?.setAttribute('cx', point.x.toFixed(1));
  element?.setAttribute('cy', point.y.toFixed(1));
  element?.setAttribute('opacity', opacity.toFixed(2));
}

// Paint only while visible. Accumulated time survives rerenders and scrolling out of view.
function useGlobeFrames(moving: boolean, draw: (elapsed: number) => void, elapsed: RefObject<number>) {
  useEffect(() => {
    if (!moving) return;
    let frame = 0;
    let previous = 0;
    let lastPaint = 0;
    const tick = (now: number) => {
      if (previous) elapsed.current += Math.min(64, now - previous);
      previous = now;
      if (now - lastPaint >= 16) {
        lastPaint = now;
        draw(elapsed.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [draw, elapsed, moving]);
}

export function VisionAnimation({ reduced }: { reduced: boolean }) {
  const id = useId();
  const stage = useRef<HTMLDivElement>(null);
  const frontGrid = useRef<SVGPathElement>(null);
  const backGrid = useRef<SVGPathElement>(null);
  const frontNetwork = useRef<SVGPathElement>(null);
  const backNetwork = useRef<SVGPathElement>(null);
  const points = useRef<(SVGCircleElement | null)[]>([]);
  const blooms = useRef<(SVGCircleElement | null)[]>([]);
  const signals = useRef<(SVGCircleElement | null)[]>([]);
  const rings = useRef({ front: [] as (SVGGElement | null)[], back: [] as (SVGGElement | null)[] });
  const satellites = useRef({ front: [] as (SVGCircleElement | null)[], back: [] as (SVGCircleElement | null)[] });
  const elapsed = useRef(0);
  const pitchInput = useMotionValue(0);
  const yawInput = useMotionValue(0);
  const pitch = useSpring(pitchInput, { stiffness: 90, damping: 22 });
  const yaw = useSpring(yawInput, { stiffness: 90, damping: 22 });
  const inView = useInView(stage);
  const moving = inView && !reduced;

  const draw = useCallback((time: number) => {
    const project = projection(time, pitch.get(), yaw.get());
    const wire = trace(grid, project);
    const network = trace(routes, project);
    frontGrid.current?.setAttribute('d', wire.front);
    backGrid.current?.setAttribute('d', wire.back);
    frontNetwork.current?.setAttribute('d', network.front);
    backNetwork.current?.setAttribute('d', network.back);

    globePoints.forEach((point, index) => {
      const view = project(point);
      const wave = (Math.cos(turn * (time / 8700 - index / globePoints.length)) + 1) / 2;
      setPoint(points.current[index], view, view.z >= 0 ? 0.48 + wave ** 6 * 0.52 : 0.12);
      setPoint(blooms.current[index], view, view.z >= 0 ? wave ** 15 * 0.74 : 0);
    });

    activeRoutes.forEach((route, index) => {
      const [from, to] = networkPairs[route];
      const phase = (time / (3600 + index * 280) + index * 0.23) % 1;
      const view = project(arcPoint(globePoints[from], globePoints[to], phase));
      setPoint(signals.current[index], view, view.z >= 0 ? Math.min(1, phase * 10, (1 - phase) * 10) : 0);
    });

    ringSettings.forEach(({ rx, ry, tilt, drift, swing, speed, offset }, index) => {
      const angle = tilt + Math.sin(time / swing * turn + index) * drift + yaw.get() * (index % 2 ? -18 : 18);
      const transform = `rotate(${angle.toFixed(1)} ${centerX} ${centerY})`;
      rings.current.front[index]?.setAttribute('transform', transform);
      rings.current.back[index]?.setAttribute('transform', transform);
      const phase = (time / speed + offset) * turn;
      const position = { x: centerX + Math.cos(phase) * rx, y: centerY + Math.sin(phase) * ry, z: 0 };
      const near = Math.sin(phase) >= 0;
      setPoint(satellites.current.front[index], position, near ? 0.94 : 0);
      setPoint(satellites.current.back[index], position, near ? 0 : 0.65);
    });
  }, [pitch, yaw]);

  useGlobeFrames(moving, draw, elapsed);

  const renderRings = (side: 'front' | 'back') => ringSettings.map(({ rx, ry, tilt, color }, index) => (
    <motion.g key={tilt} initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0 : 0.64, delay: reduced ? 0 : 0.22 + index * 0.17 }}>
      <g ref={node => { rings.current[side][index] = node; }} transform={`rotate(${tilt} ${centerX} ${centerY})`}>
        <path className={`vision-globe-orbit vision-globe-orbit-${side}`} stroke={color}
          d={`M ${centerX - rx} ${centerY} A ${rx} ${ry} 0 0 ${side === 'front' ? 0 : 1} ${centerX + rx} ${centerY}`} />
        {side === 'front' && index === 0 && (
          <path className="vision-globe-orbit vision-globe-orbit-trace" stroke={color}
            d={`M ${centerX - rx - 6} ${centerY} A ${rx + 6} ${ry + 5} 0 0 0 ${centerX + rx + 6} ${centerY}`} />
        )}
        {!reduced && <circle className="vision-globe-satellite" ref={node => { satellites.current[side][index] = node; }} r="6.5" fill={`url(#${id}-light)`} opacity="0" />}
      </g>
    </motion.g>
  ));

  return (
    <div
      ref={stage}
      className="direction-visual vision-globe"
      data-moving={moving}
      role="img"
      aria-label="A rotating globe linking points in a global innovation network"
      onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pitchInput.set((event.clientY - bounds.top - bounds.height / 2) / bounds.height * 0.32);
        yawInput.set((event.clientX - bounds.left - bounds.width / 2) / bounds.width * 0.42);
      }}
      onPointerLeave={() => { pitchInput.set(0); yawInput.set(0); }}
    >
      <svg viewBox="20 -4 380 268" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-surface`} cx="35%" cy="25%" r="78%">
            <stop stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="0.46" stopColor="#e3f5fd" stopOpacity="0.87" />
            <stop offset="0.78" stopColor="#c3e0f3" stopOpacity="0.83" />
            <stop offset="0.95" stopColor="#a8bbdf" stopOpacity="0.78" />
            <stop offset="1" stopColor="#d5d6f1" stopOpacity="0.87" />
          </radialGradient>
          <radialGradient id={`${id}-reflection`} cx="60%" cy="88%" r="62%">
            <stop stopColor="#f1dcf8" stopOpacity="0.76" />
            <stop offset="0.86" stopColor="#e4d6fb" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0.6" stopColor="#bae7fa" stopOpacity="0.83" />
            <stop offset="0.8" stopColor="#c8dffa" stopOpacity="0.56" />
            <stop offset="1" stopColor="#d9dafa" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-light`}>
            <stop offset="0.21" stopColor="#f9feff" />
            <stop offset="0.48" stopColor="#54bee8" stopOpacity="0.94" />
            <stop offset="1" stopColor="#54bee8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-scan`}>
            <stop stopColor="#f9fdff" stopOpacity="0" />
            <stop offset="0.49" stopColor="#f9fdff" stopOpacity="0.67" />
            <stop offset="1" stopColor="#f9fdff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`${id}-sphere`}><circle cx={centerX} cy={centerY} r={radius} /></clipPath>
        </defs>
        <circle className="vision-globe-halo" cx={centerX} cy={centerY} r="138" fill={`url(#${id}-glow)`} />
        {renderRings('back')}
        <circle className="vision-globe-surface" cx={centerX} cy={centerY} r={radius} fill={`url(#${id}-surface)`} />
        <circle cx={centerX} cy={centerY} r={radius - 1} fill={`url(#${id}-reflection)`} />
        <circle className="vision-globe-rim" cx={centerX} cy={centerY} r={radius - 2} />
        <path className="vision-globe-wire vision-globe-back" ref={backGrid} d={initialGrid.back} />
        <path className="vision-globe-network vision-globe-back" ref={backNetwork} d={initialNetwork.back} />
        <path className="vision-globe-wire" ref={frontGrid} d={initialGrid.front} />
        <g clipPath={`url(#${id}-sphere)`}>
          <rect className="vision-globe-scan" x="24" y="20" width="96" height="220" fill={`url(#${id}-scan)`} />
        </g>
        <path className="vision-globe-network" ref={frontNetwork} d={initialNetwork.front} />
        {!reduced && globePoints.map((_, index) => (
          <circle key={index} className="vision-globe-bloom" ref={node => { blooms.current[index] = node; }} r="7" fill={`url(#${id}-light)`} opacity="0" />
        ))}
        {globePoints.map((point, index) => {
          const view = initialProject(point);
          return <circle key={index} className="vision-globe-point" ref={node => { points.current[index] = node; }} cx={view.x} cy={view.y} r="3" fill={sky[index % sky.length]} opacity={view.z >= 0 ? 0.72 : 0.12} />;
        })}
        {!reduced && activeRoutes.map((route, index) => (
          <circle key={route} ref={node => { signals.current[index] = node; }} r="6.8" fill={`url(#${id}-light)`} opacity="0" />
        ))}
        {renderRings('front')}
      </svg>
    </div>
  );
}
