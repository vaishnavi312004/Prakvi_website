import { ArrowUpRight, Building2, Cloud, Database, Network, Server, ShieldCheck } from 'lucide-react';
import { Badge, Checklist, Lines, Mark, Panel, Ring, Route, Trend } from './primitives';

export const cloudScenes = {
  'System Integration (Hybrid Architectures)': <>
    <Route d="M78 105H105Q120 105 120 89V67H136M242 105H215Q200 105 200 89V67H184M160 92V125" />
    <Badge x={129} y={24} size={62} icon={Cloud} tone="violet" />
    <Panel x={29} y={78} w={62} h={68} chrome={false}>
      <Mark x={19} y={12} size={24} icon={Building2} />
      <Lines x={17} y={46} widths={[28, 23]} />
    </Panel>
    <Panel x={229} y={78} w={62} h={68} chrome={false}>
      <Mark x={19} y={12} size={24} icon={Server} />
      <Lines x={17} y={46} widths={[28, 23]} />
    </Panel>
    <Badge x={141} y={118} size={38} icon={Network} />
    <circle cx="120" cy="90" r="4" className="art-pin" />
    <circle cx="200" cy="90" r="4" className="art-pin" />
  </>,
  'Cloud Advisory & Migration': <>
    <Panel x={85} y={36} w={147} h={109}>
      <path d="M19 80h24l20-24h19l20-21h25" className="art-road" />
      <Route d="M19 80h24l20-24h19l20-21h25" />
      <circle cx="43" cy="80" r="4" className="art-pin" />
      <circle cx="82" cy="56" r="4" className="art-pin" />
      <circle cx="113" cy="35" r="4" className="art-pin" />
      <Lines x={20} y={97} widths={[34]} />
    </Panel>
    <Route d="M77 119H99M229 63H245" />
    <Badge x={35} y={100} size={48} icon={Database} tone="peach" />
    <Badge x={238} y={40} size={48} icon={Cloud} />
    <Badge x={215} y={111} size={33} icon={ArrowUpRight} tone="violet" />
  </>,
  'Infrastructure Management': <>
    <Panel x={56} y={32} w={185} h={116}>
      <Trend x={16} y={33} w={99} h={33} values={[0.14, 0.34, 0.26, 0.62, 0.53, 0.86]} />
      <Ring x={147} y={53} r={16} progress={0.8} tone="violet" />
      <Checklist x={16} y={79} widths={[44, 64]} />
      <Lines x={129} y={85} widths={[36, 28]} />
    </Panel>
    <Badge x={29} y={91} size={44} icon={Server} tone="peach" />
    <Badge x={227} y={94} size={50} icon={ShieldCheck} tone="violet" />
  </>,
};
