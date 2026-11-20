import {
  Activity, BadgeCheck, Bell, Building2, Calendar, Check, Cloud, Code2, Database,
  FileCheck, FileText, GraduationCap, Headset, LayoutDashboard, Lock, Mail, MessageCircle,
  Network, Receipt, Search, Server, Settings2, ShieldCheck, ShoppingCart, Target, UserCheck, Users, Wallet,
} from 'lucide-react';
import {
  Badge, Bars, Checklist, Lines, Mark, Panel, Profile, Progress, Ring, Route, stepDelay, Store, Tile, Trend,
} from './primitives';

export const analyticsScenes = {
  'Descriptive Analytics': <>
    <Panel x={21} y={19} w={273} h={143}>
      <Tile x={12} y={31} w={68} h={103} />
      <Mark x={32} y={42} icon={LayoutDashboard} size={24} /><Lines x={22} y={82} widths={[45, 30, 42]} gap={14} />
      <Trend x={93} y={34} w={163} h={38} values={[0.2, 0.66, 0.46, 0.71, 0.61, 0.85, 0.72]} />
      <Bars x={93} y={84} w={111} h={45} values={[0.65, 0.41, 0.78, 0.49, 0.91]} />
      <Ring x={237} y={107} r={16} progress={0.67} tone="mint" />
    </Panel>
  </>,
  'Diagnostic Analytics': <>
    <Panel x={22} y={24} w={215} h={135}>
      <Bars x={14} y={44} w={121} h={65} values={[0.51, 0.55, 0.46, 0.97, 0.59, 0.61]} />
      <circle cx="87" cy="46" r="5" className="art-solid art-tone-violet art-pulse" />
      <Lines x={158} y={52} widths={[37, 29, 43]} gap={14} />
      <Tile x={150} y={103} w={50} h={18} tone="violet" />
    </Panel>
    <circle cx="218" cy="103" r="38" className="art-glass" />
    <Mark x={193} y={78} icon={Search} size={58} />
  </>,
  'Predictive Analytics': <>
    <Panel x={24} y={20} w={269} h={143}>
      <path d="M156 32v96h97V32Z" className="art-wash art-tone-violet" />
      <Trend x={18} y={39} w={231} h={84} values={[0.16, 0.31, 0.29, 0.47, 0.46, 0.63, 0.72, 0.9]} forecast={4} />
      <path d="M155 37v87" className="art-guide" />
      <circle cx="184" cy="70" r="3" className="art-solid art-tone-accent art-pulse" />
    </Panel>
  </>,
  'Prescriptive Analytics': <>
    <Panel x={19} y={26} w={278} h={130} chrome={false}>
      <Route d="M49 67h54l34-39h56m-90 39h94m-94 0 34 39h56m12 0h32V67m-32-39h32v39" pulse />
      <Badge x={20} y={46} icon={Database} size={42} />
      <Tile x={145} y={17} w={61} h={23} tone="mint" />
      <Tile x={145} y={56} w={61} h={23} tone="violet" />
      <Tile x={145} y={95} w={61} h={23} />
      <Badge x={221} y={45} icon={Target} size={45} tone="mint" pulse />
    </Panel>
  </>,
  'Big Data Processing': <>
    <Store x={20} y={28} w={49} h={55} /><Store x={19} y={107} w={54} h={48} tone="violet" />
    <Route d="M72 59h40v34h96m-136 33h40V93m54 0V40h63m-63 53v52h63" pulse />
    <Route d="M112 93h96m-39 0v52h63" pulse delay={1.6} />
    <Badge x={125} y={64} icon={Settings2} size={57} tone="violet" />
    <Badge x={230} y={15} icon={Server} size={45} />
    <Badge x={238} y={72} icon={Server} size={42} tone="mint" />
    <Badge x={230} y={121} icon={Server} size={45} />
  </>,
  'Self-Service BI': <>
    <Panel x={25} y={17} w={267} h={145}>
      <Tile x={11} y={30} w={47} h={102} tone="violet" /><Mark x={25} y={39} icon={Settings2} size={18} />
      <Lines x={20} y={75} widths={[26, 21, 26]} gap={14} />
      <Ring x={98} y={63} r={17} progress={0.77} /><Ring x={98} y={112} r={13} progress={0.58} tone="mint" />
      <Tile x={130} y={30} w={124} h={48} /><Bars x={139} y={39} w={104} h={28} values={[0.45, 0.61, 0.46, 0.78, 0.81]} />
      <Tile x={130} y={85} w={124} h={46} tone="mint" />
      <Trend x={140} y={93} w={101} h={29} values={[0.25, 0.48, 0.36, 0.74, 0.82]} />
    </Panel>
  </>,
};

export const hrScenes = {
  'AI-Driven Talent Acquisition': <>
    <Panel x={23} y={23} w={268} h={139}>
      <path d="M92 30v97m89-97v97" className="art-guide" />
      {[0, 1, 2].map(i => <g key={i} className="art-arrive" style={stepDelay(i)}>
        <Tile x={12 + i * 88} y={38 + i * 12} w={67} h={55} tone={i === 2 ? 'mint' : 'peach'} />
        <Profile x={20 + i * 88} y={46 + i * 12} size={20} />
        <Lines x={49 + i * 88} y={54 + i * 12} widths={[21, 16]} />
        <Progress x={21 + i * 88} y={79 + i * 12} w={48} value={0.55 + i * 0.15} tone="mint" />
      </g>)}
    </Panel>
    <Badge x={250} y={105} icon={UserCheck} size={43} tone="mint" />
  </>,
  'Payroll & Compliance Simplified': <>
    <Panel x={34} y={15} w={166} h={148} chrome={false}>
      <Mark x={13} y={12} icon={Receipt} size={24} /><Lines x={46} y={22} widths={[73]} />
      {[0, 1, 2, 3].map(i => <g key={i}>
        <Lines x={15} y={47 + i * 17} widths={[68 - i * 7]} />
        <Lines x={110} y={47 + i * 17} widths={[37]} />
      </g>)}
      <Tile x={11} y={113} w={145} h={23} tone="peach" /><Lines x={20} y={125} widths={[67]} />
    </Panel>
    <Panel x={184} y={40} w={99} h={75} chrome={false}>
      <Mark x={11} y={13} icon={Wallet} size={26} /><Checklist x={13} y={51} widths={[51]} />
    </Panel>
    <Badge x={235} y={116} icon={ShieldCheck} size={45} tone="mint" pulse />
  </>,
  'Smart Attendance & Leave Management': <>
    <Panel x={22} y={23} w={218} h={137}>
      {Array.from({ length: 28 }, (_, i) => <rect key={i} x={13 + i % 7 * 28} y={32 + Math.floor(i / 7) * 24}
        width="21" height="18" rx="4" className={`art-wash art-tone-${i === 11 || i === 13 ? 'mint' : i % 6 === 2 ? 'peach' : 'accent'} ${i === 11 ? 'art-pulse' : ''}`} />)}
    </Panel>
    <Badge x={229} y={37} icon={Calendar} size={48} tone="peach" />
    <Badge x={243} y={106} icon={Check} size={47} tone="mint" pulse />
  </>,
  'Performance & Learning Management': <>
    <Panel x={26} y={21} w={264} h={139}>
      <Profile x={12} y={33} /><Lines x={44} y={41} widths={[75]} />
      <Bars x={13} y={70} w={105} h={46} values={[0.31, 0.49, 0.78, 0.7, 0.94]} />
      <Tile x={132} y={34} w={119} h={90} tone="peach" />
      <Mark x={169} y={43} icon={GraduationCap} size={31} />
      <Progress x={145} y={88} w={89} value={0.86} tone="mint" />
      <Progress x={145} y={104} w={89} value={0.64} />
    </Panel>
  </>,
  'Employee Self-Service (ESS) Portal': <>
    <Panel x={23} y={17} w={269} h={145}>
      <Tile x={10} y={32} w={76} h={101} tone="peach" />
      <Profile x={30} y={44} size={35} tone="peach" /><Lines x={21} y={99} widths={[52, 39]} />
      {[FileText, Wallet, Calendar, MessageCircle].map((icon, i) => <g key={i} className={i === 3 ? 'art-pulse' : undefined}>
        <Tile x={98 + i % 2 * 80} y={34 + Math.floor(i / 2) * 49} w={73} h={39} tone={i % 2 ? 'violet' : 'accent'} />
        <Mark x={105 + i % 2 * 80} y={43 + Math.floor(i / 2) * 49} icon={icon} size={19} />
        <Lines x={132 + i % 2 * 80} y={52 + Math.floor(i / 2) * 49} widths={[28]} />
      </g>)}
    </Panel>
  </>,
  'Data-Driven HR Analytics': <>
    <Panel x={55} y={17} w={239} h={148}>
      <Bars x={13} y={37} w={137} h={62} values={[0.6, 0.48, 0.7, 0.55, 0.81, 0.94]} />
      <Ring x={185} y={66} r={22} progress={0.69} tone="peach" />
      <Trend x={76} y={109} w={145} h={20} values={[0.21, 0.41, 0.36, 0.71, 0.66, 0.87]} />
    </Panel>
    <Panel x={21} y={101} w={98} h={58} chrome={false}>
      <Profile x={12} y={12} tone="peach" /><Profile x={39} y={13} /><Profile x={66} y={12} tone="mint" />
      <Lines x={17} y={45} widths={[63]} />
    </Panel>
  </>,
  'Secure Cloud-Based Solution': <>
    <Route d="M80 126h48V68h67m-67 58h106m-38-58v56" pulse />
    <Badge x={103} y={21} icon={Cloud} size={85} tone="peach" />
    <Badge x={173} y={47} icon={Lock} size={48} tone="mint" pulse />
    <Store x={33} y={98} w={58} h={55} />
    <Badge x={224} y={105} icon={FileCheck} size={51} tone="violet" />
    <Badge x={223} y={26} icon={ShieldCheck} size={43} tone="mint" />
  </>,
};

export const vendorScenes = {
  'Seamless Vendor Onboarding': <>
    <Panel x={25} y={19} w={268} h={141}>
      <Tile x={10} y={32} w={88} h={96} tone="violet" />
      <Mark x={24} y={44} icon={Building2} size={30} /><Lines x={20} y={93} widths={[58, 42]} />
      <Checklist x={111} y={36} widths={[114, 93, 102, 84]} gap={20} />
      <Progress x={111} y={120} w={130} value={0.92} tone="mint" />
    </Panel>
    <Badge x={243} y={108} icon={BadgeCheck} tone="mint" size={45} pulse />
  </>,
  'Centralized Vendor Database': <>
    <Panel x={51} y={17} w={241} h={145}>
      <Tile x={11} y={30} w={213} h={21} /><Mark x={18} y={34} icon={Search} size={14} />
      <Lines x={40} y={41} widths={[93]} />
      <path d="M109 57v72m61-72v72M12 81h213m-213 27h213" className="art-guide" />
      {[0, 1, 2].map(i => <g key={i}>
        <Lines x={19} y={68 + i * 25} widths={[62]} />
        <Lines x={120} y={68 + i * 25} widths={[33]} />
        <circle cx="202" cy={68 + i * 25} r="4" className="art-solid art-tone-mint art-pulse" style={stepDelay(i)} />
      </g>)}
    </Panel>
    <Store x={18} y={98} w={51} h={56} tone="violet" />
  </>,
  'Automated Procurement & Workflows': <>
    <Panel x={19} y={23} w={113} h={135} chrome={false}>
      <Mark x={14} y={13} icon={Receipt} size={28} /><Lines x={47} y={26} widths={[47]} />
      <Checklist x={14} y={54} widths={[51, 60, 41]} gap={20} />
    </Panel>
    <Route d="M130 78h39V47h38m-38 31v42h74" pulse />
    <Badge x={199} y={24} icon={ShoppingCart} size={52} tone="violet" />
    <Badge x={229} y={101} icon={Check} size={54} tone="mint" pulse />
  </>,
  'Performance Monitoring & SLA Tracking': <>
    <Panel x={24} y={23} w={271} h={135}>
      <Ring x={48} y={75} r={25} progress={0.91} tone="mint" />
      <Mark x={39} y={66} icon={Activity} />
      <Trend x={94} y={36} w={149} h={62} values={[0.39, 0.63, 0.51, 0.7, 0.88, 0.76, 0.95]} />
      <Progress x={95} y={114} w={141} value={0.91} tone="mint" />
    </Panel>
  </>,
  'Risk & Compliance Management': <>
    <Panel x={24} y={24} w={170} h={132}>
      <Checklist x={13} y={34} widths={[111, 82, 91, 103]} />
      <Progress x={13} y={115} w={127} tone="mint" />
    </Panel>
    <Badge x={173} y={35} icon={ShieldCheck} size={67} tone="mint" />
    <Panel x={208} y={100} w={85} h={58} chrome={false}>
      <Mark x={10} y={11} icon={Bell} size={19} />
      <Lines x={34} y={20} widths={[37]} /><Progress x={12} y={40} w={60} value={0.49} tone="peach" />
    </Panel>
  </>,
  'Seamless Integrations': <>
    <Route d="M70 45h35l45 45H232m-82 0-44 39H72m78-39 48-49h40m-88 49 49 37h37" pulse />
    <Badge x={112} y={52} icon={Network} size={80} tone="violet" />
    <Badge x={27} y={23} icon={Building2} size={45} />
    <Badge x={27} y={107} icon={Wallet} size={45} tone="peach" />
    <Badge x={238} y={20} icon={ShoppingCart} size={45} />
    <Badge x={239} y={103} icon={Cloud} size={46} tone="mint" pulse />
  </>,
  'Data-Driven Insights': <>
    <Panel x={22} y={18} w={272} h={143}>
      <Bars x={15} y={39} w={108} h={67} values={[0.52, 0.72, 0.58, 0.83, 0.68, 0.92]} tone="mint" />
      <Bars x={146} y={39} w={106} h={67} values={[0.34, 0.61, 0.51, 0.74, 0.66, 0.82]} tone="violet" />
      <Lines x={19} y={122} widths={[66]} /><Lines x={151} y={122} widths={[69]} />
    </Panel>
    <Badge x={122} y={113} icon={Target} size={44} tone="mint" />
  </>,
};

export const crmScenes = {
  'Sales Automation': <>
    <Panel x={24} y={18} w={265} h={147}>
      <path d="M88 31v104m89-104v104" className="art-guide" />
      {[0, 1, 2].map(i => <g key={i}>
        <Tile x={12 + i * 86} y={34} w={67} h={12} tone={i === 2 ? 'mint' : 'violet'} />
        <Tile x={12 + i * 86} y={54} w={67} h={34} />
        <Profile x={17 + i * 86} y={60} size={18} />
        <Lines x={40 + i * 86} y={66} widths={[25, 19]} gap={7} />
        <Progress x={16 + i * 86} y={113} w={58} value={0.46 + i * 0.22} tone={i === 2 ? 'mint' : 'accent'} />
      </g>)}
    </Panel>
  </>,
  'Marketing Automation': <>
    <Badge x={21} y={30} icon={Users} size={51} tone="violet" />
    <Badge x={23} y={108} icon={Users} size={46} tone="peach" />
    <Route d="M72 56h23v41h70m-96 34h26V97m70 0h36" pulse />
    <Badge x={112} y={59} icon={Mail} size={59} pulse />
    <Panel x={185} y={28} w={110} h={126}>
      <Bars x={10} y={39} w={88} h={48} values={[0.37, 0.52, 0.66, 0.57, 0.88]} tone="violet" />
      <Progress x={11} y={104} w={87} tone="mint" />
    </Panel>
  </>,
  'Customer Support & Helpdesk': <>
    <Panel x={23} y={22} w={276} h={140}>
      <Tile x={9} y={30} w={96} h={99} tone="violet" />
      {[0, 1, 2].map(i => <g key={i}>
        <Profile x={16} y={36 + i * 28} size={17} /><Lines x={39} y={45 + i * 28} widths={[46]} />
      </g>)}
      <Tile x={118} y={38} w={103} h={20} /><Lines x={128} y={48} widths={[62]} />
      <g className="art-arrive">
        <Tile x={149} y={67} w={113} h={21} tone="mint" /><Lines x={159} y={77} widths={[79]} />
      </g>
      <Checklist x={123} y={105} widths={[114]} />
    </Panel>
    <Badge x={251} y={107} icon={Headset} size={43} tone="violet" />
  </>,
  '360° Customer View': <>
    <Panel x={25} y={17} w={265} h={147} chrome={false}>
      <Tile x={11} y={13} w={80} h={120} tone="peach" />
      <Profile x={30} y={29} size={41} tone="peach" /><Lines x={25} y={89} widths={[54, 38]} gap={12} />
      <path d="M113 34v86" className="art-connector" />
      {[0, 1, 2].map(i => <g key={i}>
        <circle cx="113" cy={40 + 30 * i} r="4" className="art-pin art-pulse" style={stepDelay(i)} />
        <Lines x={128} y={40 + 30 * i} widths={[49, 38]} gap={7} />
      </g>)}
      <Ring x={219} y={52} r={20} progress={0.72} />
      <Mark x={209} y={42} icon={Users} />
      <Bars x={187} y={88} w={61} h={35} values={[0.4, 0.75, 0.57, 0.91]} tone="mint" />
    </Panel>
  </>,
  'Cloud-Based & Scalable': <>
    <Route d="M54 58h91v36m1 0h101V53m-101 41v46h85m-85 0H82" pulse />
    <Badge x={107} y={43} icon={Cloud} size={87} />
    <Badge x={24} y={34} icon={Users} size={49} tone="violet" />
    <Badge x={226} y={21} icon={LayoutDashboard} size={50} tone="mint" />
    <Store x={38} y={119} w={49} h={39} />
    <Badge x={222} y={114} icon={Lock} size={47} tone="mint" pulse />
  </>,
  'Seamless Integration': <>
    <Route d="M68 42h27v49h116v-49h36m-36 49v48h40M95 91v48H68" pulse />
    <Badge x={21} y={20} icon={Mail} size={44} tone="violet" />
    <Badge x={23} y={117} icon={Building2} size={44} tone="peach" />
    <Badge x={244} y={18} icon={Activity} size={45} />
    <Badge x={248} y={117} icon={Code2} size={43} tone="mint" />
    <Panel x={87} y={48} w={131} h={89}>
      <Mark x={12} y={33} icon={Network} size={24} />
      <Progress x={44} y={38} w={75} /><Progress x={44} y={56} w={75} tone="mint" />
    </Panel>
  </>,
};
