import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageTransition } from '../components/layout/PageTransition';
import { companyData } from '../data/companyData';
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
    <PageTransition className="min-h-screen bg-[#02060D] text-slate-100 pt-20">
      {/* 1. HERO WITH BLENDED CANVAS */}
      <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Contact Us & Global Hubs' }]} variant="light" />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                Global Client Operations
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Start an Enterprise Conversation.
            </h1>

            <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-light">
              Connect with our practice leaders and solutions architects in Hyderabad, Bengaluru, or our North America client desks to scope technical roadmaps, staffing requirements, or platform demos.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE FORM & OFFICE HUBS GRID (CONTINUOUS DARK CANVAS) */}
      <section className="py-20 lg:py-24 bg-[#02060D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/30 shadow-2xl backdrop-blur-xl transition-all">
                <div className="mb-8">
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00F0FF]">
                    Enterprise RFP & Inquiries
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Send Us a Project Brief
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 font-light">
                    Our technical practice architects typically respond within 24 to 48 business hours with an initial discovery overview.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="py-12 text-center space-y-4 bg-[#02060D]/80 rounded-2xl border border-[#00F0FF]/30 p-8">
                    <div className="w-16 h-16 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Inquiry Received!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                      Thank you, <strong>{formData.fullName}</strong>. Your inquiry regarding <strong>{formData.serviceInterestedIn}</strong> has been assigned to our practice management council. A confirmation has been routed to <strong>{formData.workEmail}</strong>.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            fullName: '',
                            workEmail: '',
                            companyName: '',
                            phone: '',
                            serviceInterestedIn: 'Staffing & Workforce Solutions',
                            message: '',
                            privacyConsent: false,
                          });
                        }}
                        className="px-6 py-2.5 rounded-xl text-xs font-semibold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/30 hover:bg-[#00F0FF] hover:text-[#02060D] transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 pt-2">
                      *Frontend Prototype State: Submissions verified in client session.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Rachel Adams"
                          className={`w-full px-4 py-2.5 bg-[#02060D] rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all ${
                            formErrors.fullName ? 'border-rose-400 bg-rose-500/10' : 'border-white/15'
                          }`}
                        />
                        {formErrors.fullName && (
                          <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.fullName}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Corporate Work Email *
                        </label>
                        <input
                          type="email"
                          value={formData.workEmail}
                          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                          placeholder="rachel@enterprise.com"
                          className={`w-full px-4 py-2.5 bg-[#02060D] rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all ${
                            formErrors.workEmail ? 'border-rose-400 bg-rose-500/10' : 'border-white/15'
                          }`}
                        />
                        {formErrors.workEmail && (
                          <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.workEmail}</span>
                        )}
                      </div>
                    </div>

                    {/* Company Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Company / Organization Name *
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          placeholder="Acme Health Systems"
                          className={`w-full px-4 py-2.5 bg-[#02060D] rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all ${
                            formErrors.companyName ? 'border-rose-400 bg-rose-500/10' : 'border-white/15'
                          }`}
                        />
                        {formErrors.companyName && (
                          <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.companyName}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 234-5678"
                          className="w-full px-4 py-2.5 bg-[#02060D] rounded-xl border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Practice Track or Subject of Interest *
                      </label>
                      <select
                        value={formData.serviceInterestedIn}
                        onChange={(e) => setFormData({ ...formData, serviceInterestedIn: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#02060D] rounded-xl border border-white/15 text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
                      >
                        <option value="Staffing & Workforce Solutions">Staffing & Workforce Solutions (IT & Healthcare)</option>
                        <option value="Mobility Practice (BYOD & CYOD)">Enterprise Mobility Practice (BYOD / CYOD)</option>
                        <option value="Cloud Services & Infrastructure">Cloud Services & Infrastructure Management</option>
                        <option value="AI, Data Analytics & BI">AI, Data Analytics & Business Intelligence</option>
                        <option value="Enterprise Architecture & Integration">Enterprise Architecture & System Integration</option>
                        <option value="Digital Engineering & Web Development">Digital Engineering & Web Development</option>
                        <option value="IT Consulting & Strategic Advisory">IT Consulting & Strategic Advisory</option>
                        <option value="Proprietary SaaS Product Demo">Proprietary SaaS Product Demo (DataPulse / TalentCore / NexVendor / CRM)</option>
                        <option value="General Corporate Partnership">General Corporate Partnership</option>
                      </select>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Project Scope or Consultation Details *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your technical requirements, team augmentation needs, or estimated timelines..."
                        className={`w-full px-4 py-3 bg-[#02060D] rounded-xl border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all ${
                          formErrors.message ? 'border-rose-400 bg-rose-500/10' : 'border-white/15'
                        }`}
                      />
                      {formErrors.message && (
                        <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.message}</span>
                      )}
                    </div>

                    {/* Privacy Consent Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacyConsent}
                          onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                          className="w-4 h-4 rounded text-[#00F0FF] focus:ring-[#00F0FF] border-white/20 bg-[#02060D] mt-0.5"
                        />
                        <span className="text-xs text-slate-400 leading-relaxed font-light">
                          I consent to Prakvi Techno Solutions Private Limited processing my contact details in accordance with standard enterprise confidentiality protocols for the sole purpose of responding to this inquiry.
                        </span>
                      </label>
                      {formErrors.privacyConsent && (
                        <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.privacyConsent}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-[#02060D] border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#02060D]" />
                            <span>Transmit Enterprise Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Office Hubs & Interactive Viewer (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#00F0FF]">
                  Global Physical Presence
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Delivery Centers & Regional Desks
                </h3>
              </div>

              {/* Office Selector */}
              <div className="flex flex-col gap-2.5">
                {companyData.offices.map((office) => (
                  <button
                    key={office.id}
                    onClick={() => setSelectedOffice(office.id)}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      selectedOffice === office.id
                        ? 'bg-[#040E1E] text-white border-[#00F0FF]/50 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                        : 'bg-[#040E1E]/60 text-slate-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-white">{office.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                          selectedOffice === office.id
                            ? 'bg-[#00F0FF] text-[#02060D]'
                            : 'bg-white/[0.06] text-slate-400'
                        }`}
                      >
                        {office.category}
                      </span>
                    </div>
                    <div className="text-xs mt-1 text-slate-400">
                      {office.city}, {office.country}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Office Active Details Card */}
              <div className="p-7 rounded-3xl bg-[#040E1E]/90 border border-[#00F0FF]/25 shadow-xl space-y-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] font-bold uppercase">
                  <MapPin className="w-4 h-4 text-[#00F0FF]" />
                  <span>{activeOffice.name}</span>
                </div>

                <div className="text-sm text-slate-200 font-medium leading-relaxed pl-6 font-light">
                  {activeOffice.address.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs text-slate-400 pl-6">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <a href={`tel:${activeOffice.phone}`} className="hover:text-[#00F0FF] font-mono">
                      {activeOffice.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <a href={`mailto:${activeOffice.email}`} className="hover:text-[#00F0FF] font-mono">
                      {activeOffice.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>{activeOffice.hours}</span>
                  </div>
                </div>
              </div>

              {/* Styled Cyber Geographic Visualization Box */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#07192F] to-[#040E1E] border border-[#00F0FF]/30 p-7 text-white text-center shadow-xl">
                <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
                <Globe2 className="w-10 h-10 text-[#00F0FF] mx-auto mb-3 drop-shadow-[0_0_10px_#00F0FF]" />
                <h4 className="font-display text-base font-bold text-white mb-1.5">
                  Global Distributed Sourcing Network
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto font-light">
                  Coordinated 24/7 delivery handoffs connecting our engineering hubs in India with North American client timezones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
