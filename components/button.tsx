import type { LinkProps } from 'next/link';
import type { FC } from 'react';
import type React from 'react';
import type { SvgrComponent } from '../index';

type ButtonProps = LinkProps & {
  href?: string;
  className?: string;
  onClick?: () => void;
  Icon?: SvgrComponent;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral';
};

const classes = {
  variant: {
    primary:
      'rounded py-[0.7188rem] px-[1.8175rem] bg-primary-100 text-neutral-0 outline-[0.0625rem] active:outline-[0.125rem] disabled:bg-primary-5 disabled:text-neutral-30 disabled:hover:outline-none active:outline-primary-50 outline-none hover:bg-primary-200',
    secondary:
      'rounded py-[0.7188rem] px-[1.8175rem] outline outline-[0.0625rem] hover:bg-primary-25 outline-neutral-65 active:outline-[0.125rem] active:outline-primary-200 disabled:bg-primary-5 disabled:text-neutral-30 disabled:hover:outline-none dark:bg-neutral-100 dark:hover:bg-neutral-65 dark:text-neutral-0 dark:disabled:bg-neutral-80 dark:disabled:text-neutral-50 dark:disabled:hover:outline-none dark:active:outline-neutral-15 dark:active:bg-neutral-65',
    neutral: 'text-neutral-50 dark:text-neutral-30',
  },
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  Icon,
  ...props
}) => (
  <a
    className={`flex items-center justify-center
    ${classes.variant[variant]} ${className}`}
    {...props}
  >
    {children}
    {Icon && <Icon />}
  </a>
);

export default Button;
