import type { CSSProperties, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type Size = { w: number; h: number };
type Position = { x: number; y: number };
type Box = Position & Size;
type Tone = 'accent' | 'mint' | 'peach' | 'violet';

export const stepDelay = (index: number): CSSProperties => ({ animationDelay: `${index * 0.38}s` });

export function Place({ x, y, children }: Position & { children: ReactNode }) {
  return <g transform={`translate(${x} ${y})`}>{children}</g>;
}

function Plate({ w, h, radius = 11 }: Size & { radius?: number }) {
  return <>
    <rect x="2" y="4" width={w} height={h} rx={radius} className="art-shadow" />
    <rect width={w} height={h} rx={radius} className="art-glass" />
  </>;
}

export function Panel({ x, y, w, h, children, chrome = true }: Box & { children: ReactNode; chrome?: boolean }) {
  return <Place x={x} y={y}>
    <Plate w={w} h={h} />
    {chrome && <g className="art-chrome">
      <path d={`M0 21H${w}`} />
      <circle cx="11" cy="10.5" r="2" /><circle cx="18" cy="10.5" r="2" /><circle cx="25" cy="10.5" r="2" />
      <path d={`M${w - 34} 10.5h22`} />
    </g>}
    {children}
  </Place>;
}

export function Phone({ x, y, w, h, children }: Box & { children: ReactNode }) {
  return <Place x={x} y={y}>
    <Plate w={w} h={h} radius={13} />
    <rect x="4" y="4" width={w - 8} height={h - 8} rx="10" className="art-screen" />
    <rect x={w / 2 - 11} y="9" width="22" height="3.5" rx="2" className="art-ink-fill" />
    <path d={`M${w / 2 - 10} ${h - 10}h20`} className="art-rule" />
    {children}
  </Place>;
}

export function Mark({ x, y, icon: Icon, size = 19 }: Position & { icon: LucideIcon; size?: number }) {
  return <Icon x={x} y={y} width={size} height={size} strokeWidth={1.65} className="art-mark" />;
}

export function Badge({ x, y, icon, size = 40, tone = 'accent', pulse = false }: Position & {
  icon: LucideIcon; size?: number; tone?: Tone; pulse?: boolean;
}) {
  const iconSize = Math.round(size * 0.52);
  return <Place x={x} y={y}>
    <g className={pulse ? 'art-pulse' : undefined}>
      <Plate w={size} h={size} radius={size * 0.28} />
      <rect x="4" y="4" width={size - 8} height={size - 8} rx={size * 0.22} className={`art-wash art-tone-${tone}`} />
      <Mark x={(size - iconSize) / 2} y={(size - iconSize) / 2} icon={icon} size={iconSize} />
    </g>
  </Place>;
}

export function Lines({ x, y, widths, gap = 8 }: Position & { widths: readonly number[]; gap?: number }) {
  return <path d={widths.map((width, i) => `M${x} ${y + i * gap}h${width}`).join(' ')} className="art-rule" />;
}

export function Progress({ x, y, w, value = 0.75, tone = 'accent' }: Position & { w: number; value?: number; tone?: Tone }) {
  return <Place x={x} y={y}>
    <rect width={w} height="5" rx="2.5" className="art-track" />
    <rect width={w * value} height="5" rx="2.5" className={`art-solid art-tone-${tone} art-progress`} />
  </Place>;
}

export function Bars({ x, y, w, h, values, tone = 'accent' }: Box & { values: readonly number[]; tone?: Tone }) {
  const slot = w / values.length;
  return <Place x={x} y={y}>
    <path d={`M0 ${h}H${w}M0 ${h / 2}H${w}`} className="art-guide" />
    {values.map((value, i) => <rect key={i} x={i * slot + 3} y={h * (1 - value)} width={slot - 6} height={h * value}
      rx="2.8" className={`art-solid art-tone-${tone} art-bar`} style={stepDelay(i)} opacity={i % 3 === 1 ? 0.54 : 0.9} />)}
  </Place>;
}

export function Trend({ x, y, w, h, values, forecast }: Box & { values: readonly number[]; forecast?: number }) {
  const points = values.map((value, i) => [Math.round(i * w / (values.length - 1)), Math.round(h * (1 - value))]);
  const stop = forecast ?? points.length - 1;
  const line = points.slice(0, stop + 1).map(point => point.join(',')).join(' ');
  return <Place x={x} y={y}>
    <path d={`M0 ${h}H${w}M0 ${h / 2}H${w}M0 0H${w}`} className="art-guide" />
    <path d={`M0 ${h}L${line.replaceAll(' ', 'L')}V${h}Z`} className="art-wash art-tone-accent" />
    <polyline points={line} className="art-line" />
    {forecast !== undefined && <polyline points={points.slice(stop).map(point => point.join(',')).join(' ')}
      className="art-line art-forecast" />}
    {points.filter((_, i) => i === stop || i === points.length - 1).map(([cx, cy]) =>
      <circle key={cx} cx={cx} cy={cy} r="3.2" className="art-solid art-tone-accent art-pulse" />)}
  </Place>;
}

export function Ring({ x, y, r = 17, progress = 0.74, tone = 'accent' }: Position & {
  r?: number; progress?: number; tone?: Tone;
}) {
  return <Place x={x} y={y}>
    <circle r={r} className="art-ring-base" />
    <circle r={r} pathLength="1" strokeDasharray={`${progress} 1`} transform="rotate(-90)"
      className={`art-ring art-tone-${tone}`} />
  </Place>;
}

export function Profile({ x, y, tone = 'accent', size = 22 }: Position & { tone?: Tone; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size / 22})`} className={`art-tone-${tone}`}>
    <circle cx="11" cy="11" r="11" className="art-wash" />
    <circle cx="11" cy="8" r="3.4" className="art-solid" />
    <path d="M4.8 17a6.2 5.7 0 0 1 12.4 0Z" className="art-solid" />
  </g>;
}

export function Checklist({ x, y, widths, gap = 19 }: Position & { widths: readonly number[]; gap?: number }) {
  return <Place x={x} y={y}>
    {widths.map((width, i) => <g key={i} transform={`translate(0 ${i * gap})`}>
      <rect width="12" height="12" rx="3" className="art-wash art-tone-mint" />
      <path d="m2.7 6.4 2.3 2.4 4.5-4.9" pathLength="1" className="art-check" style={stepDelay(i)} />
      <Lines x={20} y={6} widths={[width]} />
    </g>)}
  </Place>;
}

export function Route({ d, pulse = false, delay = 0 }: { d: string; pulse?: boolean; delay?: number }) {
  const firstLeg = d.match(/^[Mm][^Mm]*/)?.[0] ?? d;
  return <>
    <path d={d} className="art-connector" />
    {pulse && <circle r="3.6" className="art-solid art-tone-accent art-packet"
      style={{ offsetPath: `path('${firstLeg}')`, animationDelay: `${delay}s` }} />}
  </>;
}

export function Tile({ x, y, w, h, tone = 'accent' }: Box & { tone?: Tone }) {
  return <rect x={x} y={y} width={w} height={h} rx="5" className={`art-wash art-tone-${tone}`} />;
}

export function Store({ x, y, w = 47, h = 52, tone = 'accent' }: Position & { w?: number; h?: number; tone?: Tone }) {
  return <Place x={x} y={y}>
    <g className={`art-tone-${tone}`}>
      <path d={`M0 9C0-2 ${w}-2 ${w} 9V${h - 8}c0 12-${w} 12-${w} 0Z`} className="art-glass" />
      <ellipse cx={w / 2} cy="9" rx={w / 2} ry="8" className="art-wash" />
      <path d={`M0 ${Math.round(h * 0.4)}c0 11 ${w} 11 ${w} 0M0 ${Math.round(h * 0.68)}c0 11 ${w} 11 ${w} 0`} className="art-guide" />
      <circle cx={w - 9} cy={h * 0.66} r="2.4" className="art-solid art-pulse" />
    </g>
  </Place>;
}
