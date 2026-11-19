import React, { useEffect, useId, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { cancelFrame, frame, motion, useInView, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { Lightbulb, Sparkles, Layers3, Zap } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;
const storyViewport = { once: true, amount: 0.23 } as const;
const missionStages = [
  { name: 'Idea', x: 67, y: 175, Icon: Lightbulb },
  { name: 'Innovation', x: 192, y: 70, Icon: Sparkles },
  { name: 'Solution', x: 328, y: 165, Icon: Layers3 },
  { name: 'Impact', x: 453, y: 60, Icon: Zap },
];

const missionBranches = missionStages.slice(1).map(({ x, y }, index) => {
  const from = missionStages[index];
  return `C ${from.x + 56} ${from.y} ${x - 56} ${y} ${x} ${y}`;
});
const missionPath = `M ${missionStages[0].x} ${missionStages[0].y} ${missionBranches.join(' ')}`;
const cycle = 5.8;
const arrivalCycle = cycle / 2;
const floatPeriods = [3.8, 4.5, 4.1, 4.9];
const floatDelays = [0, 0.85, 1.7, 2.55];

function MissionStage({ index, time, arrival, reduced, hovered, onHover }: {
  index: number;
  time: MotionValue<number>;
  arrival: RefObject<number[]>;
  reduced: boolean;
  hovered: boolean;
  onHover: (index: number, entered: boolean) => void;
}) {
  const { name, x, y, Icon } = missionStages[index];
  const float = useTransform(() => -2 + 3 * Math.cos((time.get() + floatDelays[index]) / floatPeriods[index] * Math.PI * 2));
  const pulse = useTransform(() => {
    const phase = ((time.get() - (arrival.current[index] ?? 0) + arrivalCycle) % arrivalCycle) / arrivalCycle;
    return 1 + (phase < 0.34 ? Math.sin(phase / 0.34 * Math.PI) * 0.09 : 0);
  });

  return (
    <li
      className="mission-stage"
      style={{ left: `${x / 5.2}%`, top: `${y / 2.5}%` }}
      tabIndex={0}
      onPointerEnter={event => { if (event.pointerType !== 'touch') onHover(index, true); }}
      onPointerLeave={() => onHover(index, false)}
      onFocus={() => onHover(index, true)}
      onBlur={() => onHover(index, false)}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={storyViewport}
        transition={{ duration: reduced ? 0 : 0.68, delay: reduced ? 0 : 0.13 + index * 0.15, ease }}
      >
        <motion.div className="mission-stage-float" style={{ y: reduced ? 0 : float }}>
          <motion.div
            className="mission-stage-marker"
            animate={{ y: !reduced && hovered ? -6 : 0 }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 230, damping: 23 }}
          >
            <motion.span className="mission-stage-icon" animate={{ scale: !reduced && hovered ? 1.12 : 1 }}>
              <motion.span className="mission-stage-icon-pulse" style={{ scale: reduced ? 1 : pulse }}>
                <Icon aria-hidden="true" />
              </motion.span>
            </motion.span>
          </motion.div>
          <span className="mission-stage-label">{name}</span>
        </motion.div>
      </motion.div>
    </li>
  );
}

export function MissionAnimation({ reduced }: { reduced: boolean }) {
  const id = useId();
  const stage = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const route = useRef<SVGPathElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const inView = useInView(stage);
  const revealed = useInView(stage, storyViewport);
  const moving = inView && !reduced;
  const time = useMotionValue(0);
  const arrivals = useRef<number[]>([]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 93, damping: 22 });
  const y = useSpring(pointerY, { stiffness: 93, damping: 22 });

  useLayoutEffect(() => {
    const path = route.current;
    if (!path || reduced) return;
    const length = path.getTotalLength();
    if (!length) return;
    missionStages.forEach(({ x }, index) => {
      let low = 0;
      let high = length;
      for (let step = 0; step < 15; step++) {
        const middle = (low + high) / 2;
        if (path.getPointAtLength(middle).x < x) low = middle;
        else high = middle;
      }
      const arrival = ((low + high) / (2 * length)) * cycle % arrivalCycle;
      arrivals.current[index] = arrival;
      stage.current?.style.setProperty(`--mission-arrival-${index}`, `${arrival - arrivalCycle - 0.11}s`);
    });
  }, [reduced]);

  useEffect(() => {
    const visualization = svg.current;
    if (!visualization) return;
    if (!moving) {
      visualization.pauseAnimations();
      return;
    }
    visualization.unpauseAnimations();
    const update = () => time.set(visualization.getCurrentTime());
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [moving, time]);

  return (
    <div ref={stage} className="direction-visual mission-pathway" data-moving={moving}
      onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse') return;
        const box = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - box.left) / box.width - 0.5) * 12);
        pointerY.set(((event.clientY - box.top) / box.height - 0.5) * 8);
      }}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
    >
      <motion.div className="mission-pathway-plane" style={reduced ? undefined : { x, y }}>
        <svg ref={svg} viewBox="0 0 520 250" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <path ref={route} d={missionPath} id={`${id}-path`} pathLength={1} />
            <clipPath id={`${id}-reveal`}>
              <motion.rect
                width="520" height="250"
                initial={reduced ? false : { width: 0 }}
                animate={{ width: reduced || revealed ? 520 : 0 }}
                transition={{ duration: reduced ? 0 : 1.15, delay: reduced ? 0 : 0.18, ease }}
              />
            </clipPath>
            <linearGradient id={`${id}-route`}>
              <stop stopColor="#6aa2cd" />
              <stop offset="0.34" stopColor="#a293cb" />
              <stop offset="0.7" stopColor="#6bbbd7" />
              <stop offset="1" stopColor="#caa35d" />
            </linearGradient>
            <radialGradient id={`${id}-signal`}>
              <stop offset="0.2" stopColor="#fff" />
              <stop offset="0.42" stopColor="#d9f9ff" />
              <stop offset="1" stopColor="#51b7e5" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g clipPath={`url(#${id}-reveal)`}>
            <path className="mission-pathway-line" d={missionPath} stroke={`url(#${id}-route)`} vectorEffect="non-scaling-stroke" />
            {missionBranches.map((branch, index) => (
              <path
                key={branch}
                d={`M ${missionStages[index].x} ${missionStages[index].y} ${branch}`}
                className="mission-pathway-highlight"
                data-lit={hovered === index || hovered === index + 1}
                pathLength={1}
                style={{ animationDelay: `${-index * cycle / (missionStages.length - 1)}s` }}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {!reduced && [0, -arrivalCycle].map(start => (
              <g key={start} className="mission-pathway-signal">
                <use href={`#${id}-path`} className="mission-pathway-trail" style={{ animationDelay: `${start}s`, animationDuration: `${cycle}s` }} />
                {[0, 0.14, 0.28].map((delay, index) => (
                  <ellipse key={delay} rx={8 - index * 2.4} ry={6 - index * 1.6} fill={`url(#${id}-signal)`} opacity="0">
                    <animateMotion dur={`${cycle}s`} begin={`${start + delay}s`} repeatCount="indefinite"><mpath href={`#${id}-path`} /></animateMotion>
                    <animate attributeName="opacity" values={`0;${1 - index * 0.24};${1 - index * 0.24};0`} keyTimes="0;0.05;0.95;1" dur={`${cycle}s`} begin={`${start + delay}s`} repeatCount="indefinite" />
                  </ellipse>
                ))}
              </g>
            ))}
          </g>
        </svg>
        <ol className="mission-stage-list" aria-label="Digital transformation stages">
          {missionStages.map(({ name }, index) => (
            <MissionStage key={name} index={index} time={time} arrival={arrivals} reduced={reduced} hovered={hovered === index}
              onHover={(node, entered) => setHovered(current => entered ? node : current === node ? null : current)} />
          ))}
        </ol>
      </motion.div>
    </div>
  );
}

