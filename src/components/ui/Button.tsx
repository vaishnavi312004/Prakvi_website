import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'blue' | 'secondary';
const styles = (variant: Variant, className = '') => `btn-${variant} ${className}`;

export const Button = ({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) => (
  <button type={type} className={styles(variant, className)} {...props} />
);

export const ButtonLink = ({
  variant = 'primary',
  className,
  ...props
}: LinkProps & { variant?: Variant }) => (
  <Link className={styles(variant, className)} {...props} />
);
