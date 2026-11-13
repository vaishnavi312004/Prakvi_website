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
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">

        <section className="bg-gradient-to-b from-canvas via-surface to-canvas text-foreground py-section relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/img/careers_culture_team_1794479543837.jpg"
              alt="Prakvi Corporate Culture"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/90 to-canvas/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/80" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Careers & Opportunities' }]} variant="light" />

            <div className="mt-8 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white/[0.04] px-3.5 py-1.5">
                <span className="w-2 h-2 rounded-full bg-accent shadow-accent" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
                  People, Culture & Growth
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                Build What's Next With Us.
              </h1>

              <p className="mt-6 text-base sm:text-xl text-muted leading-relaxed text-balance font-light">
                Join a multidisciplinary team of cloud architects, staffing strategists, data engineers, and problem solvers. We cultivate autonomy, sponsored certifications, and impactful global enterprise projects.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#open-positions"
                  className="btn-primary"
                >
                  <span>View {jobsData.length} Open Positions</span>
                  <ArrowRight className="w-4 h-4 text-foreground" />
                </a>
                <a
                  href="#culture"
                  className="btn-secondary"
                >
                  <span>Life at Prakvi</span>
                </a>
              </div>
            </div>
          </div>
        </section>


        <div id="culture" className="relative bg-canvas text-foreground border-t border-line">
          <section className="py-section lg:py-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Employee Experience"
                title="Why Engineers & Practice Leaders Flourish at Prakvi"
                description="We believe technical excellence thrives when people feel supported, intellectually challenged, and fairly rewarded."
                theme="light"
              />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-7 rounded-3xl glass-panel border border-line  hover:shadow-accent transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl glass-panel border border-accent/25 text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-foreground transition-all">
                      {i === 0 && <GraduationCap className="w-6 h-6" />}
                      {i === 1 && <HeartPulse className="w-6 h-6" />}
                      {i === 2 && <Laptop className="w-6 h-6" />}
                      {i === 3 && <BadgePercent className="w-6 h-6" />}
                      {i === 4 && <Globe2 className="w-6 h-6" />}
                      {i === 5 && <Users className="w-6 h-6" />}
                    </div>
                    <h4 className="font-display text-base font-bold text-foreground mb-2">
                      {b.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>


          <section className="py-section bg-gradient-to-b from-canvas via-surface to-canvas text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Hiring Journey"
                title="Our Transparent Recruitment Process"
                description="Respectful, streamlined, and centered on real-world engineering discussions rather than puzzle-based whiteboard tests."
                theme="dark"
                align="center"
              />

              {/* Connected Timeline */}
              <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-5 relative">
                {recruitmentSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-canvas/90 border border-accent/25 shadow-lg relative flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 text-accent font-mono font-bold text-xs flex items-center justify-center mb-4">
                        {step.step}
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-white/10 text-[10px] font-mono text-accent font-semibold">
                      Stage 0{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          <section id="open-positions" className="py-section bg-surface text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                    Live Positions
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                    Current Opportunities at Prakvi
                  </h2>
                  <p className="text-xs sm:text-sm text-muted mt-1">
                    Showing {filteredJobs.length} of {jobsData.length} active requisitions across engineering, consulting, and staffing.
                  </p>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="bg-canvas p-5 rounded-3xl border border-line shadow-sm mb-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Keyword Search */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search role, stack, or skill..."
                      className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl border border-line text-sm text-foreground placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  {/* Department Filter */}
                  <div>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="w-full px-4 py-2.5 bg-surface rounded-xl border border-line text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
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
                      className="w-full px-4 py-2.5 bg-surface rounded-xl border border-line text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
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
                      className="w-full px-4 py-2.5 bg-surface rounded-xl border border-line text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    >
                      <option value="All">All Employment Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Contract">Contract</option>
                      <option value="C2H">Contract to Hire</option>
                    </select>
                  </div>
                </div>

                {(searchTerm || selectedDept !== 'All' || selectedLocation !== 'All' || selectedType !== 'All') && (
                  <div className="flex items-center justify-between pt-3 border-t border-line text-xs">
                    <span className="text-muted">Active filters applied</span>
                    <button
                      onClick={clearFilters}
                      className="text-accent hover:underline font-semibold"
                    >
                      Reset all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Job Listings Cards in White Cards with Soft Shadow */}
              {filteredJobs.length === 0 ? (
                <div className="text-center py-16 bg-canvas rounded-3xl border border-line space-y-3">
                  <Briefcase className="w-10 h-10 text-muted mx-auto" />
                  <h3 className="font-display text-base font-bold text-foreground">
                    No Positions Matching Current Filter
                  </h3>
                  <p className="text-xs text-muted max-w-sm mx-auto">
                    Try adjusting your search criteria or submit a general inquiry to our talent team.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-secondary"
                  >
                    Clear Search Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-6 sm:p-7 rounded-3xl glass-panel border border-line  hover:shadow-accent transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-semibold text-accent">
                            {job.department}
                          </span>
                          <span className="text-muted">·</span>
                          <span className="text-muted">
                            {job.locationType}
                          </span>
                          <span className="text-muted">·</span>
                          <span className="text-muted">
                            {job.employmentType}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-foreground">
                          {job.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
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

                      {/* Actions */}
                      <div className="flex sm:flex-col lg:flex-row items-center gap-3 shrink-0">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="px-5 py-3 rounded-xl text-xs font-semibold text-foreground bg-surface hover:bg-surface border border-line transition-colors"
                        >
                          View Specs
                        </button>

                        <button
                          onClick={() => setApplyingJob(job)}
                          className="px-6 py-3 rounded-xl text-xs font-bold text-foreground bg-canvas hover:bg-accent shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
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
          <div data-lenis-prevent className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 bg-canvas/80 backdrop-blur-md animate-fade-in">
            <div data-lenis-prevent className="glass-panel max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl max-w-2xl w-full p-6 sm:p-8  relative border border-line max-h-[90vh] overflow-y-auto text-foreground">
              <button
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
                  <ul className="space-y-1.5 text-xs text-muted">
                    {selectedJob.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
                    Qualifications & Stack
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted">
                    {selectedJob.qualifications.map((q, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-muted hover:text-foreground"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const j = selectedJob;
                      setSelectedJob(null);
                      setApplyingJob(j);
                    }}
                    className="btn-primary"
                  >
                    Proceed to Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. APPLICATION SUBMISSION MODAL */}
        {applyingJob && (
          <div data-lenis-prevent className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 bg-canvas/80 backdrop-blur-md animate-fade-in">
            <div data-lenis-prevent className="glass-panel rounded-3xl max-w-lg w-full p-6 sm:p-8  relative border border-line max-h-[90vh] overflow-y-auto text-foreground">
              <button
                onClick={() => setApplyingJob(null)}
                className="absolute top-4 right-4 p-2 text-muted hover:text-foreground rounded-xl hover:bg-surface transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Application Submitted!
                  </h3>
                  <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{applicantName}</strong>. Your profile for <strong>{applyingJob.title}</strong> has been routed to our recruitment leadership. We will contact you at <strong>{applicantEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <div className="border-b border-line pb-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                      Direct Enterprise Application
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-foreground mt-1">
                      {applyingJob.title}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      {applyingJob.department} • {applyingJob.location}
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-300">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-foreground mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-line text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-foreground mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-line text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-foreground mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-line text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-foreground mb-1">
                        Years of Relevant Experience *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantExp}
                        onChange={(e) => setApplicantExp(e.target.value)}
                        placeholder="e.g. 6+ years in AWS / Kubernetes"
                        className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-line text-sm text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    {/* Resume Upload Box */}
                    <div>
                      <label className="block font-semibold text-foreground mb-1">
                        Resume Attachment (PDF, DOCX under 5MB) *
                      </label>
                      <label className="border-2 border-dashed border-line hover:border-accent rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-surface">
                        <Upload className="w-5 h-5 text-accent mb-1" />
                        <span className="text-xs font-semibold text-foreground">
                          {resumeFileName ? resumeFileName : 'Click to select resume document'}
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
                      <label className="block font-semibold text-foreground mb-1">
                        Note / Cover Memo (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={applicantCover}
                        onChange={(e) => setApplicantCover(e.target.value)}
                        placeholder="Highlight specific systems or leadership accomplishments..."
                        className="w-full px-3.5 py-2 bg-surface rounded-xl border border-line text-xs text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full btn-primary"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 7. CTA */}
        <CTASection
          title="Looking for a Customized Role or Practice Leadership?"
          subtitle="We welcome confidential exploratory conversations with principal engineers, cloud architects, and staffing leaders."
        />
      </div>
    </PageTransition>
  );
};
