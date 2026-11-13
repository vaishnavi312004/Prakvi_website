import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark';
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, variant = 'light' }) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-muted' : 'text-muted';
  const activeColor = isLight ? 'text-accent font-semibold' : 'text-foreground font-semibold';

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs">
        <li className="flex items-center">
          <Link
            to="/"
            className={`flex items-center gap-1 ${textColor} hover:text-accent transition-colors`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className={`w-3.5 h-3.5 ${textColor} opacity-60 flex-shrink-0`} />
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className={`${textColor} hover:text-accent transition-colors`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={activeColor} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
