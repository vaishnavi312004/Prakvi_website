import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageTransition } from '../components/layout/PageTransition';
import { companyData } from '../data/companyData';
import { contactData } from '../data/contactData';
import { Input } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ContactSubmission } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Send,
  Globe2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<string>(companyData.offices[0].id);

  // Form State
  const [formData, setFormData] = useState<ContactSubmission>({
    fullName: '',
    workEmail: '',
    companyName: '',
    phone: '',
    serviceInterestedIn: 'Staffing & Workforce Solutions',
    message: '',
    privacyConsent: false,
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactSubmission, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeOffice = companyData.offices.find((o) => o.id === selectedOffice) || companyData.offices[0];

  const validate = () => {
    const errors: Partial<Record<keyof ContactSubmission, string>> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.workEmail.trim()) {
      errors.workEmail = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      errors.workEmail = 'Please provide a valid business email address';
    }
    if (!formData.companyName.trim()) errors.companyName = 'Company / Organization name is required';
    if (!formData.message.trim()) {
      errors.message = 'Please provide a brief summary of your project or inquiry';
    }
    if (!formData.privacyConsent) {
      errors.privacyConsent = 'You must agree to the privacy consent to submit an inquiry';
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

    // Simulate enterprise asynchronous transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-accent selection:text-white">

      <section className="bg-gradient-to-b from-canvas via-surface to-canvas text-foreground py-section relative overflow-hidden">
        <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Contact Us & Global Hubs' }]} variant="light" />

          <div className="mt-8 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white/[0.04] px-3.5 py-1.5">
              <span className="w-2 h-2 rounded-full bg-accent shadow-accent" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
                {contactData.kicker}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
              {contactData.title}
            </h1>

            <p className="mt-6 text-base sm:text-xl text-muted leading-relaxed font-light">
              {contactData.subtitle}
            </p>
          </div>
        </div>
      </section>


      <div className="text-foreground py-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Interactive Proposal Form in White Card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-line ">
                <div className="mb-8">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                    Architectural Discovery
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                    Submit Project Scoping or Staffing RFP
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1">
                    Directly routed to practice leads. We honor mutual NDAs prior to technical assessment.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Discovery Transmission Logged!
                    </h3>
                    <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.fullName}</strong>. An enterprise architect has received your brief for <strong>{formData.companyName}</strong>. A response will be dispatched to <strong>{formData.workEmail}</strong> within 24 business hours.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn-primary"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input label="Full Name *" type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Elena Rostova" error={formErrors.fullName} />

                      <Input label="Enterprise Work Email *" type="email"
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          placeholder="e.rostova@enterprise.com" error={formErrors.workEmail} />
                    </div>

                    {/* Company Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input label="Company / Organization *" type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. Apex Health Systems" error={formErrors.companyName} />

                      <Input label="Phone Number (Optional)" type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 019-2834" />
                    </div>

                    {/* Service Area of Interest */}
                    <div>
                      <label htmlFor="contact-service" className="field-label">
                        Primary Practice Track of Interest
                      </label>
                      <select id="contact-service"
                        value={formData.serviceInterestedIn}
                        onChange={(e) => setFormData({ ...formData, serviceInterestedIn: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      >
                        {contactData.serviceTopics.map((topic) => (
                          <option key={topic.id} value={topic.label}>
                            {topic.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Project Brief */}
                    <div>
                      <label htmlFor="contact-message" className="field-label">
                        Brief Project Description or Staffing Scope *
                      </label>
                      <textarea id="contact-message" aria-invalid={Boolean(formErrors.message)}
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail timeline, technical specifications, or headcount requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                      {formErrors.message && (
                        <span className="text-xs text-rose-300 mt-1 block">{formErrors.message}</span>
                      )}
                    </div>

                    {/* Privacy Consent */}
                    <div className="pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacyConsent}
                          onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                          className="mt-1 w-4 h-4 rounded text-accent focus:ring-accent border-line"
                        />
                        <span className="text-xs text-muted leading-relaxed">
                          I consent to Prakvi Techno Solutions Private Limited processing this information to schedule technical scoping sessions. We never sell contact information to third parties.
                        </span>
                      </label>
                      {formErrors.privacyConsent && (
                        <span className="text-xs text-rose-300 mt-1 block">{formErrors.privacyConsent}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          <span>Encrypting & Dispatching Brief...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Dispatch Strategic Brief to Practice Lead</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Office Hub Selector & Global Contacts (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Office Selector Pills */}
              <div className="flex flex-col gap-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-1">
                  Global Delivery Hubs
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {companyData.offices.map((office) => (
                    <button
                      key={office.id}
                      onClick={() => setSelectedOffice(office.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all truncate text-center ${
                        selectedOffice === office.id
                          ? 'bg-accent/10 text-accent ring-1 ring-accent/40 font-bold'
                          : 'bg-surface text-muted hover:text-foreground border border-line'
                      }`}
                    >
                      {office.city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Office Detailed Card */}
              <div className="p-8 rounded-3xl glass-panel border border-line  space-y-6">
                <div>
                  <div className="text-xs font-mono font-bold text-accent mb-1">
                    {activeOffice.category}
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {activeOffice.name}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-muted">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                    <div>
                      {activeOffice.address.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    <a href={`tel:${activeOffice.phone}`} className="hover:text-foreground font-semibold">
                      {activeOffice.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <a href={`mailto:${activeOffice.email}`} className="hover:text-foreground font-semibold">
                      {activeOffice.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-accent shrink-0" />
                    <span>{activeOffice.hours}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-line text-xs font-mono text-subtle">
                  {companyData.legalEntity}
                </div>
              </div>

              {/* Commitment Guarantee Card */}
              <div className="p-6 rounded-3xl bg-surface/40 border border-accent/25 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent">
                  <Globe2 className="w-4 h-4" />
                  <span>SLA Guarantee</span>
                </div>
                <h4 className="font-display text-base font-bold text-foreground">
                  24-Hour Scoping Commitment
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Every technical inquiry is reviewed by a practicing engineering lead. You will receive an architectural questionnaire and discovery schedule within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
