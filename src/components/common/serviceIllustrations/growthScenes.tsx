import {
  Activity, Apple, Bell, Bot, Box, Bug, Check, Code2, CreditCard, Database, Fingerprint, Heart,
  Image, Layers, Mail, Megaphone, MessageCircle, PenLine, Play, Plug, Search, Send,
  ShoppingBag, ShoppingCart, Sparkles, Star, Target, Users,
} from 'lucide-react';
import {
  Badge, Bars, Checklist, Lines, Mark, Panel, Phone, Profile, Progress, Ring, Route, stepDelay, Tile, Trend,
} from './primitives';

export const marketingScenes = {
  'Search Engine Optimization (SEO)': <>
    <Panel x={23} y={16} w={206} h={146}>
      <Tile x={12} y={31} w={180} h={20} /><Mark x={18} y={34} icon={Search} size={14} />
      <Lines x={39} y={40} widths={[92]} />
      {[0, 1, 2].map(i => <g key={i}>
        <rect x="13" y={62 + i * 25} width="14" height="13" rx="3" className="art-wash art-tone-mint" />
        <Lines x={36} y={64 + i * 25} widths={[91, 123]} gap={8} />
      </g>)}
    </Panel>
    <Panel x={182} y={83} w={110} h={76} chrome={false}>
      <Trend x={12} y={14} w={83} h={46} values={[0.15, 0.35, 0.32, 0.61, 0.76, 0.94]} />
    </Panel>
  </>,
  'Pay-Per-Click (PPC) Advertising': <>
    <Panel x={39} y={23} w={252} h={136}>
      <Tile x={12} y={32} w={87} h={89} tone="peach" />
      <Mark x={32} y={43} icon={Megaphone} size={33} />
      <Progress x={24} y={106} w={62} value={0.6} tone="peach" />
      <Bars x={118} y={49} w={112} h={59} values={[0.44, 0.72, 0.51, 0.91, 0.7]} />
      <Lines x={126} y={122} widths={[61]} />
    </Panel>
    <Badge x={20} y={116} icon={Target} size={46} tone="mint" pulse />
  </>,
  'Social Media Marketing': <>
    <Phone x={97} y={10} w={116} h={155}>
      <Profile x={13} y={25} size={18} /><Lines x={38} y={32} widths={[50, 38]} gap={7} />
      <Tile x={13} y={51} w={90} h={48} tone="violet" />
      <Mark x={44} y={62} icon={Image} size={27} />
      <Mark x={14} y={109} icon={Heart} size={14} /><Mark x={39} y={109} icon={MessageCircle} size={14} />
      <Lines x={16} y={130} widths={[67]} />
    </Phone>
    <Badge x={54} y={43} icon={Heart} size={47} tone="peach" pulse />
    <Badge x={204} y={69} icon={MessageCircle} size={44} tone="violet" pulse />
    <Badge x={52} y={114} icon={Users} size={40} tone="mint" />
  </>,
  'Content Marketing': <>
    <Panel x={25} y={18} w={197} h={147}>
      <Lines x={18} y={37} widths={[103]} />
      <Tile x={14} y={49} w={167} h={42} tone="violet" /><Mark x={83} y={58} icon={Image} size={26} />
      <Lines x={18} y={106} widths={[142, 113, 142, 90]} gap={9} />
    </Panel>
    <Badge x={212} y={17} icon={PenLine} size={45} />
    <Panel x={187} y={87} w={103} h={68} chrome={false}>
      <Mark x={13} y={12} icon={Send} size={22} /><Lines x={44} y={22} widths={[40]} />
      <Progress x={13} y={50} w={76} tone="mint" />
    </Panel>
  </>,
  'Email Marketing & Automation': <>
    <Panel x={19} y={31} w={123} h={113}>
      <path d="M15 40l47 25 47-25v55H15Z" className="art-wash art-tone-accent" />
      <path d="m15 42 47 28 47-28m-94 53 36-28m58 28-36-28" className="art-guide" />
      <Mark x={49} y={45} icon={Mail} size={25} />
    </Panel>
    <Route d="M142 88h29V37h45m-45 51h81m-81 0v54h45" pulse />
    <Badge x={204} y={16} icon={Users} size={42} />
    <Badge x={241} y={67} icon={Send} size={43} tone="violet" />
    <Badge x={204} y={121} icon={Check} size={43} tone="mint" pulse />
  </>,
  'Conversion Rate Optimization (CRO)': <>
    <Panel x={20} y={20} w={178} h={138} chrome={false}>
      {['M14 19h150l-14 22H28Z','M31 46h116l-13 22H44Z','M47 73h84l-12 22H59Z','M62 100h54l-12 20H74Z'].map((d, i) =>
        <path key={d} d={d} className={`art-wash art-tone-${i === 3 ? 'mint' : i === 2 ? 'violet' : 'accent'} art-arrive`} style={stepDelay(i)} />)}
      <Route d="M89 27v84" pulse />
    </Panel>
    <Panel x={185} y={55} w={110} h={97} chrome={false}>
      <Ring x={53} y={37} r={21} progress={0.71} tone="mint" />
      <Mark x={43} y={27} icon={Target} />
      <Progress x={16} y={78} w={77} value={0.73} tone="mint" />
    </Panel>
  </>,
  'Online Reputation Management (ORM)': <>
    <Panel x={82} y={23} w={205} h={140}>
      {[0, 1, 2].map(i => <g key={i} className="art-arrive" style={stepDelay(i)}>
        <Profile x={13} y={32 + i * 32} size={19} tone={i === 1 ? 'peach' : 'violet'} />
        <Lines x={41} y={37 + i * 32} widths={[77, 100]} />
        <circle cx="181" cy={41 + i * 32} r="4" className={`art-solid art-tone-${i === 1 ? 'peach' : 'mint'}`} />
      </g>)}
    </Panel>
    <Panel x={20} y={57} w={99} h={70} chrome={false}>
      <Mark x={33} y={12} icon={Star} size={30} />
      {[0, 1, 2, 3, 4].map(i => <Mark key={i} x={12 + i * 15} y={49} icon={Star} size={12} />)}
    </Panel>
  </>,
};

export const mobileScenes = {
  'Native Mobile App Development': <>
    <Phone x={94} y={9} w={122} h={158}>
      <Profile x={15} y={23} /><Lines x={47} y={30} widths={[49, 37]} />
      <Tile x={13} y={51} w={97} h={46} /><Mark x={47} y={58} icon={Image} size={28} />
      <Tile x={13} y={105} w={44} h={24} tone="mint" /><Tile x={65} y={105} w={44} h={24} tone="violet" />
      <Progress x={20} y={139} w={82} />
    </Phone>
    <Badge x={59} y={101} icon={Apple} size={42} tone="violet" />
    <Badge x={198} y={36} icon={Sparkles} size={46} pulse />
  </>,
  'Cross-Platform App Development': <>
    <Route d="M77 93v52h161V93M159 145v-61" pulse />
    <Phone x={34} y={13} w={85} h={126}>
      <Mark x={29} y={25} icon={Apple} size={25} /><Tile x={13} y={61} w={59} h={38} />
      <Lines x={22} y={81} widths={[37]} />
    </Phone>
    <Phone x={198} y={13} w={85} h={126}>
      <Mark x={29} y={25} icon={Bot} size={25} /><Tile x={13} y={61} w={59} h={38} tone="mint" />
      <Lines x={22} y={81} widths={[37]} />
    </Phone>
    <Badge x={133} y={69} icon={Layers} size={51} tone="violet" pulse />
  </>,
  'Enterprise Mobile Apps': <>
    <Phone x={24} y={23} w={87} h={141}>
      <Tile x={11} y={29} w={64} h={73} tone="mint" /><Mark x={27} y={44} icon={Fingerprint} size={34} />
      <Progress x={16} y={113} w={54} tone="mint" />
    </Phone>
    <Panel x={123} y={28} w={168} h={125}>
      <Profile x={13} y={36} /><Lines x={45} y={42} widths={[87, 61]} />
      <Tile x={12} y={72} w={66} h={36} /><Tile x={88} y={72} w={66} h={36} tone="violet" />
      <Mark x={32} y={81} icon={Users} /><Mark x={109} y={81} icon={Database} />
    </Panel>
  </>,
  'Mobile E-Commerce Solutions': <>
    <Phone x={49} y={10} w={114} h={152}>
      <Mark x={15} y={23} icon={ShoppingBag} size={19} /><Lines x={43} y={31} widths={[48]} />
      <Tile x={12} y={49} w={41} h={48} tone="peach" /><Tile x={61} y={49} w={41} h={48} tone="mint" />
      <Mark x={22} y={61} icon={Box} size={20} /><Mark x={72} y={61} icon={ShoppingBag} size={20} />
      <Tile x={13} y={113} w={88} h={15} /><Lines x={28} y={120} widths={[56]} />
    </Phone>
    <Panel x={176} y={45} w={111} h={101} chrome={false}>
      <Mark x={12} y={12} icon={ShoppingCart} size={22} />
      <Checklist x={14} y={45} widths={[57, 48]} gap={18} />
      <Progress x={14} y={87} w={81} tone="mint" />
    </Panel>
    <Badge x={262} y={123} icon={CreditCard} size={41} tone="peach" />
  </>,
  'Custom Web & Hybrid Mobile Apps': <>
    <Panel x={22} y={25} w={213} h={127}>
      <Tile x={12} y={33} w={177} h={37} tone="violet" /><Mark x={22} y={42} icon={Image} />
      <Lines x={54} y={47} widths={[102, 67]} />
      <Tile x={12} y={85} w={80} h={29} tone="mint" /><Tile x={103} y={85} w={85} h={29} />
    </Panel>
    <Phone x={217} y={45} w={71} h={120}>
      <Tile x={11} y={26} w={49} h={34} tone="violet" /><Mark x={27} y={35} icon={Image} size={16} />
      <Tile x={11} y={67} w={49} h={18} tone="mint" /><Progress x={13} y={94} w={45} />
    </Phone>
  </>,
  'Mobile App UI/UX Design': <>
    <Panel x={24} y={22} w={269} h={137}>
      <Tile x={10} y={31} w={34} h={95} tone="violet" />
      <Mark x={19} y={43} icon={PenLine} size={16} /><Mark x={19} y={72} icon={Layers} size={16} />
      {[0, 1, 2].map(i => <g key={i}>
        <rect x={55 + i * 62} y={35 + i % 2 * 9} width="49" height="77" rx="7" className="art-screen" />
        <Tile x={61 + i * 62} y={45 + i % 2 * 9} w={37} h={23} tone={i === 1 ? 'mint' : 'accent'} />
        <Lines x={63 + i * 62} y={81 + i % 2 * 9} widths={[28, 22]} />
      </g>)}
      <Route d="M102 79h17m47 1h16" pulse />
    </Panel>
    <Badge x={253} y={127} icon={Play} tone="violet" size={38} />
  </>,
  'API & Third-Party Integrations': <>
    <Route d="M153 91h-36V37H61m56 54v51H62m91-51h55V36h49m-49 55v48h55" pulse />
    <Phone x={126} y={23} w={69} h={137}>
      <Mark x={19} y={47} icon={Code2} size={31} />
      <Lines x={15} y={93} widths={[34, 27]} />
    </Phone>
    <Badge x={29} y={18} icon={Database} size={44} />
    <Badge x={28} y={116} icon={CreditCard} tone="peach" size={44} />
    <Badge x={242} y={17} icon={Mail} tone="violet" size={43} />
    <Badge x={247} y={116} icon={Plug} tone="mint" size={44} />
  </>,
  'Mobile App Maintenance & Support': <>
    <Panel x={19} y={22} w={237} h={137}>
      <Mark x={13} y={33} icon={Activity} /><Lines x={39} y={41} widths={[60]} />
      <Trend x={13} y={59} w={112} h={52} values={[0.31, 0.38, 0.74, 0.47, 0.64, 0.88]} />
      <Checklist x={139} y={37} widths={[57, 63, 44]} gap={22} />
      <Progress x={139} y={112} w={76} tone="mint" />
    </Panel>
    <Badge x={238} y={30} icon={Bug} tone="peach" size={45} />
    <Badge x={244} y={114} icon={Bell} size={42} pulse />
  </>,
};
