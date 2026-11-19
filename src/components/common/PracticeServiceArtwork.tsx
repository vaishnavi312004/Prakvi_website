import React, { useId } from 'react';
import type { LucideIcon } from 'lucide-react';

export type PracticeCardTheme = 'project' | 'mobility' | 'supply' | 'integration';

export const practiceCardTones: Record<PracticeCardTheme, readonly string[]> = {
  project: ['peach', 'sky', 'lavender', 'mint', 'gold', 'periwinkle'],
  mobility: ['cyan', 'violet', 'coral', 'sky', 'mint'],
  supply: ['peach', 'teal', 'lavender', 'sky', 'gold'],
  integration: ['cyan', 'violet', 'mint', 'sky', 'peach'],
};

const routes: Record<PracticeCardTheme, readonly string[]> = {
  project: [
    'M24 111 C82 111 88 47 151 47 S223 131 296 67',
    'M24 65 C82 65 96 130 153 130 S223 50 296 92',
    'M24 115 C82 115 108 57 155 57 S220 122 296 75',
    'M24 74 C76 74 105 129 156 129 S222 58 296 88',
    'M24 120 C83 120 92 66 155 66 S225 116 296 60',
    'M24 83 C79 83 105 48 157 48 S227 129 296 96',
  ],
  mobility: [
    'M24 92 C83 92 91 45 154 45 S222 126 296 76',
    'M24 112 C81 112 100 59 156 59 S223 119 296 67',
    'M24 70 C84 70 99 129 154 129 S222 58 296 101',
    'M24 104 C84 104 96 47 156 47 S225 125 296 79',
    'M24 78 C82 78 102 121 156 121 S224 62 296 93',
  ],
  supply: [
    'M24 110 C80 110 88 55 151 55 S225 128 296 67',
    'M24 80 C81 80 96 128 154 128 S220 53 296 92',
    'M24 117 C80 117 101 63 154 63 S225 117 296 72',
    'M24 68 C81 68 101 122 157 122 S224 57 296 98',
    'M24 105 C82 105 97 48 155 48 S224 128 296 84',
  ],
  integration: [
    'M24 91 C81 91 92 46 154 46 S224 124 296 74',
    'M24 115 C81 115 97 59 155 59 S224 123 296 69',
    'M24 72 C82 72 102 127 156 127 S223 53 296 95',
    'M24 105 C83 105 97 48 156 48 S224 120 296 81',
    'M24 80 C82 80 102 123 157 123 S224 62 296 97',
  ],
};

export function PracticeServiceArtwork({
  theme,
  index,
  icon: Icon,
  detailIcons,
  animate,
}: {
  theme: PracticeCardTheme;
  index: number;
  icon: LucideIcon;
  detailIcons: LucideIcon[];
  animate: boolean;
}) {
  const id = useId();
  const routeId = `${id}-route`;
  const route = routes[theme][index % routes[theme].length];
  const DetailOne = detailIcons[0] ?? Icon;
  const DetailTwo = detailIcons[1] ?? DetailOne;

  return (
    <div
      className="practice-service-art"
      data-practice={theme}
      data-index={index}
      data-animating={animate}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 180" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${id}-route-glow`} x1="24" y1="60" x2="296" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--practice-accent)" stopOpacity="0.22" />
            <stop offset="0.52" stopColor="var(--practice-accent)" stopOpacity="0.8" />
            <stop offset="1" stopColor="var(--practice-accent)" stopOpacity="0.28" />
          </linearGradient>
        </defs>
        <path id={routeId} className="practice-art-route-base" d={route} />
        <use href={`#${routeId}`} className="practice-art-route-flow" stroke={`url(#${id}-route-glow)`} />
        <circle className="practice-art-route-node" cx="24" cy="111" r="3" />
        <circle className="practice-art-route-node" cx="156" cy="84" r="3" />
        <circle className="practice-art-route-node" cx="296" cy="78" r="3" />
        {animate && (
          <circle className="practice-art-packet" r="4.5">
            <animateMotion dur={`${5.2 + (index % 3) * 0.65}s`} repeatCount="indefinite">
              <mpath href={`#${routeId}`} />
            </animateMotion>
          </circle>
        )}
      </svg>

      <div className="practice-art-module practice-art-module-main"><Icon /></div>
      <div className="practice-art-module practice-art-module-one"><DetailOne /></div>
      <div className="practice-art-module practice-art-module-two"><DetailTwo /></div>
      <div className="practice-art-bars"><i /><i /><i /><i /><i /></div>
      <span className="practice-art-particle practice-art-particle-one" />
      <span className="practice-art-particle practice-art-particle-two" />
      <span className="practice-art-particle practice-art-particle-three" />
    </div>
  );
}
