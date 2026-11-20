import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PageTransition } from '../components/layout/PageTransition';
import { StaffingServiceFlow } from './StaffingServiceFlow';
import type { ServiceItem } from '../types';
import './BusinessIntelligencePage.css';

const offerings = [
  { title: 'Data Analytics', icon: 'BarChart3', description: 'A suite of analytics capabilities to unlock deeper insights from your data.', points: ['Descriptive Analytics', 'Diagnostic Analytics', 'Predictive Analytics', 'Prescriptive Analytics', 'Big Data Processing', 'Self-Service BI'] },
  { title: 'Business Analytics', icon: 'PieChart', description: 'Tailored analytical services focused on real-time intelligence and visualization.', points: ['Real-Time Data Processing', 'Custom Dashboards & Reporting', 'Predictive & Prescriptive Analysis'] },
  { title: 'Cloud Services', icon: 'Cloud', description: 'Cloud management and optimization help systems perform as demand grows.', points: ['24/7 Cloud Monitoring', 'System Optimization', 'Cost Efficiency & High Availability'] },
  { title: 'Infrastructure Management', icon: 'Server', description: 'Support for maintaining secure IT environments as they scale.', points: ['IT Asset Monitoring & Maintenance', 'Scalability Planning', 'Performance Optimization'] },
  { title: 'Staffing & Workforce Solutions', icon: 'Users', description: 'Flexible staffing matched to the needs of businesses across industries.', points: ['Contract and Full-time Placement', 'Skilled Talent Sourcing (IT, Analytics, Dev, etc.)'] },
  { title: 'Digital Marketing', icon: 'Megaphone', description: 'Digital marketing strategies that help businesses build their market presence.', points: ['SEO & Content Marketing', 'Online Advertising Campaigns', 'Content Management Systems'] },
];

const videoUrl = `${import.meta.env.BASE_URL}videos/business-intelligence.mp4`;
const posterUrl = `${import.meta.env.BASE_URL}videos/business-intelligence-poster.webp`;

function BusinessIntelligenceHero({ service }: { service: ServiceItem }) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion || userPaused) {
      video.pause();
      return;
    }

    let inView = !window.IntersectionObserver;
    const updatePlayback = () => {
      if (inView && !document.hidden) {
        void video.play().catch(() => { /* The poster stays visible if autoplay is blocked. */ });
      } else {
        video.pause();
      }
    };
    const observer = window.IntersectionObserver && new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.12;
      updatePlayback();
    }, { threshold: 0.12 });

    observer?.observe(video);
    if (!observer) updatePlayback();
    document.addEventListener('visibilitychange', updatePlayback);

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      video.pause();
    };
  }, [reducedMotion, userPaused]);

  function togglePlayback() {
    if (playing) {
      videoRef.current?.pause();
      setUserPaused(true);
    } else {
      setUserPaused(false);
      void videoRef.current?.play().catch(() => { /* The poster is the manual playback fallback too. */ });
    }
  }

  return (
    <section className="bi-hero" aria-labelledby="bi-hero-title">
      <div className="bi-wrap bi-hero-content">
        <div className="bi-hero-copy">
          <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: service.title }]} />
          <p className="bi-hero-eyebrow">{service.badge}</p>
          <h1 id="bi-hero-title">{service.title}</h1>
          <p className="bi-hero-tagline">{service.tagline}</p>
          <p className="bi-hero-description">{service.fullDesc}</p>
          <div className="bi-hero-actions">
            <Link to="/contact" className="btn-primary">Schedule Consultation <ArrowRight className="arrow-shift" aria-hidden="true" /></Link>
            <a href="#capabilities" className="btn-primary">Explore Service Offerings <ArrowRight className="arrow-shift" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="bi-hero-visual">
        <div className="bi-hero-media" aria-hidden="true">
          <img src={posterUrl} alt="" width="1280" height="720" fetchPriority="high" />
          {!reducedMotion && (
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              data-visible={hasFrame}
              onPlaying={() => { setHasFrame(true); setPlaying(true); }}
              onPause={() => setPlaying(false)}
              onError={() => { setHasFrame(false); setPlaying(false); }}
            />
          )}
        </div>
        {!reducedMotion && (
          <button type="button" className="bi-media-toggle" onClick={togglePlayback} aria-label={playing ? 'Pause hero video' : 'Play hero video'}>
            {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
    </section>
  );
}

export function BusinessIntelligencePage({ service }: { service: ServiceItem }) {
  return (
    <PageTransition revealServiceText>
      <div className="bi-page">
        <BusinessIntelligenceHero service={service} />

        <StaffingServiceFlow service={service} offerings={offerings} />
      </div>
    </PageTransition>
  );
}
