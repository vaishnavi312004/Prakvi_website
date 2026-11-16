import React, { useState } from 'react';
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

export const ContactPage: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<string>(companyData.offices[0].id);

  const [formData, setFormData] = useState<ContactSubmission>({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    serviceInterestedIn: contactData.serviceTopics[0]?.label || 'Staffing Services',
    message: '',
    privacyConsent: false,
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactSubmission, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
      {/* 1. CONTACT HERO */}
      <section className="hero-clay-canvas py-section relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} />

          <div className="mt-8 max-w-3xl">
            <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
              {contactData.kicker}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
              {contactData.title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">
              {contactData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & OFFICES */}
      <section className="py-section bg-canvas text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Consultation Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="clay-card p-7 sm:p-10">
                <div className="mb-7">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
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
                        setFormData({
                          fullName: '',
                          workEmail: '',
                          companyName: '',
                          phone: '',
                          serviceInterestedIn: contactData.serviceTopics[0]?.label || 'Staffing Services',
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
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      <label htmlFor="contact-service" className="field-label">
                        Service or Product of Interest
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceInterestedIn}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceInterestedIn: e.target.value })
                        }
                        className="field"
                      >
                        {contactData.serviceTopics.map((topic) => (
                          <option key={topic.id} value={topic.label}>
                            {topic.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="field-label">
                        Project Requirements or Inquiry *
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

                    <div className="pt-2">
                      <Button type="submit" disabled={isSubmitting} className="w-full">
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
            </div>

            {/* Right Column: Delhi & Nashik Office Switcher (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2.5">
                  Our Offices
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {companyData.offices.map((office) => {
                    const active = selectedOffice === office.id;
                    return (
                      <button
                        key={office.id}
                        type="button"
                        onClick={() => setSelectedOffice(office.id)}
                        className={`py-3 px-4 rounded-2xl text-sm font-bold transition-all text-center ${
                          active
                            ? 'bg-accent text-white shadow-md'
                            : 'clay-card text-muted hover:text-foreground'
                        }`}
                      >
                        {office.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="clay-card p-8 space-y-6">
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
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
