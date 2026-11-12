import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { careerBenefits, recruitmentSteps, jobsData } from '../data/careersData';
import { JobItem } from '../types';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
  CheckCircle2,
  Upload,
  X,
  AlertCircle,
  GraduationCap,
  HeartPulse,
  Laptop,
  BadgePercent,
  Globe2,
  Users,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  // Job Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Selected Job for Details Modal
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  // Application Modal State
  const [applyingJob, setApplyingJob] = useState<JobItem | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExp, setApplicantExp] = useState('');
  const [applicantCover, setApplicantCover] = useState('');
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter Jobs
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.preferredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesLoc = selectedLocation === 'All' || job.location.includes(selectedLocation);
    const matchesType = selectedType === 'All' || job.employmentType === selectedType;

    return matchesSearch && matchesDept && matchesLoc && matchesType;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDept('All');
    setSelectedLocation('All');
    setSelectedType('All');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError('File size must be under 5MB.');
        return;
      }
      setResumeFileName(file.name);
      setFormError(null);
    }
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone || !applicantExp) {
      setFormError('Please fill out all required fields.');
      return;
    }
    if (!resumeFileName) {
      setFormError('Please attach your resume (PDF/DOCX).');
      return;
    }

    setFormError(null);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setApplyingJob(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantExp('');
      setApplicantCover('');
      setResumeFileName(null);
    }, 4000);
  };

  return (
    <PageTransition>
      <div className="bg-[#02060D] text-slate-100 overflow-x-hidden pt-20">
        {/* 1. CULTURE HERO */}
        <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/src/assets/images/careers_culture_team_1794479543837.jpg"
              alt="Prakvi Corporate Culture"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02060D] via-[#02060D]/90 to-[#02060D]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-[#02060D]/80" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Careers & Opportunities' }]} variant="light" />

            <div className="mt-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  People, Culture & Growth
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Build What's Next With Us.
              </h1>

              <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed text-balance font-light">
                Join a multidisciplinary team of cloud architects, staffing strategists, data engineers, and problem solvers. We cultivate autonomy, sponsored certifications, and impactful global enterprise projects.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#open-positions"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all"
                >
                  <span>View {jobsData.length} Open Positions</span>
                  <ArrowRight className="w-4 h-4 text-[#02060D]" />
                </a>
                <a
                  href="#culture"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-[#00F0FF]/40 transition-colors"
                >
                  <span>Life at Prakvi</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTINUOUS UNIFIED STORYTELLING CANVAS IN DARK OBSIDIAN NAVY
           ========================================================================= */}
        <div id="culture" className="relative bg-[#02060D]">
          {/* 2. WHY WORK AT PRAKVI & BENEFITS */}
          <section className="py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Employee Experience"
                title="Why Engineers & Practice Leaders Flourish at Prakvi"
                description="We believe technical excellence thrives when people feel supported, intellectually challenged, and fairly rewarded."
                theme="dark"
              />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-7 rounded-3xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/40 shadow-xl transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center mb-5 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                      {i === 0 && <GraduationCap className="w-6 h-6" />}
                      {i === 1 && <HeartPulse className="w-6 h-6" />}
                      {i === 2 && <Laptop className="w-6 h-6" />}
                      {i === 3 && <BadgePercent className="w-6 h-6" />}
                      {i === 4 && <Globe2 className="w-6 h-6" />}
                      {i === 5 && <Users className="w-6 h-6" />}
                    </div>
                    <h4 className="font-display text-base font-bold text-white mb-2">
                      {b.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. RECRUITMENT TIMELINE */}
          <section className="py-20 border-t border-white/[0.06] bg-[#040E1E]/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Hiring Journey"
                title="Our Transparent Recruitment Process"
                description="Respectful, streamlined, and centered on real-world engineering discussions rather than puzzle-based whiteboard tests."
                theme="dark"
                align="center"
              />

              {/* Elegant Connected Timeline */}
              <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-5 relative">
                {recruitmentSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#07192F]/80 border border-white/10 hover:border-[#00F0FF]/40 shadow-lg relative flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-mono font-bold text-xs flex items-center justify-center mb-4 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                        {step.step}
                      </div>
                      <h4 className="font-display text-sm font-bold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-white/10 text-[10px] font-mono text-[#00F0FF]">
                      Stage 0{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. INTERACTIVE JOB PORTAL */}
          <section id="open-positions" className="py-20 border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                    Live Positions
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    Current Opportunities at Prakvi
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
                    Showing {filteredJobs.length} of {jobsData.length} active requisitions across engineering, consulting, and staffing.
                  </p>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="bg-[#040E1E] p-5 rounded-3xl border border-white/10 shadow-xl mb-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Keyword Search */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search role, stack, or skill..."
                      className="w-full pl-10 pr-4 py-2.5 bg-[#02060D] rounded-xl border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                    />
                  </div>

                  {/* Department Filter */}
                  <div>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#02060D] rounded-xl border border-white/15 text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                    >
                      <option value="All">All Departments</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                      <option value="Workforce Solutions">Workforce Solutions</option>
                      <option value="Consulting">Consulting</option>
                    </select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#02060D] rounded-xl border border-white/15 text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                    >
                      <option value="All">All Locations</option>
                      <option value="Hyderabad">Hyderabad, India</option>
                      <option value="Bengaluru">Bengaluru, India</option>
                      <option value="Texas">Texas, USA / Remote</option>
                    </select>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#02060D] rounded-xl border border-white/15 text-sm text-white focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                    >
                      <option value="All">All Employment Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Contract">Contract</option>
                      <option value="C2H">Contract to Hire</option>
                    </select>
                  </div>
                </div>

                {(searchTerm || selectedDept !== 'All' || selectedLocation !== 'All' || selectedType !== 'All') && (
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                    <span className="text-slate-400">Active filters applied</span>
                    <button
                      onClick={clearFilters}
                      className="text-[#00F0FF] hover:underline font-semibold"
                    >
                      Reset all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Job Listings Cards */}
              {filteredJobs.length === 0 ? (
                <div className="text-center py-16 bg-[#040E1E] rounded-3xl border border-white/10 space-y-3">
                  <Briefcase className="w-10 h-10 text-slate-500 mx-auto" />
                  <h3 className="font-display text-base font-bold text-white">
                    No Positions Matching Current Filter
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">
                    Try adjusting your search criteria or submit a general inquiry to our talent team.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#00F0FF] to-[#009EDB] text-[#02060D] text-xs font-bold rounded-xl"
                  >
                    Clear Search Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-6 sm:p-7 rounded-3xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/40 shadow-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.12)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-semibold text-[#00F0FF]">
                            {job.department}
                          </span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-300">
                            {job.locationType}
                          </span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-300">
                            {job.employmentType}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-white">
                          {job.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-light">
                          {job.overview}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                            {job.experienceLevel}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col lg:flex-row items-center gap-3 shrink-0">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.05] border border-white/15 hover:border-[#00F0FF]/40 hover:text-white transition-colors"
                        >
                          View Specs
                        </button>

                        <button
                          onClick={() => setApplyingJob(job)}
                          className="px-6 py-3 rounded-xl text-xs font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all active:scale-95 flex items-center gap-1.5"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#02060D]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* 5. JOB DETAILS MODAL */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="bg-[#040E1E] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-[#00F0FF]/30 max-h-[90vh] overflow-y-auto text-white">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.08] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#00F0FF] mb-1 font-mono">
                    <span>{selectedJob.department}</span>
                    <span className="text-slate-500">·</span>
                    <span>{selectedJob.location}</span>
                    <span className="text-slate-500">·</span>
                    <span>{selectedJob.employmentType}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {selectedJob.title}
                  </h3>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-2">
                    Role Overview
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {selectedJob.overview}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-2">
                    Responsibilities
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                    {selectedJob.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00F0FF] font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-2">
                    Required Qualifications
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                    {selectedJob.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#00F0FF] font-bold">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-2">
                    Skills & Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.preferredSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/[0.04] border border-white/15 rounded-lg text-xs font-mono text-[#00F0FF]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      setApplyingJob(selectedJob);
                      setSelectedJob(null);
                    }}
                    className="px-6 py-3 rounded-xl text-xs font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-md transition-all"
                  >
                    Apply for this position →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. INTERACTIVE JOB APPLICATION FORM MODAL */}
        {applyingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="bg-[#040E1E] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#00F0FF]/30 max-h-[90vh] overflow-y-auto text-white">
              <button
                onClick={() => setApplyingJob(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.08] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Application Submitted!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed font-light">
                    Thank you, <strong>{applicantName}</strong>. Your application for <strong>{applyingJob.title}</strong> has been received by Prakvi Talent Acquisition. A confirmation email has been dispatched to <strong>{applicantEmail}</strong>.
                  </p>
                  <div className="text-[10px] font-mono text-slate-500 pt-2">
                    (Simulated Application Flow • Frontend-Only Demonstration)
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00F0FF] mb-1">
                    Candidate Application
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Apply for {applyingJob.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 mb-6 font-light">
                    Complete the application form below. Our talent acquisition pod will review your profile.
                  </p>

                  {formError && (
                    <div className="p-3.5 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. David Miller"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#02060D] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="david@example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#02060D] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#02060D] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Years of Relevant Experience *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantExp}
                        onChange={(e) => setApplicantExp(e.target.value)}
                        placeholder="e.g. 6 Years"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#02060D] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                      />
                    </div>

                    {/* Resume Upload Dropzone UI */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Attach Resume / CV (PDF, DOCX) *
                      </label>
                      <div className="border-2 border-dashed border-white/20 rounded-2xl p-5 text-center hover:border-[#00F0FF] transition-colors bg-[#02060D]">
                        <input
                          type="file"
                          id="resumeUpload"
                          accept=".pdf,.docx,.doc"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="resumeUpload"
                          className="cursor-pointer flex flex-col items-center gap-1.5"
                        >
                          <Upload className="w-6 h-6 text-[#00F0FF]" />
                          <span className="text-xs font-semibold text-slate-200">
                            {resumeFileName ? (
                              <span className="text-[#00F0FF] font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {resumeFileName}
                              </span>
                            ) : (
                              'Click to select resume from your device'
                            )}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Maximum file size: 5MB
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Cover Letter or Brief Intro (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={applicantCover}
                        onChange={(e) => setApplicantCover(e.target.value)}
                        placeholder="Share relevant architectures, projects, or why you want to join Prakvi..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#02060D] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
                    >
                      Submit Application
                    </button>

                    <p className="text-[10px] text-center text-slate-500 font-mono">
                      *Client-side prototype: no real resume data is persisted until backend integration.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <CTASection
          title="Don't See Your Exact Role?"
          subtitle="We frequently create bespoke positions for exceptional architects, clinical recruiters, and full-stack engineers. Send an inquiry to careers@prakvi.com."
          primaryButtonText="Send General Profile"
          primaryButtonLink="/contact"
        />
      </div>
    </PageTransition>
  );
};
