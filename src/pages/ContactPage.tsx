import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageTransition } from '../components/layout/PageTransition';
import { companyData } from '../data/companyData';
import { contactData } from '../data/contactData';
import { Input } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ContactSubmission } from '../types';
import {
  CheckCircle2,
  Clock,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void }) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export const ContactPage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [searchParams] = useSearchParams();
  const [selectedOffice, setSelectedOffice] = useState<string>(() => {
    const officeParam = searchParams.get('office');
    if (officeParam && companyData.offices.some((o) => o.id === officeParam)) {
      return officeParam;
    }
    return companyData.offices[0].id;
  });

  useEffect(() => {
    const officeParam = searchParams.get('office');
    if (officeParam && companyData.offices.some((o) => o.id === officeParam)) {
      setSelectedOffice(officeParam);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState<ContactSubmission>({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    message: '',
    privacyConsent: false,
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactSubmission, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaWidgetId = useRef<string | undefined>(undefined);
  const captchaSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!captchaSiteKey || !captchaRef.current) return;
    const renderWidget = () => {
      if (!window.turnstile || !captchaRef.current || captchaWidgetId.current) return;
      captchaWidgetId.current = window.turnstile.render(captchaRef.current, {
        sitekey: captchaSiteKey,
        callback: setCaptchaToken,
        'expired-callback': () => setCaptchaToken(''),
        'error-callback': () => setCaptchaToken(''),
      });
    };
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-turnstile-script]');
    if (existingScript) {
      existingScript.addEventListener('load', renderWidget, { once: true });
      renderWidget();
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = 'true';
      script.addEventListener('load', renderWidget, { once: true });
      document.head.appendChild(script);
    }
  }, [captchaSiteKey]);

  const activeOffice =
    companyData.offices.find((o) => o.id === selectedOffice) || companyData.offices[0];

  const validate = () => {
    const errors: Partial<Record<keyof ContactSubmission, string>> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.workEmail.trim()) {
      errors.workEmail = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errors.workEmail = 'Please provide a valid email address';
    }
    if (!formData.companyName.trim())
      errors.companyName = 'Company / Organization name is required';
    if (!formData.message.trim()) {
      errors.message = 'Please provide a brief summary of your project or inquiry';
    }
    if (!formData.privacyConsent) {
      errors.privacyConsent = 'Please confirm consent before submitting your inquiry';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setFormErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken }),
      });
      const responseText = await response.text();
      let result: { error?: string; message?: string };
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error('The contact service returned an invalid response. Please make sure the PHP API is running, then try again.');
      }
      if (!response.ok) {
        throw new Error(result.error || 'We could not send your inquiry. Please try again.');
      }
      if (!result.message) {
        throw new Error('The contact service returned an incomplete response. Please try again.');
      }
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof TypeError
          ? 'Could not reach the contact service. Start the PHP API with “npm run serve:php”, then try again.'
          : error instanceof Error ? error.message : 'We could not send your inquiry. Please try again.',
      );
      setCaptchaToken('');
      if (captchaWidgetId.current) window.turnstile?.reset(captchaWidgetId.current);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
      {/* 1. CONTACT HERO */}
      <section className="hero-clay-canvas py-section relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />

          <motion.div
            className="mt-8 max-w-3xl"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-text">
              {contactData.kicker}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
              {contactData.title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">
              {contactData.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FORM & OFFICES */}
      <section className="py-section bg-canvas text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8 lg:gap-10 xl:gap-12">
            {/* Left Column: Consultation Form (7 cols) */}
            <motion.div
              className="lg:col-span-7 min-w-0"
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="clay-card p-6 sm:p-8 lg:p-9">
                <div className="mb-7 sm:mb-8">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent-text">
                    Start a Conversation
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                    Request a Consultation or Proposal
                  </h2>
                  <p className="text-sm text-muted mt-1">
                    Share your goals and our specialists will reach out with a tailored roadmap.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="clay-icon-box w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Inquiry Received
                    </h3>
                    <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.fullName}</strong>. We have logged your inquiry for{' '}
                      <strong>{formData.companyName}</strong> and will reply to{' '}
                      <strong>{formData.workEmail}</strong> promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSuccess(false);
                        setSubmitError('');
                        setFormData({
                          fullName: '',
                          workEmail: '',
                          companyName: '',
                          phone: '',
                          message: '',
                          privacyConsent: false,
                        });
                      }}
                      className="btn-primary"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <Input
                        label="Full Name *"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ananya Verma"
                        error={formErrors.fullName}
                      />

                      <Input
                        label="Work Email *"
                        type="email"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        placeholder="name@company.com"
                        error={formErrors.workEmail}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      <Input
                        label="Company / Organization *"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Acme Systems Pvt. Ltd."
                        error={formErrors.companyName}
                      />

                      <Input
                        label="Phone Number (Optional)"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91-11-00000000"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="field-label">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        aria-invalid={Boolean(formErrors.message)}
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project timeline, technical objectives, or staffing requirements..."
                        className="field"
                      />
                      {formErrors.message && (
                        <span className="field-error block">{formErrors.message}</span>
                      )}
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacyConsent}
                          onChange={(e) =>
                            setFormData({ ...formData, privacyConsent: e.target.checked })
                          }
                          className="mt-1 w-4 h-4 rounded border-line"
                        />
                        <span className="text-xs text-muted leading-relaxed">
                          I agree to allow Prakvi Techno Solutions Private Limited to use these contact details to respond to my inquiry.
                        </span>
                      </label>
                      {formErrors.privacyConsent && (
                        <span className="field-error block">{formErrors.privacyConsent}</span>
                      )}
                    </div>

                    {captchaSiteKey ? (
                      <div ref={captchaRef} aria-label="Security verification" />
                    ) : (
                      <p role="alert" className="field-error">Security verification is not configured.</p>
                    )}

                    <div className="pt-2">
                      {submitError && (
                        <p role="alert" className="field-error mb-3">{submitError}</p>
                      )}
                      <Button type="submit" disabled={isSubmitting || !captchaToken || !captchaSiteKey} className="w-full">
                        {isSubmitting ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" aria-hidden="true" />
                            <span>Send Message</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Column: Delhi & Nashik Office Switcher (5 cols) */}
            <motion.div
              className="lg:col-span-5 min-w-0 space-y-6 lg:sticky lg:top-24"
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2.5">
                  Our Offices
                </div>
                <div className="clay-soft grid grid-cols-2 gap-1.5 rounded-2xl p-1.5">
                  {companyData.offices.map((office) => {
                    const active = selectedOffice === office.id;
                    return (
                      <button
                        key={office.id}
                        type="button"
                        onClick={() => setSelectedOffice(office.id)}
                        className={`relative py-2.5 px-4 rounded-xl text-sm font-bold transition-colors text-center active:scale-95 ${
                          active
                            ? 'text-white'
                            : 'text-muted hover:text-foreground'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="office-switch-pill"
                            transition={
                              reducedMotion
                                ? { duration: 0 }
                                : { type: 'spring', stiffness: 440, damping: 32 }
                            }
                            className="absolute inset-0 rounded-xl bg-accent shadow-md"
                            aria-hidden="true"
                          />
                        )}
                        <span className="relative z-10">{office.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="clay-card p-6 sm:p-7 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeOffice.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.32, 0.72, 0, 1] }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-1">
                        {activeOffice.category}
                      </div>
                      <h3 className="font-display text-2xl font-extrabold text-foreground">
                        {activeOffice.name}
                      </h3>
                    </div>

                    <div className="space-y-4 text-sm text-muted">
                      <div className="flex items-start gap-3">
                        <div className="clay-icon-box h-9 w-9 flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <div className="pt-1">
                          {activeOffice.address.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="clay-icon-box h-9 w-9 flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <a
                          href={`tel:${activeOffice.phone}`}
                          className="font-semibold text-foreground hover:text-accent transition-colors"
                        >
                          {activeOffice.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="clay-icon-box h-9 w-9 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <a
                          href={`mailto:${activeOffice.email}`}
                          className="font-semibold text-foreground hover:text-accent transition-colors"
                        >
                          {activeOffice.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="clay-icon-box h-9 w-9 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <span>{activeOffice.hours}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-line text-xs font-mono text-subtle">
                      {companyData.name}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="clay-pastel p-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent">
                  <Globe2 className="w-4 h-4" aria-hidden="true" />
                  <span>Always Here to Help</span>
                </div>
                <h4 className="font-display text-base font-bold text-foreground">
                  99.9% Uptime · 24/7 Support
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Reach out directly via phone at {companyData.contact.phone} or email {companyData.contact.primaryEmail} for staffing, consulting, or enterprise platform inquiries.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
