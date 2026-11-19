import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { PrakviLogo } from '../common/PrakviLogo';
import { companyData } from '../../data/companyData';

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: companyData.socialLinks.facebook },
  { label: 'Twitter', icon: Twitter, href: companyData.socialLinks.twitter },
  { label: 'LinkedIn', icon: Linkedin, href: companyData.socialLinks.linkedin },
  { label: 'Instagram', icon: Instagram, href: companyData.socialLinks.instagram },
];

const companyLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

const supportEmail = `mailto:${companyData.contact.primaryEmail}`;
const legalLinks = [
  { label: 'Privacy Policy', href: `${supportEmail}?subject=Privacy%20Policy%20request` },
  { label: 'Terms of Service', href: `${supportEmail}?subject=Terms%20of%20Service%20request` },
];
const footerLink = 'transition-colors hover:text-white focus-visible:text-white';

export const Footer: React.FC = () => (
  <footer className="bg-[#2a3444] px-4 text-[#b2c4da] sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-6xl gap-8 pt-10 pb-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-3">
      <div>
        <PrakviLogo className="brightness-0 invert" />
        <p className="mt-2 max-w-sm leading-relaxed">{companyData.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {socialLinks.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Prakvi on ${label}`}
              className="inline-flex size-10 items-center justify-center rounded-xl bg-[#475365] transition-colors hover:bg-[#58677b] hover:text-white focus-visible:text-white"
            >
              <Icon className="size-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <nav aria-label="Footer company links">
        <h2 className="mb-1 text-lg font-bold text-white">Company</h2>
        <ul className="space-y-2">
          {companyLinks.map(({ label, path }) => (
            <li key={path}><Link to={path} className={footerLink}>{label}</Link></li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Footer support links">
        <h2 className="mb-1 text-lg font-bold text-white">Support</h2>
        <ul className="space-y-2">
          <li><Link to="/contact" className={footerLink}>Help Center</Link></li>
          <li><a href={supportEmail} className={footerLink}>Contact Support</a></li>
          <li><a href={legalLinks[0].href} className={footerLink} aria-label="Request the Privacy Policy by email">Privacy Policy</a></li>
        </ul>
      </nav>
    </div>

    <div className="border-t border-white/15 pt-7 pb-4 text-center text-sm leading-relaxed sm:text-base">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span>&copy; 2026 Ampcus tech. All rights reserved.</span>
        {legalLinks.map(({ label, href }) => (
          <a key={label} href={href} aria-label={`Request the ${label} by email`} className={`border-l border-current pl-2 ${footerLink}`}>
            {label}
          </a>
        ))}
      </div>
      <p className="mt-0.5">
        Developed and Maintained by <span className="font-semibold text-white underline">Ampcustech Pvt. Ltd.</span>
      </p>
    </div>
  </footer>
);
