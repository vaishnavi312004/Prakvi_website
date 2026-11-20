import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { companyData } from '../data/companyData';

const linkClass = 'font-semibold text-accent-text underline underline-offset-2';

function NoticePage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <PageTransition>
      <article className="mx-auto max-w-3xl space-y-5 px-5 pt-32 pb-48 text-base leading-relaxed text-foreground">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {children}
      </article>
    </PageTransition>
  );
}

export function CookieNoticePage() {
  return (
    <NoticePage title="Cookie Notice">
      <p>Prakvi uses browser storage to remember your settings.</p>
      <dl className="space-y-4">
        <div>
          <dt className="font-bold">Strictly necessary</dt>
          <dd>Local storage keeps your consent choices in this browser until you clear the site’s data. Session storage keeps the recruitment alert from reopening in the same tab.</dd>
        </div>
        <div>
          <dt className="font-bold">Appearance</dt>
          <dd>Accept All lets local storage remember your site theme. Saving with both optional switches off removes the saved theme. Other individual selections keep your existing theme storage preference.</dd>
        </div>
        <div>
          <dt className="font-bold">Analytics and marketing</dt>
          <dd>The settings panel lets you choose these categories individually. The site currently has no analytics or marketing trackers configured.</dd>
        </div>
      </dl>
      <p>Cookie Preferences opens automatically when there is no saved choice for this site in your browser. You can reopen it from the cookie icon or Cookie Preferences in the footer.</p>
      <Link to="/privacy-statement" className={linkClass}>Privacy Statement</Link>
    </NoticePage>
  );
}

export function PrivacyStatementPage() {
  return (
    <NoticePage title="Privacy Statement">
      <p>This statement covers browser storage and direct contact with Prakvi Techno Solutions Private Limited through this website.</p>
      <p>For details about stored preferences and how to update them, see the <Link to="/cookie-notice" className={linkClass}>Cookie Notice</Link>.</p>
      <p>If you email Prakvi, you share your email address and any details you include in your message. For questions about privacy or your information, email <a className={linkClass} href={`mailto:${companyData.contact.primaryEmail}`}>{companyData.contact.primaryEmail}</a>.</p>
    </NoticePage>
  );
}
