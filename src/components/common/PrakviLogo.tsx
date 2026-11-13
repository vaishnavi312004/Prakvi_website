import React from 'react';
import { Link } from 'react-router-dom';

interface PrakviLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const PrakviLogo: React.FC<PrakviLogoProps> = ({ size = 'md', className = '' }) => (
  <Link to="/" aria-label="Prakvi Techno Solutions Private Limited home"
    className={`inline-flex shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}>
    <img src="/img/prakvi-logo.png" alt="Prakvi Techno Solutions Private Limited"
      width="630" height="143"
      className={`block h-auto object-contain ${size === 'sm' ? 'w-[180px]' : size === 'lg' ? 'w-[280px]' : 'w-[200px] sm:w-[230px] xl:w-[250px]'}`} />
  </Link>
);
