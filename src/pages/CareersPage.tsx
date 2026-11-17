import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { careerBenefits, recruitmentSteps, jobsData } from '../data/careersData';
import { JobItem } from '../types';
import {
  AlertCircle,
  ArrowRight,
  BadgePercent,
  Briefcase,
  CheckCircle2,
  Clock,
  Globe2,
  GraduationCap,
  HeartPulse,
  Laptop,
  MapPin,
  Search,
  Upload,
  Users,
  X,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [applyingJob, setApplyingJob] = useState<JobItem | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExp, setApplicantExp] = useState('');
  const [applicantCover, setApplicantCover] = useState('');
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    }, 3500);
  };

  return (
    <PageTransition>
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
        {/* 1. CAREERS HERO */}
        <section className="hero-clay-canvas py-section relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Careers' }]} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
                  People, Culture & Growth
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                  Build What’s Next With Us.
                </h1>

                <p className="text-base sm:text-lg text-muted leading-relaxed text-balance">
                  Join a multidisciplinary team of engineers, cloud specialists, data analysts, and staffing strategists solving real enterprise challenges across Delhi, Nashik, and remote teams.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <a href="#open-positions" className="btn-primary">
                    <span>View {jobsData.length} Open Positions</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </a>
                  <a href="#culture" className="btn-secondary">
                    <span>Life at Prakvi</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="clay-card p-3">
                  <img
                    src="/img/careers_culture_team_1794479543837.jpg"
                    alt="Prakvi collaborative culture"
                    className="w-full h-72 sm:h-80 object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. EMPLOYEE EXPERIENCE */}
        <section id="culture" className="py-section bg-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Employee Experience"
              title="Why Engineers & Specialists Thrive at Prakvi"
              description="We believe technical excellence grows when teams are supported, challenged, and valued."
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerBenefits.map((b, i) => (
                <div key={i} className="clay-card clay-card-interactive p-7">
                  <div className="clay-icon-box w-12 h-12 flex items-center justify-center mb-5">
                    {i === 0 && <GraduationCap className="w-6 h-6" />}
                    {i === 1 && <HeartPulse className="w-6 h-6" />}
                    {i === 2 && <Laptop className="w-6 h-6" />}
                    {i === 3 && <BadgePercent className="w-6 h-6" />}
                    {i === 4 && <Globe2 className="w-6 h-6" />}
                    {i === 5 && <Users className="w-6 h-6" />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. HIRING JOURNEY */}
        <section className="py-section bg-section-alt text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Hiring Journey"
              title="Transparent 5-Stage Recruitment Process"
              description="Practical, collaborative conversations focused on real-world experience."
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-5">
              {recruitmentSteps.map((step, idx) => (
                <div key={idx} className="clay-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="clay-icon-box w-9 h-9 font-mono font-bold text-xs flex items-center justify-center mb-4">
                      {step.step}
                    </div>
                    <h4 className="font-display text-sm font-bold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-line text-[11px] font-mono text-accent font-semibold">
                    Stage 0{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. OPEN POSITIONS */}
        <section id="open-positions" className="py-section bg-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                Open Roles
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                Current Opportunities at Prakvi
              </h2>
              <p className="text-sm text-muted mt-1">
                Showing {filteredJobs.length} of {jobsData.length} active positions across engineering, consulting, and workforce solutions.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="clay-card p-5 mb-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-muted absolute left-3.5 top-4 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search role or skill..."
                    className="field !pl-10"
                  />
                </div>

                <select
                  aria-label="Filter by department"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="field"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Workforce Solutions">Workforce Solutions</option>
                  <option value="Consulting">Consulting</option>
                </select>

                <select
                  aria-label="Filter by location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="field"
                >
                  <option value="All">All Locations</option>
                  <option value="New Delhi">New Delhi, India</option>
                  <option value="Nashik">Nashik, India</option>
                  <option value="Remote">Remote</option>
                </select>

                <select
                  aria-label="Filter by employment type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="field"
                >
                  <option value="All">All Employment Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="C2H">Contract to Hire</option>
                </select>
              </div>

              {(searchTerm ||
                selectedDept !== 'All' ||
                selectedLocation !== 'All' ||
                selectedType !== 'All') && (
                <div className="flex items-center justify-between pt-3 border-t border-line text-xs">
                  <span className="text-muted">Active filters applied</span>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-accent hover:underline font-semibold"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>

            {filteredJobs.length === 0 ? (
              <div className="clay-card text-center py-14 space-y-3">
                <Briefcase className="w-10 h-10 text-muted mx-auto" />
                <h3 className="font-display text-lg font-bold text-foreground">
                  No Matching Positions
                </h3>
                <p className="text-sm text-muted max-w-sm mx-auto">
                  Try adjusting your filters or explore all open roles.
                </p>
                <button type="button" onClick={clearFilters} className="btn-secondary">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="clay-card clay-card-interactive p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="text-accent">{job.department}</span>
                        <span className="text-muted">·</span>
                        <span className="text-muted">{job.locationType}</span>
                        <span className="text-muted">·</span>
                        <span className="text-muted">{job.employmentType}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-foreground">
                        {job.title}
                      </h3>

                      <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                        {job.overview}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-subtle pt-1 font-mono">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          {job.experienceLevel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedJob(job)}
                        className="btn-secondary !min-h-[2.5rem] !px-4 !text-xs"
                      >
                        View Specs
                      </button>

                      <button
                        type="button"
                        onClick={() => setApplyingJob(job)}
                        className="btn-primary !min-h-[2.5rem] !px-5 !text-xs"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="arrow-shift" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* JOB DETAILS MODAL */}
        {selectedJob && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 bg-slate-900/30 backdrop-blur-sm"
          >
            <div
              data-lenis-prevent
              className="clay-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto text-foreground"
            >
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 text-muted hover:text-foreground rounded-xl hover:bg-surface transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent mb-1 font-mono">
                    <span>{selectedJob.department}</span>
                    <span className="text-muted">·</span>
                    <span>{selectedJob.location}</span>
                    <span className="text-muted">·</span>
                    <span>{selectedJob.employmentType}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {selectedJob.title}
                  </h3>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
                    Role Overview
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {selectedJob.overview}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
                    Responsibilities
                  </div>
                  <ul className="space-y-2 text-sm text-muted">
                    {selectedJob.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
                    Qualifications
                  </div>
                  <ul className="space-y-2 text-sm text-muted">
                    {selectedJob.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="btn-secondary !min-h-[2.5rem] !px-4 !text-xs"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const j = selectedJob;
                      setSelectedJob(null);
                      setApplyingJob(j);
                    }}
                    className="btn-primary !min-h-[2.5rem] !px-5 !text-xs"
                  >
                    Proceed to Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APPLICATION MODAL */}
        {applyingJob && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 bg-slate-900/30 backdrop-blur-sm"
          >
            <div
              data-lenis-prevent
              className="clay-card rounded-3xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto text-foreground"
            >
              <button
                type="button"
                onClick={() => setApplyingJob(null)}
                className="absolute top-4 right-4 p-2 text-muted hover:text-foreground rounded-xl hover:bg-surface transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="clay-icon-box w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Application Submitted
                  </h3>
                  <p className="text-sm text-muted max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{applicantName}</strong>. Your application for{' '}
                    <strong>{applyingJob.title}</strong> has been logged.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <div className="border-b border-line pb-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                      Job Application
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-foreground mt-1">
                      {applyingJob.title}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      {applyingJob.department} · {applyingJob.location}
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label htmlFor="app-name" className="field-label">
                        Full Name *
                      </label>
                      <input
                        id="app-name"
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Full name"
                        className="field"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="app-email" className="field-label">
                          Email Address *
                        </label>
                        <input
                          id="app-email"
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="field"
                        />
                      </div>
                      <div>
                        <label htmlFor="app-phone" className="field-label">
                          Phone Number *
                        </label>
                        <input
                          id="app-phone"
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+91-0000000000"
                          className="field"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="app-exp" className="field-label">
                        Years of Relevant Experience *
                      </label>
                      <input
                        id="app-exp"
                        type="text"
                        required
                        value={applicantExp}
                        onChange={(e) => setApplicantExp(e.target.value)}
                        placeholder="e.g. 6+ years"
                        className="field"
                      />
                    </div>

                    <div>
                      <label className="field-label">Resume (PDF, DOCX under 5MB) *</label>
                      <label className="border-2 border-dashed border-line hover:border-accent rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-surface/60">
                        <Upload className="w-5 h-5 text-accent mb-1" />
                        <span className="text-xs font-semibold text-foreground">
                          {resumeFileName ? resumeFileName : 'Click to attach resume document'}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label htmlFor="app-cover" className="field-label">
                        Note (Optional)
                      </label>
                      <textarea
                        id="app-cover"
                        rows={3}
                        value={applicantCover}
                        onChange={(e) => setApplicantCover(e.target.value)}
                        placeholder="Highlight relevant experience..."
                        className="field"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full btn-primary">
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <CTASection />
      </div>
    </PageTransition>
  );
};
