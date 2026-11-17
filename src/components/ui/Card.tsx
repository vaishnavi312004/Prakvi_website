import React, { useId } from 'react';

export const Card = ({ interactive = false, className = '', ...props }: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) => (
  <div className={`glass-panel ${interactive ? 'glass-card' : ''} ${className}`} {...props} />
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };
export const Input = ({ label, error, id, className = '', ...props }: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  return <div>
    <label htmlFor={inputId} className="field-label">{label}</label>
    <input id={inputId} className={`field ${className}`} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} {...props} />
    {error && <p id={`${inputId}-error`} className="field-error" role="alert">{error}</p>}
  </div>;
};
