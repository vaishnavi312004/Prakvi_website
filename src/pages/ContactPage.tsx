import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageTransition } from '../components/layout/PageTransition';
import { companyData } from '../data/companyData';
import { contactData } from '../data/contactData';
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
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-[#009EDB] selection:text-white">
      {/* =========================================================================
          1. HERO (Deep Navy #071D3A)
         ========================================================================= */}
      <section className="bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Contact Us & Global Hubs' }]} variant="light" />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-[#00D4EA]/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00D4EA] shadow-[0_0_8px_#00D4EA]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D4EA]">
                {contactData.kicker}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {contactData.title}
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-200 leading-relaxed font-light">
              {contactData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CONTACT FORM & OFFICE SELECTION (Off-White #F7FAFC)
         ========================================================================= */}
      <div className="bg-[#F7FAFC] text-[#172B45] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Interactive Proposal Form in White Card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl">
                <div className="mb-8">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#009EDB]">
                    Architectural Discovery
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#071D3A] mt-1">
                    Submit Project Scoping or Staffing RFP
                  </h2>
                  <p className="text-xs sm:text-sm text-[#57708E] mt-1">
                    Directly routed to practice leads. We honor mutual NDAs prior to technical assessment.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#DDF4FF] border border-[#009EDB]/40 text-[#009EDB] flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#071D3A]">
                      Discovery Transmission Logged!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#57708E] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.fullName}</strong>. An enterprise architect has received your brief for <strong>{formData.companyName}</strong>. A response will be dispatched to <strong>{formData.workEmail}</strong> within 24 business hours.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#071D3A] text-white text-xs font-semibold shadow-md"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#071D3A] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Elena Rostova"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#071D3A] placeholder:text-slate-400 focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                        />
                        {formErrors.fullName && (
                          <span className="text-xs text-rose-600 mt-1 block">{formErrors.fullName}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#071D3A] mb-1.5">
                          Enterprise Work Email *
                        </label>
                        <input
                          type="email"
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          placeholder="e.rostova@enterprise.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#071D3A] placeholder:text-slate-400 focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                        />
                        {formErrors.workEmail && (
                          <span className="text-xs text-rose-600 mt-1 block">{formErrors.workEmail}</span>
                        )}
                      </div>
                    </div>

                    {/* Company Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#071D3A] mb-1.5">
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="e.g. Apex Health Systems"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#071D3A] placeholder:text-slate-400 focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                        />
                        {formErrors.companyName && (
                          <span className="text-xs text-rose-600 mt-1 block">{formErrors.companyName}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#071D3A] mb-1.5">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 019-2834"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#071D3A] placeholder:text-slate-400 focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                        />
                      </div>
                    </div>

                    {/* Service Area of Interest */}
                    <div>
                      <label className="block text-xs font-semibold text-[#071D3A] mb-1.5">
                        Primary Practice Track of Interest
                      </label>
                      <select
                        value={formData.serviceInterestedIn}
                        onChange={(e) => setFormData({ ...formData, serviceInterestedIn: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#071D3A] focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
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
                      <label className="block text-xs font-semibold text-[#071D3A] mb-1.5">
                        Brief Project Description or Staffing Scope *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail timeline, technical specifications, or headcount requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#071D3A] placeholder:text-slate-400 focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                      />
                      {formErrors.message && (
                        <span className="text-xs text-rose-600 mt-1 block">{formErrors.message}</span>
                      )}
                    </div>

                    {/* Privacy Consent */}
                    <div className="pt-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacyConsent}
                          onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                          className="mt-1 w-4 h-4 rounded text-[#009EDB] focus:ring-[#009EDB] border-slate-300"
                        />
                        <span className="text-xs text-[#57708E] leading-relaxed">
                          I consent to Prakvi Techno Solutions Private Limited processing this information to schedule technical scoping sessions. We never sell contact information to third parties.
                        </span>
                      </label>
                      {formErrors.privacyConsent && (
                        <span className="text-xs text-rose-600 mt-1 block">{formErrors.privacyConsent}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-xl text-sm font-bold text-white bg-[#071D3A] hover:bg-[#009EDB] shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>Encrypting & Dispatching Brief...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Dispatch Strategic Brief to Practice Lead</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Office Hub Selector & Global Contacts (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Office Selector Pills */}
              <div className="flex flex-col gap-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#009EDB] mb-1">
                  Global Delivery Hubs
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {companyData.offices.map((office) => (
                    <button
                      key={office.id}
                      onClick={() => setSelectedOffice(office.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all truncate text-center ${
                        selectedOffice === office.id
                          ? 'bg-[#071D3A] text-white shadow-sm font-bold'
                          : 'bg-white text-slate-600 hover:text-[#071D3A] border border-slate-200'
                      }`}
                    >
                      {office.city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Office Detailed Card */}
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6">
                <div>
                  <div className="text-xs font-mono font-bold text-[#009EDB] mb-1">
                    {activeOffice.category}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#071D3A]">
                    {activeOffice.name}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#57708E]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#009EDB] shrink-0 mt-1" />
                    <div>
                      {activeOffice.address.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#009EDB] shrink-0" />
                    <a href={`tel:${activeOffice.phone}`} className="hover:text-[#071D3A] font-semibold">
                      {activeOffice.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#009EDB] shrink-0" />
                    <a href={`mailto:${activeOffice.email}`} className="hover:text-[#071D3A] font-semibold">
                      {activeOffice.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#009EDB] shrink-0" />
                    <span>{activeOffice.hours}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
                  {companyData.legalEntity}
                </div>
              </div>

              {/* Commitment Guarantee Card */}
              <div className="p-6 rounded-3xl bg-[#DDF4FF]/40 border border-[#009EDB]/25 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#009EDB]">
                  <Globe2 className="w-4 h-4" />
                  <span>SLA Guarantee</span>
                </div>
                <h4 className="font-display text-base font-bold text-[#071D3A]">
                  24-Hour Scoping Commitment
                </h4>
                <p className="text-xs text-[#57708E] leading-relaxed">
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
