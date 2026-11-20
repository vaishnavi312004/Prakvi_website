import { Building2, Cloud, Cpu, Flag, Layers, Monitor, Network, Server, ShieldCheck } from 'lucide-react';
import { Badge, Lines, Mark, Panel, Route, Store, Tile } from './primitives';

export const infrastructureScenes = {
  'Cloud Services': <>
    <Route d="M160 77V94H67V112M160 94H253V112M160 94V117" />
    <Badge x={132} y={20} size={56} icon={Cloud} />
    <Panel x={39} y={109} w={56} h={40} chrome={false}><Mark x={17} y={9} icon={Server} size={22} /></Panel>
    <Panel x={132} y={109} w={56} h={40} chrome={false}><Mark x={17} y={9} icon={Server} size={22} /></Panel>
    <Panel x={225} y={109} w={56} h={40} chrome={false}><Mark x={17} y={9} icon={ShieldCheck} size={22} /></Panel>
    <circle cx="160" cy="94" r="4" className="art-pin" />
  </>,
  'System Integration Services': <>
    <Route d="M95 83H130M191 83H225M160 104V133" />
    <Panel x={28} y={48} w={72} h={73}>
      <Mark x={11} y={29} icon={Monitor} size={23} />
      <Lines x={42} y={39} widths={[19, 14]} />
    </Panel>
    <Badge x={129} y={53} size={62} icon={Network} tone="peach" />
    <Store x={228} y={57} w={55} h={56} tone="violet" />
    <Badge x={141} y={123} size={38} icon={Cpu} />
  </>,
  'Enterprise Architecture & Consulting': <>
    <Route d="M71 108H112M208 108H250M160 24V45M160 126V149" />
    <path d="m160 69 66 34-66 34-66-34Z" className="art-glass" />
    <path d="m160 53 66 34-66 34-66-34Z" className="art-glass art-tone-violet" />
    <path d="m160 37 66 34-66 34-66-34Z" className="art-glass" />
    <Mark x={144} y={54} icon={Layers} size={32} />
    <Badge x={27} y={87} size={42} icon={Building2} />
    <Badge x={251} y={87} size={42} icon={ShieldCheck} tone="violet" />
    <circle cx="160" cy="148" r="4" className="art-pin" />
  </>,
  'Project Management & Enterprise Solutions': <>
    <Panel x={45} y={35} w={221} h={111}>
      <Lines x={18} y={35} widths={[63, 42]} gap={8} />
      <Tile x={22} y={55} w={49} h={8} tone="peach" />
      <Tile x={75} y={68} w={55} h={8} tone="violet" />
      <Tile x={134} y={81} w={62} h={8} />
      <Route d="M25 94H72L99 83H128L156 68H185" />
      <circle cx="72" cy="94" r="3.8" className="art-pin" />
      <circle cx="128" cy="83" r="3.8" className="art-pin" />
      <circle cx="185" cy="68" r="3.8" className="art-pin" />
    </Panel>
    <Badge x={231} y={24} size={48} icon={Flag} tone="peach" />
  </>,
};
