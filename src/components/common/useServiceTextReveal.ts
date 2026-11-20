import { createContext, useLayoutEffect, type RefObject } from 'react';
import { useReducedMotion } from 'motion/react';
import './serviceTextReveal.css';

export const ServiceTextRevealContext = createContext(false);

const selector = 'h1, h2, h3, h4, p, li';
const excluded = 'nav, button, [role="tablist"], [aria-hidden="true"], .sr-only, [data-animate-words], [data-animate-words] *';
const listContent = 'h1, h2, h3, h4, p, ul, ol, a, button';

export function useServiceTextReveal(ref: RefObject<HTMLElement | null>, enabled: boolean) {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !enabled || reducedMotion || !window.IntersectionObserver) return;

    const observed = new Set<HTMLElement>();
    const played = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (!entry.isIntersecting || !observed.has(element) || played.has(element)) continue;
        observer.unobserve(element);
        played.add(element);
        element.dataset.serviceReveal = element.matches('h1, h2') ? 'heading' : element.matches('h3, h4') ? 'subheading' : 'copy';
      }
    }, { rootMargin: '0px 0px 24px 0px', threshold: 0 });

    function register(element: HTMLElement) {
      if (observed.has(element) || played.has(element) || element.closest(excluded)) return;
      if (!element.textContent?.trim() || (element.matches('li') && element.querySelector(listContent))) return;

      const siblings = Array.from(element.parentElement?.children ?? []);
      const previous = siblings.slice(0, siblings.indexOf(element)).filter((sibling) => sibling.matches(selector));
      const step = element.matches('p') && previous.some((sibling) => sibling.matches('h1, h2')) ? 85 : 45;
      const card = element.closest('article, li');
      const cardSiblings = Array.from(card?.parentElement?.children ?? []).filter((sibling) => sibling.tagName === card?.tagName);
      const cardDelay = card && card !== element ? Math.max(0, cardSiblings.indexOf(card)) * 35 : 0;
      element.style.setProperty('--service-reveal-delay', `${Math.min(previous.length * step + cardDelay, 180)}ms`);
      observed.add(element);
      observer.observe(element);
    }

    function registerWithin(node: Element) {
      if (node instanceof HTMLElement && node.matches(selector)) register(node);
      node.querySelectorAll<HTMLElement>(selector).forEach(register);
    }

    function clear(element: HTMLElement) {
      delete element.dataset.serviceReveal;
      element.style.removeProperty('--service-reveal-delay');
    }

    registerWithin(root);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) registerWithin(node);
        }
      }
      for (const element of observed) {
        if (root.contains(element)) continue;
        observer.unobserve(element);
        observed.delete(element);
        clear(element);
      }
    });
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      observed.forEach(clear);
    };
  }, [ref, enabled, reducedMotion]);
}
