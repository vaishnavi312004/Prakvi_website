import {
  Activity, Box, Building2, Calendar, Check, ClipboardCheck, Cloud, Code2, FileCheck, Flag, Headset,
  Laptop, Lock, Network, Package, Plug, Server, Settings2, ShieldCheck, Smartphone, Tablet, Target, Truck,
} from 'lucide-react';
import {
  Badge, Bars, Checklist, Lines, Mark, Panel, Phone, Profile, Progress,
  Ring, Route, stepDelay, Store, Tile, Trend,
} from './primitives';

export const projectScenes = {
  'End-to-End Project Planning': <>
    <Panel x={24} y={19} w={261} h={144}>
      <path d="M69 22v121m34-111v100m33-100v100m33-100v100m33-100v100m33-100v100" className="art-guide" />
      <Lines x={13} y={47} widths={[39, 29, 40, 34, 26]} gap={18} />
      {[0, 1, 2, 3, 4].map((i) => <g key={i}>
        <rect x={79 + i * 22} y={40 + i * 18} width={[55, 71, 45, 61, 48][i]} height="9" rx="4"
          className={`art-solid art-progress art-tone-${i % 2 ? 'violet' : 'accent'}`} style={stepDelay(i)} />
      </g>)}
      <Route d="M104 49v9h16m32 9v9h13m18 9v9h17m21 9v10h14" />
      <path d="m208 43 5 5-5 5-5-5Z" className="art-solid art-tone-peach art-pulse" />
    </Panel>
    <Badge x={252} y={127} icon={Calendar} tone="peach" size={44} />
  </>,
  'Strategic Execution': <>
    <path d="M29 134 73 87h55l38-29h59l35-30" className="art-road" />
    <Route d="M29 134 73 87h55l38-29h59l35-30" pulse />
    <Badge x={18} y={121} icon={Flag} size={38} />
    <Badge x={69} y={66} icon={ClipboardCheck} tone="violet" size={40} />
    <Badge x={139} y={43} icon={Check} tone="mint" size={40} />
    <Badge x={244} y={12} icon={Target} tone="peach" size={45} pulse />
    <Panel x={154} y={105} w={132} h={62} chrome={false}>
      <Mark x={12} y={12} icon={Flag} /><Lines x={38} y={18} widths={[72, 51]} />
      <Progress x={12} y={46} w={107} value={0.78} tone="mint" />
    </Panel>
  </>,
  'Risk Management': <>
    <Panel x={26} y={16} w={185} h={150}>
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={20 + i % 4 * 37} y={34 + Math.floor(i / 4) * 25}
        width="32" height="20" rx="4" className={`art-wash art-tone-${i < 6 ? 'peach' : i < 10 ? 'violet' : 'mint'} ${i === 2 || i === 7 ? 'art-pulse' : ''}`} />)}
      <circle cx="114" cy="44" r="4" className="art-solid art-tone-peach art-pulse" />
      <circle cx="77" cy="94" r="3.4" className="art-solid art-tone-accent" />
    </Panel>
    <Panel x={201} y={59} w={90} h={104} chrome={false}>
      <Mark x={30} y={10} icon={ShieldCheck} size={28} />
      <Progress x={12} y={53} w={66} value={0.7} tone="mint" />
      <Progress x={12} y={67} w={66} value={0.47} tone="peach" />
      <Lines x={12} y={87} widths={[52]} />
    </Panel>
  </>,
  'Stakeholder Communication': <>
    <Panel x={24} y={29} w={211} h={130}>
      <Tile x={8} y={26} w={44} h={95} />
      {[0, 1, 2].map(i => <Profile key={i} x={19} y={32 + i * 26} tone={i === 1 ? 'peach' : 'violet'} />)}
      {[0, 1, 2].map(i => <g className="art-arrive" style={stepDelay(i)} key={i}>
        <Tile x={i === 1 ? 90 : 65} y={36 + i * 26} w={111 - i * 8} h={19} tone={i === 1 ? 'mint' : 'accent'} />
        <Lines x={i === 1 ? 101 : 76} y={45 + i * 26} widths={[69 - i * 8]} />
      </g>)}
    </Panel>
    <Panel x={206} y={17} w={83} h={66} chrome={false}>
      <Profile x={10} y={12} /><Profile x={48} y={12} tone="peach" />
      <Lines x={17} y={49} widths={[48]} />
      <circle cx="74" cy="8" r="4.5" className="art-solid art-tone-peach art-pulse" />
    </Panel>
  </>,
  'Performance Monitoring & Reporting': <>
    <Panel x={25} y={17} w={260} h={148}>
      {[0, 1, 2].map(i => <g key={i}>
        <Tile x={13 + i * 78} y={31} w={68} h={26} tone={i === 2 ? 'mint' : 'accent'} />
        <Lines x={23 + i * 78} y={40} widths={[25, 41]} gap={8} />
      </g>)}
      <Bars x={18} y={77} w={143} h={51} values={[0.33, 0.52, 0.45, 0.72, 0.65, 0.89]} />
      <Ring x={205} y={103} r={22} progress={0.83} tone="mint" />
      <Mark x={195} y={93} icon={Activity} />
    </Panel>
  </>,
  'Seamless Delivery & Handover': <>
    <Panel x={124} y={15} w={156} h={148} chrome={false}>
      <Mark x={15} y={12} icon={FileCheck} size={25} /><Lines x={49} y={23} widths={[76]} />
      <Checklist x={17} y={53} widths={[99, 79, 94, 70]} />
      <Progress x={17} y={136} w={117} value={0.93} tone="mint" />
    </Panel>
    <path d="m30 81 48-23 43 23-45 25Z" className="art-solid art-tone-peach" />
    <path d="m30 81 46 25v48l-46-26Z" className="art-wash art-tone-peach" />
    <path d="m76 106 45-25v48l-45 25Z" className="art-glass" />
    <Badge x={18} y={117} icon={Package} tone="peach" size={43} />
    <Badge x={251} y={119} icon={Check} tone="mint" size={44} pulse />
  </>,
};

export const mobilityScenes = {
  'Strategy & Implementation': <>
    <Panel x={21} y={42} w={266} h={109} chrome={false}>
      <Route d="M31 72h67V58h62V45h73" pulse />
      <Lines x={22} y={91} widths={[37]} /><Lines x={127} y={91} widths={[46]} /><Lines x={210} y={91} widths={[34]} />
    </Panel>
    <Badge x={37} y={76} icon={Smartphone} size={39} />
    <Badge x={98} y={63} icon={Settings2} size={38} tone="violet" />
    <Badge x={163} y={48} icon={Laptop} size={42} />
    <Badge x={232} y={26} icon={Flag} size={46} tone="mint" pulse />
  </>,
  'Mobile Device & Endpoint Security': <>
    <Panel x={39} y={44} w={149} h={90}>
      <Tile x={13} y={33} w={119} h={42} /><Lines x={24} y={56} widths={[70, 57]} />
      <path d="M-10 90H157l-12 9H3Z" className="art-glass" />
    </Panel>
    <Phone x={211} y={25} w={64} h={127}>
      <Tile x={12} y={28} w={40} h={72} tone="mint" /><Mark x={21} y={49} icon={Lock} size={24} />
      <path d="M12 34h40" className="art-scan" />
    </Phone>
    <Badge x={162} y={93} icon={ShieldCheck} size={64} tone="mint" pulse />
    <Badge x={24} y={112} icon={Tablet} size={42} />
  </>,
  'Policy Development & Compliance': <>
    <Panel x={59} y={17} w={167} h={149} chrome={false}>
      <Mark x={15} y={11} icon={FileCheck} size={24} /><Lines x={48} y={19} widths={[83, 65]} />
      <Checklist x={18} y={47} widths={[110, 91, 104, 79]} gap={20} />
      <path d="M23 137c13-18 13 10 27-1 7-7 12-5 24-7" className="art-line" />
    </Panel>
    <Badge x={31} y={91} icon={Lock} tone="violet" size={46} />
    <Badge x={207} y={109} icon={Check} tone="mint" size={54} pulse />
  </>,
  'Seamless Integration': <>
    <Route d="M83 95h60V48h62M143 95v44h71" pulse />
    <Phone x={23} y={32} w={64} h={127}>
      <Tile x={12} y={27} w={40} h={81} />
      <Mark x={21} y={48} icon={Plug} size={23} />
      <Progress x={17} y={86} w={29} />
    </Phone>
    <Badge x={117} y={69} icon={Network} size={52} tone="violet" />
    <Badge x={201} y={18} icon={Cloud} size={60} />
    <Store x={209} y={108} w={58} h={46} tone="mint" />
    <Badge x={263} y={75} icon={Building2} size={34} tone="peach" />
  </>,
  'Ongoing Support & Optimization': <>
    <Panel x={40} y={22} w={251} h={138}>
      <Lines x={12} y={37} widths={[89]} />
      <Checklist x={13} y={54} widths={[71, 57, 76]} />
      <Tile x={116} y={34} w={122} h={79} />
      <Trend x={125} y={46} w={103} h={50} values={[0.26, 0.48, 0.37, 0.67, 0.57, 0.83]} />
      <Progress x={121} y={123} w={110} tone="mint" />
    </Panel>
    <Badge x={21} y={113} icon={Headset} size={47} tone="violet" pulse />
  </>,
};

export const supplyScenes = {
  'Logistics & Transportation Management': <>
    <Panel x={22} y={19} w={260} h={144} chrome={false}>
      <path d="M0 56h260m-207-56v144m59-144v144m67-144v144M0 108h260M14 139l112-132m36 137 69-144" className="art-guide" />
      <Tile x={12} y={17} w={32} h={30} tone="mint" />
      <Tile x={189} y={62} w={49} h={37} tone="mint" />
      <path d="M35 113h52V80h61V47h79" className="art-road" />
      <Route d="M35 113h52V80h61V47h79" pulse />
      <circle cx="35" cy="113" r="7" className="art-pin" /><circle cx="227" cy="47" r="7" className="art-pin art-pulse" />
    </Panel>
    <Badge x={234} y={113} icon={Truck} size={53} tone="peach" />
  </>,
  'Inventory & Warehouse Optimization': <>
    <Panel x={24} y={22} w={184} h={142} chrome={false}>
      <path d="M17 53h149m-149 35h149m-149 35h149m-144-91v103m139-103v103" className="art-shelf" />
      {Array.from({ length: 10 }, (_, i) => <g key={i} className={i === 4 ? 'art-arrive' : undefined}>
        <Tile x={30 + i % 4 * 32} y={31 + Math.floor(i / 4) * 35} w={25} h={20} tone={i % 3 === 0 ? 'peach' : 'accent'} />
      </g>)}
    </Panel>
    <Panel x={197} y={51} w={92} h={106} chrome={false}>
      <Mark x={13} y={11} icon={Box} /><Lines x={39} y={19} widths={[35]} />
      <Bars x={12} y={40} w={65} h={38} values={[0.44, 0.6, 0.83, 0.65]} tone="mint" />
      <Progress x={12} y={88} w={65} />
    </Panel>
  </>,
  'Demand Forecasting & Planning': <>
    <Panel x={23} y={18} w={266} h={144}>
      <path d="M99 31v92" className="art-guide" />
      <Lines x={13} y={44} widths={[52, 63, 38, 59]} gap={15} />
      <Trend x={111} y={40} w={133} h={67} values={[0.25, 0.44, 0.36, 0.61, 0.67, 0.83, 0.94]} forecast={3} />
      <Tile x={115} y={115} w={48} h={13} tone="mint" /><Tile x={172} y={115} w={65} h={13} />
    </Panel>
    <Badge x={23} y={107} icon={Calendar} size={45} tone="peach" />
  </>,
  'Supplier & Vendor Management': <>
    <Panel x={25} y={17} w={178} h={146}>
      {[0, 1, 2].map(i => <g key={i}>
        <Tile x={11} y={31 + i * 34} w={154} h={28} tone={i === 1 ? 'mint' : 'accent'} />
        <Mark x={17} y={36 + i * 34} icon={Building2} size={17} />
        <Lines x={42} y={41 + i * 34} widths={[62, 45]} />
        <circle cx="151" cy={45 + i * 34} r="3.4" className="art-solid art-tone-mint art-pulse" style={stepDelay(i)} />
      </g>)}
    </Panel>
    <Route d="M202 79h29v-35h17m-17 35v49h17" pulse />
    <Badge x={241} y={24} icon={ClipboardCheck} size={47} tone="mint" />
    <Badge x={241} y={106} icon={Package} size={47} tone="peach" />
  </>,
  'SCM Technology Integration': <>
    <Route d="M54 107h48l31-37h55l33 41h43M160 69v65" pulse />
    <Badge x={17} y={90} icon={Truck} size={48} tone="peach" />
    <Badge x={245} y={92} icon={Package} size={46} tone="mint" />
    <Panel x={93} y={21} w={131} h={76}>
      <Mark x={12} y={33} icon={Network} size={25} />
      <Bars x={47} y={33} w={69} h={29} values={[0.52, 0.7, 0.58, 0.88]} />
    </Panel>
    <Store x={132} y={119} w={57} h={42} />
  </>,
};

export const integrationScenes = {
  'Application Integration': <>
    <Panel x={17} y={27} w={116} h={110}>
      <Mark x={11} y={33} icon={Code2} size={28} /><Lines x={44} y={41} widths={[55, 40]} />
      <Tile x={13} y={72} w={86} h={22} />
    </Panel>
    <Panel x={186} y={48} w={109} h={109}>
      <Mark x={12} y={32} icon={Laptop} size={27} />
      <Checklist x={14} y={66} widths={[55, 42]} gap={16} />
    </Panel>
    <Route d="M133 77h26v25h26" pulse />
    <Badge x={136} y={59} icon={Plug} size={42} tone="mint" />
  </>,
  'Cloud Integration': <>
    <Route d="M80 101h65V49h64m-64 52h108m-108 0v43h64" pulse />
    <Panel x={21} y={54} w={76} h={77} chrome={false}>
      <Mark x={24} y={13} icon={Laptop} size={28} /><Lines x={17} y={56} widths={[44]} />
    </Panel>
    <Badge x={115} y={70} icon={Cloud} size={60} tone="violet" pulse />
    <Badge x={205} y={20} icon={Server} size={50} />
    <Badge x={246} y={76} icon={Cloud} size={47} tone="mint" />
    <Badge x={203} y={119} icon={Lock} size={46} tone="peach" />
  </>,
  'Data Integration & Migration': <>
    <Store x={28} y={40} w={68} h={88} />
    <Store x={224} y={40} w={68} h={88} tone="mint" />
    <path d="M96 92h128" className="art-road" />
    <Route d="M96 92h128" pulse />
    <Route d="M96 92h128" pulse delay={1.7} />
    <Badge x={141} y={34} icon={Code2} size={39} tone="violet" />
    <Panel x={101} y={116} w={116} h={46} chrome={false}>
      <Progress x={12} y={18} w={92} value={0.77} tone="mint" />
      <Lines x={12} y={32} widths={[60]} />
    </Panel>
  </>,
  'Enterprise Service Bus (ESB) Implementation': <>
    <Panel x={23} y={72} w={271} h={46} chrome={false}>
      <Route d="M15 23h239" pulse /><Route d="M15 23h239" pulse delay={1.8} />
      {[51, 110, 174, 227].map(x => <circle key={x} cx={x} cy="23" r="5" className="art-pin" />)}
    </Panel>
    <Route d="M74 60v34m59 1v34m64-72v38m53 0v34" />
    <Badge x={53} y={17} icon={Code2} size={43} />
    <Badge x={110} y={124} icon={Server} size={43} tone="violet" />
    <Badge x={174} y={13} icon={Cloud} size={46} tone="mint" />
    <Badge x={227} y={124} icon={Network} size={43} tone="peach" />
  </>,
  'Security & Compliance Integration': <>
    <Panel x={34} y={25} w={245} h={131}>
      <Checklist x={111} y={40} widths={[102, 83, 92, 74]} gap={17} />
      <Progress x={111} y={114} w={110} tone="mint" />
      <path d="M46 49l35 13v21c0 18-17 31-35 39-18-8-35-21-35-39V62Z" className="art-wash art-tone-mint" />
      <Mark x={30} y={66} icon={Lock} size={32} />
      <path d="M13 69h66" className="art-scan" />
    </Panel>
    <Badge x={245} y={115} icon={ShieldCheck} size={44} tone="mint" pulse />
  </>,
};
