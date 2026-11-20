import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const imageRoot = '/img/about-collage';
const practices = [
  {
    title: 'Software Engineering',
    front: 'engineering-team',
    frontAlt: 'Software development team collaborating in a modern office',
    back: 'engineering-code',
    backAlt: 'Software engineering workstation with code on a laptop',
  },
  {
    title: 'AI & Data Analytics',
    front: 'analytics-dashboard',
    frontAlt: 'Business analytics dashboard on a professional workstation',
    back: 'analytics-team',
    backAlt: 'Professionals reviewing business data together',
  },
  {
    title: 'Cloud & Infrastructure',
    front: 'cloud-datacenter',
    frontAlt: 'Enterprise data center with rows of server racks',
    back: 'cloud-team',
    backAlt: 'Technology team collaborating around laptops and enterprise systems',
  },
];

function PracticePhotoCard({ practice, index }: { practice: typeof practices[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(cardRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let timer: ReturnType<typeof setTimeout>;
    const flip = () => {
      setFlipped((value) => !value);
      timer = setTimeout(flip, 2400);
    };
    timer = setTimeout(flip, 650 + index * 200);
    return () => clearTimeout(timer);
  }, [inView, reducedMotion, index]);

  return (
    <button
      ref={cardRef}
      type="button"
      className="about-photo-card"
      aria-label={`${practice.title}: ${flipped ? 'show original photograph' : 'show alternative photograph'}`}
      aria-pressed={flipped}
      onClick={() => setFlipped((value) => !value)}
    >
      <span className="about-photo-card__rotor" data-flipped={flipped}>
        {(['front', 'back'] as const).map((side) => (
          <span
            key={side}
            className={`about-photo-card__face about-photo-card__face--${side}`}
            aria-hidden={side === 'front' ? flipped : !flipped}
          >
            <img
              src={`${imageRoot}/${practice[side]}.jpg`}
              alt={practice[`${side}Alt`]}
              width={600}
              height={450}
              loading="lazy"
              decoding="async"
            />
          </span>
        ))}
      </span>
      <span className="about-photo-card__shade" aria-hidden="true" />
      <span className="about-photo-card__label">{practice.title}</span>
    </button>
  );
}

export function AboutImageCollage() {
  return (
    <div className="about-photo-collage">
      <div className="about-photo-collage__main">
        <img
          src={`${imageRoot}/collaboration.jpg`}
          alt="Diverse professionals collaborating around a table in a bright modern office"
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="about-photo-collage__practices" role="group" aria-label="Explore our practices. Photographs flip automatically; select a photograph to flip it manually.">
        {practices.map((practice, index) => <PracticePhotoCard key={practice.title} practice={practice} index={index} />)}
      </div>
    </div>
  );
}
