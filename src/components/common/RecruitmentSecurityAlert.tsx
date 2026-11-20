import { useEffect, useRef } from 'react';
import { CircleAlert, ShieldAlert, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyData } from '../../data/companyData';
import './RecruitmentSecurityAlert.css';

const storageKey = 'prakvi:recruitment-alert-seen';
let shownInThisPage = false;

const warningSigns = [
  'Requests for application or onboarding fees',
  'Emails from unfamiliar or lookalike domains',
  'Pressure to accept before you can verify the offer',
];

export function RecruitmentSecurityAlert({ canAutoOpen }: { canAutoOpen: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function openAlert() {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }

  useEffect(() => {
    if (!canAutoOpen || shownInThisPage) return;
    shownInThisPage = true;
    try {
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, 'true');
    } catch {
      // The in-memory flag covers visits where browser storage is unavailable.
    }
    openAlert();
  }, [canAutoOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openAlert}
        aria-haspopup="dialog"
        aria-controls="recruitment-security-alert"
        className="recruitment-alert-tab"
      >
        <span className="recruitment-alert-tab-icon">
          <ShieldAlert size={16} aria-hidden="true" />
        </span>
        <span className="recruitment-alert-tab-label">Security Alert</span>
      </button>

      <dialog
        ref={dialogRef}
        id="recruitment-security-alert"
        aria-labelledby="recruitment-security-title"
        aria-describedby="recruitment-security-description"
        onClose={() => triggerRef.current?.focus({ preventScroll: true })}
        data-lenis-prevent
        className="recruitment-alert m-auto w-[calc(100%-2rem)] max-w-[27rem] overflow-y-auto overscroll-contain rounded-2xl border border-sky-100 bg-white p-0 text-slate-900 shadow-2xl"
      >
        <header className="border-b border-sky-100 bg-sky-50 px-4 py-3 sm:px-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <img
              src="/img/prakvi-logo.png"
              alt="Prakvi Techno Solutions Private Limited"
              width="630"
              height="143"
              className="h-auto w-36"
            />
            <button
              type="button"
              aria-label="Close security alert"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="grid size-11 shrink-0 place-items-center rounded-full text-slate-700 transition-colors hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-sky-700"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <h2 id="recruitment-security-title" className="flex items-center gap-2.5 text-base leading-snug font-bold sm:text-lg">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-800">
              <ShieldAlert size={18} aria-hidden="true" />
            </span>
            Beware of recruitment scams
          </h2>
        </header>

        <div className="space-y-3 px-4 py-4 sm:px-5">
          <p id="recruitment-security-description" className="text-sm leading-normal text-slate-700">
            Verify unexpected job offers with Prakvi before sending money or sharing personal information.
          </p>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <CircleAlert size={18} aria-hidden="true" />
              Warning signs
            </h3>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[0.8125rem] leading-normal text-slate-800">
              {warningSigns.map((sign) => <li key={sign}>{sign}</li>)}
            </ul>
          </section>

          <section className="rounded-xl border border-sky-100 bg-sky-50 p-3">
            <h3 className="text-sm font-bold text-slate-900">Verify or report a job offer</h3>
            <p className="mt-1 text-[0.8125rem] leading-normal text-slate-700">
              Use the <Link to="/contact" onClick={() => dialogRef.current?.close()} className="font-semibold text-sky-800 underline underline-offset-2">Prakvi contact page</Link> or
              email <a href={`mailto:${companyData.contact.primaryEmail}`} className="font-semibold text-sky-800 underline underline-offset-2">{companyData.contact.primaryEmail}</a>.
            </p>
          </section>
        </div>
      </dialog>
    </>
  );
}
