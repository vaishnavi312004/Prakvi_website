import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ChartNoAxesColumn, Cookie, Megaphone, ShieldCheck, X } from 'lucide-react';
import { motion, useIsPresent, useReducedMotion } from 'motion/react';
import './CookiePreferences.css';

const categories = [
  { key: 'analytics', label: 'Analytics Cookies', icon: ChartNoAxesColumn, description: 'Measure site usage and performance.' },
  { key: 'marketing', label: 'Marketing Cookies', icon: Megaphone, description: 'Personalize communications and measure campaigns.' },
] as const;

export type CookieChoice = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  appearance: boolean;
};
export const essentialOnly: CookieChoice = { necessary: true, appearance: false, analytics: false, marketing: false };
export const allowAll: CookieChoice = { necessary: true, appearance: true, analytics: true, marketing: true };

const storageKey = 'prakvi_cookie_preferences_v1';

export function readCookieChoice(): CookieChoice | null {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? 'null');
    if (saved?.necessary === true && typeof saved.appearance === 'boolean' &&
        typeof saved.analytics === 'boolean' && typeof saved.marketing === 'boolean') {
      return { necessary: true, appearance: saved.appearance, analytics: saved.analytics, marketing: saved.marketing };
    }
  } catch {
    // Older installations may still have a valid preference cookie.
  }

  try {
    const value = document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${storageKey}=`))
      ?.slice(storageKey.length + 1);
    if (value === 'essential') return essentialOnly;
    if (value === 'appearance') return { ...essentialOnly, appearance: true };
    if (value && /^[01]{3}$/.test(value)) {
      const [appearance, analytics, marketing] = value;
      return { necessary: true, appearance: appearance === '1', analytics: analytics === '1', marketing: marketing === '1' };
    }
  } catch {
    // Optional storage defaults to off when the preference cannot be read.
  }
  return null;
}

export function saveCookieChoice(choice: CookieChoice) {
  const value = JSON.stringify(choice);
  try {
    if (window.localStorage.getItem(storageKey) === value) return;
    window.localStorage.setItem(storageKey, value);
  } catch {
    return;
  }
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${storageKey}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  } catch {
    // The local choice takes precedence if the legacy cookie cannot be removed.
  }
}

interface CookieActions {
  onChoose: (choice: CookieChoice) => void;
}

export function CookieLauncher({ onOpen }: { onOpen: () => void }) {
  const reducedMotion = useReducedMotion();
  const isPresent = useIsPresent();

  return (
    <motion.div
      className="cookie-launcher"
      inert={!isPresent}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.16, ease: 'easeOut' }}
    >
      <button type="button" className="cookie-launcher-button" autoFocus onClick={onOpen} aria-label="Cookie Preferences" aria-haspopup="dialog" aria-controls="cookie-preferences">
        <Cookie size={21} aria-hidden="true" />
      </button>
      <span className="cookie-launcher-tooltip" aria-hidden="true">Cookie Preferences</span>
    </motion.div>
  );
}

interface CookiePreferencesProps extends CookieActions {
  open: boolean;
  choice: CookieChoice;
  onDismiss: () => void;
}

export function CookiePreferences({ open, choice, onChoose, onDismiss }: CookiePreferencesProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(choice);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) {
      setDraft(choice);
      dialog.showModal();
    }
    if (!open && dialog?.open) dialog.close();
  }, [open, choice]);

  function choose(nextChoice: CookieChoice) {
    dialogRef.current?.close();
    onChoose(nextChoice);
  }

  return (
    <dialog
      ref={dialogRef}
      id="cookie-preferences"
      aria-labelledby="cookie-preferences-title"
      aria-describedby="cookie-preferences-description"
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      className="cookie-preferences"
    >
      <header className="cookie-preferences-header">
        <button type="button" className="cookie-panel-icon" aria-label="Back to website" onClick={onDismiss}>
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <h2 id="cookie-preferences-title" className="text-base font-extrabold">Cookie Preferences</h2>
          <p className="text-xs text-slate-600">Customize your consent settings.</p>
        </div>
        <button type="button" className="cookie-panel-icon" aria-label="Close cookie preferences" autoFocus onClick={onDismiss}>
          <X size={17} aria-hidden="true" />
        </button>
      </header>
      <div className="cookie-preferences-body">
        <p id="cookie-preferences-description">Choose which optional cookies to allow.</p>
        <section className="cookie-category cookie-category-required">
          <div className="cookie-category-header">
            <ShieldCheck size={16} aria-hidden="true" />
            <h3>Strictly Necessary</h3>
            <span className="cookie-required-badge">Required</span>
          </div>
          <p>Always on for security and core site features.</p>
        </section>
        {categories.map(({ key, label, icon: Icon, description }) => (
          <label key={key} className="cookie-category cookie-category-optional">
            <span className="cookie-category-header">
              <Icon size={16} aria-hidden="true" />
              <span className="cookie-category-title">{label}</span>
              <span className="cookie-optional-label">Optional</span>
              <span className="cookie-switch">
                <input
                  type="checkbox"
                  role="switch"
                  aria-label={label}
                  aria-describedby={`cookie-${key}-description`}
                  checked={draft[key]}
                  onChange={(event) => {
                    const checked = event.currentTarget.checked;
                    setDraft((current) => ({ ...current, [key]: checked }));
                  }}
                />
                <span aria-hidden="true" />
              </span>
            </span>
            <span className="cookie-category-description" id={`cookie-${key}-description`}>{description}</span>
          </label>
        ))}
      </div>
      <footer className="cookie-preferences-footer">
        <button type="button" className="cookie-action cookie-save" onClick={() => choose(draft.analytics || draft.marketing ? draft : essentialOnly)}>Save Preferences</button>
        <button type="button" className="cookie-action cookie-accept" onClick={() => choose(allowAll)}>Accept All</button>
      </footer>
    </dialog>
  );
}
