import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import './AccordionGallery.css';

export interface AccordionGalleryItem {
  image: string;
  label: string;
  alt: string;
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
  duration?: number;
  grayscale?: boolean;
}

interface GalleryStyle extends React.CSSProperties {
  '--gallery-gap': string;
  '--gallery-radius': string;
}

export const AccordionGallery: React.FC<AccordionGalleryProps> = ({
  items,
  defaultIndex = 2,
  expandRatio = 0.52,
  duration = 0.6,
  grayscale = false,
}) => {
  const reducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(() =>
    Math.max(0, Math.min(defaultIndex, items.length - 1)),
  );

  if (items.length === 0) return null;

  const activeIndex = Math.min(selectedIndex, items.length - 1);
  const ratio = Math.min(Math.max(expandRatio, 0.25), 0.75);
  const expandedFlex = (ratio * (items.length - 1)) / (1 - ratio);
  const galleryStyle: GalleryStyle = {
    '--gallery-gap': '10px',
    '--gallery-radius': '16px',
  };
  const transition = {
    duration: reducedMotion ? 0 : duration,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div
      className="prakvi-accordion-gallery"
      role="group"
      aria-label="Prakvi capabilities photo gallery"
      style={galleryStyle}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={item.image}
            type="button"
            className={`prakvi-accordion-gallery__panel ${isActive ? 'is-active' : ''}`}
            style={{ flexBasis: 0 }}
            animate={{ flexGrow: isActive ? expandedFlex : 1 }}
            transition={transition}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setSelectedIndex(index);
            }}
            onPointerMove={(event) => {
              if (reducedMotion || event.pointerType !== 'mouse') return;
              const bounds = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
              const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
              event.currentTarget.style.setProperty('--parallax-x', `${x}px`);
              event.currentTarget.style.setProperty('--parallax-y', `${y}px`);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty('--parallax-x', '0px');
              event.currentTarget.style.setProperty('--parallax-y', '0px');
            }}
            onFocus={() => setSelectedIndex(index)}
            onClick={() => setSelectedIndex(index)}
            aria-label={item.label}
            aria-pressed={isActive}
            data-grayscale={grayscale}
          >
            <img
              className="prakvi-accordion-gallery__image"
              src={item.image}
              alt={item.alt}
              loading={index === activeIndex ? 'eager' : 'lazy'}
              decoding="async"
            />
            <span className="prakvi-accordion-gallery__overlay" aria-hidden="true" />
            <span className="prakvi-accordion-gallery__label">{item.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
