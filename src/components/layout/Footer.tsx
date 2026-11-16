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

export const Footer: React.FC = () => (
  <footer className="compact-footer bg-[#2D3748] text-white" role="contentinfo">
    <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-x-8 gap-y-7 py-8 sm:grid-cols-[1.5fr_1fr_1fr] sm:gap-12 sm:py-9">
        <div className="col-span-2 sm:col-span-1">
          <PrakviLogo size="sm" className="[&_img]:brightness-0 [&_img]:invert" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#BAC6D7]">Leading provider of innovative IT solutions for modern businesses.</p>
          <div className="mt-4 flex items-center gap-2.5">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Prakvi on ${label}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[#BAC6D7] transition-colors hover:bg-white/20 hover:text-white">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Footer company links">
          <h2 className="mb-3 text-base font-bold text-white">Company</h2>
          <ul className="space-y-2 text-sm text-[#BAC6D7]">
            <li><Link to="/about" className="transition-colors hover:text-white">About Us</Link></li>
            <li><Link to="/services" className="transition-colors hover:text-white">Services</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-white">Contact</Link></li>
          </ul>
        </nav>
        <nav aria-label="Footer support links">
          <h2 className="mb-3 text-base font-bold text-white">Support</h2>
          <ul className="space-y-2 text-sm text-[#BAC6D7]">
            <li><Link to="/contact" className="transition-colors hover:text-white">Help Center</Link></li>
            <li><a href={`mailto:${companyData.contact.primaryEmail}`} className="transition-colors hover:text-white">Contact Support</a></li>
            <li><a href={`mailto:${companyData.contact.primaryEmail}?subject=Privacy%20inquiry`} className="transition-colors hover:text-white">Privacy Inquiries</a></li>
          </ul>
        </nav>
      </div>
      <div className="relative border-t border-white/15 py-4 text-center text-xs leading-relaxed text-[#BAC6D7] sm:px-10">
        <p className="text-inherit">&copy; 2026 Prakvi Techno Solutions Private Limited. All rights reserved.</p>
        <p className="mt-1 text-inherit">Developed and Maintained by <span className="text-white">Ampcustech Pvt. Ltd.</span></p>
      </div>
    </div>
  </footer>
);
