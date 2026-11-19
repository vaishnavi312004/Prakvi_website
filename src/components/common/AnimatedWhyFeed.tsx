import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

const items = [
  { title: 'Certified IT Professionals', subtitle: 'Qualified engineers on every project' },
  { title: 'Proven Track Record', subtitle: 'Delivered for clients across industries' },
  { title: '24/7 Monitoring & Support', subtitle: 'We watch your systems around the clock' },
  { title: 'Scalable Solutions', subtitle: 'Built to grow with your business' },
  { title: 'Cost-Effective Services', subtitle: 'Maximum value, transparent pricing' },
  { title: 'Industry Best Practices', subtitle: 'Secure, compliant, well-documented' },
];

const STEP = 700;
const HOLD = 3500;
const LOOP_DELAY = 600;

export const AnimatedWhyFeed: React.FC<{ loop?: boolean }> = ({ loop = true }) => {
  const feedRef = useRef<HTMLUListElement>(null);
  const reducedMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(reducedMotion ? items.length : 0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(items.length);
      setFadingOut(false);
      return;
    }

    const feed = feedRef.current;
    if (!feed) return;
    if (typeof IntersectionObserver === 'undefined') {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setHasStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(feed);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !hasStarted) return;

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };

    const play = () => {
      setVisibleCount(0);
      setFadingOut(false);
      items.forEach((_, index) => {
        later(() => setVisibleCount(index + 1), 300 + index * STEP);
      });

      if (loop) {
        later(() => {
          setFadingOut(true);
          later(play, LOOP_DELAY);
        }, 300 + items.length * STEP + HOLD);
      }
    };

    play();
    return () => timers.forEach(clearTimeout);
  }, [hasStarted, loop, reducedMotion]);

  return (
    <ul ref={feedRef} className="pk-feed" aria-label="Why choose Prakvi">
      {items.map((item, index) => {
        const visible = reducedMotion || index < visibleCount;
        const className = [
          'pk-row',
          visible ? 'in' : '',
          fadingOut && visible ? 'out' : '',
        ].filter(Boolean).join(' ');

        return (
          <li className={className} key={item.title}>
            <div className="pk-slot">
              <div className="pk-card">
                <span className="pk-ico" aria-hidden="true">
                  <Check />
                </span>
                <span className="pk-txt">
                  <span className="pk-title">{item.title}</span>
                  <span className="pk-sub">{item.subtitle}</span>
                </span>
                <span className="pk-dot" aria-hidden="true" />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
