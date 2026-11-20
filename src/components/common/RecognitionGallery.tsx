import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, animate, motion, useInView, useIsPresent, useMotionValue } from 'motion/react';
import { ArrowLeft, ArrowRight, Pause, Play, type LucideIcon } from 'lucide-react';
import { ScrollRevealText } from './ScrollRevealText';
import './RecognitionGallery.css';

type Achievement = { id: string; title: string; description: string; Icon: LucideIcon };

const slots = ['featured', 'first', 'second', 'third', 'fourth', 'fifth'];
const ease = [0.22, 1, 0.36, 1] as const;
const cycleSeconds = 4;
const entranceViewport = { once: true, amount: 0.17 } as const;
const motionQuery = '(prefers-reduced-motion: reduce)';

function subscribeMotion(update: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', update);
  return () => media.removeEventListener('change', update);
}

function AchievementArtwork({ name, featured }: { name: string; featured: boolean }) {
  const artwork = `${import.meta.env.BASE_URL}assets/recognition/${name}.webp`;

  return (
    <div className="recognition-art" aria-hidden="true" style={{ '--recognition-artwork': `url("${artwork}")` } as React.CSSProperties}>
      <div className="recognition-art-object">
        <img src={artwork} alt="" width={640} height={name === 'five-star-client-rating' ? 214 : 640}
          loading={featured ? 'eager' : 'lazy'} decoding="async" />
        <span className="recognition-art-reflection" />
      </div>
    </div>
  );
}

function AchievementContent({ item, featured, reduced }: { item: Achievement; featured: boolean; reduced: boolean }) {
  const present = useIsPresent();

  return (
    <motion.div className="recognition-tile-content" data-achievement={item.id}
      aria-hidden={!present} inert={!present}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 11 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -8 }}
      transition={{ duration: reduced ? 0 : 0.49, ease }}>
      <AchievementArtwork name={item.id} featured={featured} />
      <div className="recognition-tile-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </motion.div>
  );
}

export function RecognitionGallery({ title, description, items }: { title: string; description: string; items: Achievement[] }) {
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => false);
  const gallery = useRef<HTMLDivElement>(null);
  const tileButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(gallery, { amount: 0.12 });
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState('');
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const progress = useMotionValue(0);
  const order = items.map((_, index) => (active + index) % items.length);
  const moving = inView && pageVisible && !reduced;
  const autoplay = moving && playing && !hovered && items.length > 1;
  const wrap = (index: number) => (index + items.length) % items.length;

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = animate(progress, 1, {
      duration: cycleSeconds * (1 - progress.get()), ease: 'linear',
      onComplete: () => {
        progress.set(0);
        setAnnouncement('');
        setActive(current => (current + 1) % items.length);
      },
    });
    return () => timer.stop();
  }, [active, autoplay, items.length, progress]);

  const select = (index: number) => {
    if (index === active) return;
    progress.stop();
    progress.set(0);
    setAnnouncement(items[index].title);
    setActive(index);
  };

  return (
    <section id="recognition" className="about-section recognition-showcase" aria-label={title}>
      <AnimatePresence>
        <div className="about-inner">
          <div className="recognition-heading">
            <motion.div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-text"
              initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={entranceViewport} transition={{ duration: reduced ? 0 : 0.62, ease }}>Milestones</motion.div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-foreground text-balance"><ScrollRevealText text={title} /></h2>
            <motion.p className="mt-4 text-base sm:text-lg leading-relaxed text-muted" initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }} viewport={entranceViewport}
              transition={{ duration: reduced ? 0 : 0.62, delay: reduced ? 0 : 0.14, ease }}>{description}</motion.p>
          </div>
          <div className="recognition-navigation" role="group" aria-label="Featured achievement controls">
            <button className="recognition-nav-button" type="button" aria-label="Previous achievement"
              onClick={() => select(wrap(active - 1))}><ArrowLeft aria-hidden="true" /></button>
            <div className="recognition-gallery-status" role="group" aria-label="Choose a featured achievement">
              {items.map(({ id, title: name, Icon }, index) => (
                <button key={id} className="recognition-progress-segment" type="button" aria-label={name}
                  aria-pressed={index === active} onClick={() => select(index)}>
                  <Icon aria-hidden="true" />
                  <span className="recognition-progress-rail" aria-hidden="true">
                    {index === active && <motion.i style={{ scaleX: reduced ? 1 : progress }} />}
                  </span>
                </button>
              ))}
            </div>
            <button className="recognition-nav-button" type="button" aria-label="Next achievement"
              onClick={() => select(wrap(active + 1))}><ArrowRight aria-hidden="true" /></button>
            {!reduced && <button className="recognition-nav-button" type="button"
              aria-label={playing ? 'Pause achievement autoplay' : 'Resume achievement autoplay'}
              onClick={() => setPlaying(current => !current)}>
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>}
            <span role="status" className="sr-only">{announcement}</span>
          </div>
          <div ref={gallery} className="recognition-gallery" data-moving={moving}
            onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(true); }}
            onPointerLeave={() => setHovered(false)}>
            {order.map((index, slot) => {
              const item = items[index];
              const featured = slot === 0;
              return (
                <motion.article key={item.id} className="recognition-tile" layout
                  data-slot={slots[slot]} data-featured={featured} data-achievement={item.id}
                  style={{ gridArea: slots[slot] }}
                  initial={reduced ? false : { opacity: 0, y: 13 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={entranceViewport}
                  transition={{
                    layout: reduced ? { duration: 0 } : { type: 'spring', stiffness: 190, damping: 26, mass: 0.88 },
                    opacity: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : Math.min(slot, 3) * 0.05, ease },
                    y: { duration: reduced ? 0 : 0.55, delay: reduced ? 0 : Math.min(slot, 3) * 0.05, ease },
                  }}>
                  <div className="recognition-tile-surface">
                    <AnimatePresence initial={false}>
                      <AchievementContent key={item.id} item={item} featured={featured} reduced={reduced} />
                    </AnimatePresence>
                    <button ref={node => { tileButtons.current[index] = node; }} type="button" className="recognition-tile-select"
                      aria-label={item.title} aria-description={item.description} aria-pressed={featured} tabIndex={featured ? 0 : -1}
                      onClick={() => select(index)}
                      onKeyDown={event => {
                        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                        const next = { ArrowLeft: wrap(index - 1), ArrowUp: wrap(index - 1), ArrowRight: wrap(index + 1), ArrowDown: wrap(index + 1), Home: 0, End: items.length - 1 }[event.key];
                        if (next === undefined) return;
                        event.preventDefault();
                        select(next);
                        tileButtons.current[next]?.focus({ preventScroll: true });
                      }} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </AnimatePresence>
    </section>
  );
}

