import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from 'motion/react';

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps {
  texts: string[];
  effect?: 'slide' | 'fade';
  direction?: 'up' | 'down';
  highlight?: boolean;
  highlightColor?: string;
  transition?: Transition;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number;
  loop?: boolean;
  auto?: boolean;
  pauseOnHover?: boolean;
  splitBy?: 'characters' | 'words' | 'lines' | string;
  blur?: number;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

function splitIntoCharacters(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      effect = 'slide',
      direction = 'up',
      highlight = false,
      highlightColor = '#079CEB',
      transition = { type: 'spring', damping: 24, stiffness: 320 },
      rotationInterval = 2400,
      staggerDuration = 0.025,
      staggerFrom = 'last',
      loop = true,
      auto = true,
      pauseOnHover = false,
      splitBy = 'characters',
      blur = 0,
      onNext,
      mainClassName = '',
      splitLevelClassName = '',
      elementLevelClassName = '',
    },
    ref,
  ) => {
    const reducedMotion = useReducedMotion();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex] || '';
      if (splitBy === 'characters') {
        const words = currentText.split(' ');
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === 'words') {
        return currentText.split(' ').map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === 'lines') {
        return currentText.split('\n').map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }
      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number) => {
        if (staggerFrom === 'first') return index * staggerDuration;
        if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration;
        if (staggerFrom === 'center') {
          const center = Math.floor(totalChars / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === 'random') {
          const pseudoRandom = ((index * 7 + 3) % Math.max(1, totalChars));
          return pseudoRandom * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration],
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext],
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange],
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto || isPaused || reducedMotion || texts.length <= 1) return;
      const intervalId = window.setInterval(next, rotationInterval);
      return () => window.clearInterval(intervalId);
    }, [auto, isPaused, reducedMotion, texts.length, next, rotationInterval]);

    const enterY = effect === 'slide' ? (direction === 'up' ? '100%' : '-100%') : 0;
    const exitY = effect === 'slide' ? (direction === 'up' ? '-120%' : '120%') : 0;

    if (reducedMotion) {
      return (
        <span
          className={`inline-flex flex-wrap whitespace-pre-wrap relative ${mainClassName}`}
          style={highlight ? { color: highlightColor } : undefined}
        >
          {texts[0]}
        </span>
      );
    }

    return (
      <motion.span
        className={`inline-grid max-w-full whitespace-pre-wrap relative align-baseline ${mainClassName}`}
        style={highlight ? { color: highlightColor } : undefined}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        transition={transition}
      >
        {/* Keep every phrase in the same grid cell so the largest wrapped
            phrase reserves space throughout the exit/enter animation. */}
        {texts.map((text, index) => (
          <span
            key={`measure-${index}`}
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 inline-flex flex-wrap pointer-events-none"
          >
            {text.split(' ').map((word, wordIndex, words) => (
              <span key={wordIndex} className={`inline-flex ${splitLevelClassName}`}>
                {word}
                {wordIndex < words.length - 1 && <span className="whitespace-pre"> </span>}
              </span>
            ))}
          </span>
        ))}
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentTextIndex}
            className={
              splitBy === 'lines'
                ? 'col-start-1 row-start-1 flex flex-col w-full'
                : 'col-start-1 row-start-1 inline-flex flex-wrap whitespace-pre-wrap relative'
            }
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0);
              const totalChars = array.reduce(
                (sum, word) => sum + word.characters.length,
                0,
              );

              return (
                <span
                  key={wordIndex}
                  className={`inline-flex ${splitLevelClassName}`}
                >
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{
                        y: enterY,
                        opacity: 0,
                        filter: blur > 0 ? `blur(${blur}px)` : undefined,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        filter: blur > 0 ? 'blur(0px)' : undefined,
                      }}
                      exit={{
                        y: exitY,
                        opacity: 0,
                        filter: blur > 0 ? `blur(${blur}px)` : undefined,
                      }}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          totalChars,
                        ),
                      }}
                      className={`inline-block ${elementLevelClassName}`}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  },
);

RotatingText.displayName = 'RotatingText';
export default RotatingText;
