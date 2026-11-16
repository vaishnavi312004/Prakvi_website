import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { PrakviLogo } from '../common/PrakviLogo';
import { companyData } from '../../data/companyData';

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: companyData.socialLinks.facebook },
  { label: 'Twitter', icon: Twitter, href: companyData.socialLinks.twitter },
  { label: 'LinkedIn', icon: Linkedin, href: companyData.socialLinks.linkedin },
  { label: 'Instagram', icon: Instagram, href: companyData.socialLinks.instagram },
];

export const Footer: React.FC = () => (
  <footer
    className="border-t border-line bg-surface/70 backdrop-blur-xl text-foreground"
    role="contentinfo"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-12">
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <PrakviLogo size="sm" />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            {companyData.tagline}
          </p>
          <div className="flex items-center gap-2.5 pt-1">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Prakvi on ${label}`}
                className="clay-icon-box inline-flex h-9 w-9 items-center justify-center rounded-xl text-accent hover:scale-105 transition-transform"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer company links" className="md:col-span-2">
          <h2 className="mb-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground">
            Company
          </h2>
          <ul className="space-y-2.5 text-sm text-muted">
            <li><Link to="/about" className="transition-colors hover:text-accent">About Us</Link></li>
            <li><Link to="/services" className="transition-colors hover:text-accent">Services</Link></li>
            <li><Link to="/products" className="transition-colors hover:text-accent">Products</Link></li>
            <li><Link to="/careers" className="transition-colors hover:text-accent">Careers</Link></li>
            <li><Link to="/insights" className="transition-colors hover:text-accent">Insights</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-accent">Contact</Link></li>
          </ul>
        </nav>

        {/* Key Practices & Support */}
        <nav aria-label="Footer solutions and support links" className="md:col-span-3">
          <h2 className="mb-3.5 font-display text-sm font-bold uppercase tracking-wider text-foreground">
            Solutions & Support
          </h2>
          <ul className="space-y-2.5 text-sm text-muted">
            <li><Link to="/services/staffing" className="transition-colors hover:text-accent">Staffing Services</Link></li>
            <li><Link to="/services/cloud-services" className="transition-colors hover:text-accent">Cloud Services</Link></li>
            <li><Link to="/services/business-intelligence" className="transition-colors hover:text-accent">Business Intelligence</Link></li>
            <li><Link to="/products/hr-management-system" className="transition-colors hover:text-accent">HR Management System</Link></li>
            <li><a href={`mailto:${companyData.contact.primaryEmail}`} className="transition-colors hover:text-accent">Contact Support</a></li>
            <li><a href={`mailto:${companyData.contact.primaryEmail}?subject=Privacy%20inquiry`} className="transition-colors hover:text-accent">Privacy Inquiries</a></li>
          </ul>
        </nav>

        {/* Verified Offices */}
        <div className="md:col-span-3 space-y-3.5">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            Offices
          </h2>
          <div className="space-y-3 text-xs text-muted leading-relaxed">
            {companyData.offices.map((office) => (
              <div key={office.id} className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <span className="font-semibold text-foreground">{office.name}: </span>
                  <span>{office.address.join(', ')}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <Phone className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`tel:${companyData.contact.phone}`} className="font-semibold text-foreground hover:text-accent">
                {companyData.contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${companyData.contact.primaryEmail}`} className="font-semibold text-foreground hover:text-accent">
                {companyData.contact.primaryEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-line py-5 text-center text-xs leading-relaxed text-muted sm:flex sm:items-center sm:justify-between sm:text-left">
        <p className="text-muted">
          &copy; 2026 Prakvi Techno Solutions Private Limited. All rights reserved.
        </p>
        <p className="mt-1 sm:mt-0 text-muted">
          Developed and Maintained by <span className="font-semibold text-foreground">Ampcustech Pvt. Ltd.</span>
        </p>
      </div>
    </div>
  </footer>
);
