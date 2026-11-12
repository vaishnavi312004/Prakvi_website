import React from 'react';
import { Link } from 'react-router-dom';

interface PrakviLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const PrakviLogo: React.FC<PrakviLogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const isLight = variant === 'light'; // Light variant is for dark backgrounds (white text)
  const textColor = isLight ? 'text-white' : 'text-[#071D3A]';
  const subtitleColor = isLight ? 'text-[#00F0FF]' : 'text-[#009EDB]';

  const scale =
    size === 'sm'
      ? { icon: 32, title: 'text-lg', subtitle: 'text-[9px]' }
      : size === 'lg'
      ? { icon: 46, title: 'text-2xl', subtitle: 'text-xs' }
      : { icon: 38, title: 'text-xl', subtitle: 'text-[10px]' };

  return (
    <Link
      to="/"
      className={`group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded-xl transition-transform active:scale-95 ${className}`}
      aria-label="Prakvi Techno Solutions Home"
    >
      {/* Precision Geometric Enterprise Monogram with Glowing Cyan Accents */}
      <div className="relative flex-shrink-0">
        <svg
          width={scale.icon}
          height={scale.icon}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
        >
          {/* Subtle outer tech perimeter */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="10"
            fill="url(#prakvi_bg_grad)"
            stroke="url(#prakvi_stroke_grad)"
            strokeWidth="1.5"
          />

          {/* Dynamic Stylized 'P' & Interlocking Quantum Nodes */}
          {/* Left Vertical Spine */}
          <rect x="12" y="10" width="5.5" height="24" rx="2.5" fill="#009EDB" />

          {/* Upper Digital Arc of 'P' */}
          <path
            d="M17.5 10H27C30.866 10 34 13.134 34 17C34 20.866 30.866 24 27 24H17.5V10Z"
            fill="url(#prakvi_node_grad)"
          />

          {/* Modern Kinetic Forward Slash Accent / Network Bridge */}
          <path
            d="M17 21L29 33"
            stroke="#00F0FF"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Focal Synchronous Quantum Node with glow */}
          <circle cx="27" cy="17" r="2.5" fill="#FFFFFF" />

          <defs>
            <linearGradient
              id="prakvi_bg_grad"
              x1="0"
              y1="0"
              x2="44"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#040E1E" />
              <stop offset="1" stopColor="#07192F" />
            </linearGradient>
            <linearGradient
              id="prakvi_stroke_grad"
              x1="0"
              y1="0"
              x2="44"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00F0FF" />
              <stop offset="1" stopColor="#009EDB" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient
              id="prakvi_node_grad"
              x1="17.5"
              y1="10"
              x2="34"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#009EDB" />
              <stop offset="1" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col tracking-tight">
        <span
          className={`font-display font-extrabold tracking-wider leading-none ${scale.title} ${textColor} transition-colors group-hover:text-white`}
        >
          PRAKVI
        </span>
        {showSubtitle && (
          <span
            className={`font-mono font-bold tracking-widest uppercase mt-1 leading-none ${scale.subtitle} ${subtitleColor} transition-colors`}
          >
            Techno Solutions
          </span>
        )}
      </div>
    </Link>
  );
};
