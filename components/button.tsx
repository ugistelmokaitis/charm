import type { FC, HTMLProps, SVGAttributes } from 'react';
import { createElement } from 'react';
import type React from 'react';
import type { PrismicDocument, LinkField } from '@prismicio/types';
import { PrismicLink } from '@prismicio/react';

type ButtonInnerProps = {
  variant?: 'primary' | 'secondary' | 'neutral' | 'casestudy';
  className?: string;
  icon?: FC<SVGAttributes<SVGElement>>;
} & HTMLProps<HTMLButtonElement>;

type ButtonProps = {
  href?: string | null | undefined;
  document?: PrismicDocument | null | undefined;
  field?: LinkField | null | undefined;
} & ButtonInnerProps;

const ButtonInner: FC<ButtonInnerProps> = ({
  variant = 'primary',
  className = '',
  icon,
  children,
  ...props
}) => {
  const classes = {
    variant: {
      primary:
        'rounded-[0.25rem] py-[0.7188rem] px-[1.8175rem] bg-primary-100 text-neutral-0 border-[0.0625rem] active:border-[0.125rem] disabled:bg-primary-5 disabled:text-neutral-30 disabled:hover:border-none active:border-primary-50 border-none hover:bg-primary-200',
      secondary:
        'rounded-[0.25rem] py-[0.7188rem] px-[1.8175rem] border-[0.0625rem] hover:bg-primary-25 border-neutral-65 active:border-[0.125rem] active:border-primary-200 disabled:bg-primary-5 disabled:text-neutral-30 disabled:hover:border-none dark:bg-neutral-100 dark:hover:bg-neutral-65 dark:text-neutral-0 dark:disabled:bg-neutral-80 dark:disabled:text-neutral-50 dark:disabled:hover:border-none dark:active:border-neutral-15 dark:active:bg-neutral-65',
      neutral: 'text-neutral-50 dark:text-neutral-30',
      casestudy:
        'className="ABCWhyteEdu-Bold text-4xl sm:text-3xl md:text-2xl font-medium tracking-[0.02em] text-neutral-65 underline decoration-2 underline-offset-[12px] hover:decoration-[0.25rem] active:text-neutral-0 dark:text-neutral-0 md:text-2xl hover:text-neutral-65 dark:hover:text-neutral-30',
    },
  };

  return (
    <button
      className={`flex items-center justify-center rounded-[0.25rem]
      ${classes.variant[variant]} ${className}`}
      {...props}
      aria-label="Button"
      type="button"
    >
      {children}
      {icon && <span className="ml-2"> {createElement(icon)}</span>}
    </button>
  );
};

const Button: FC<ButtonProps> = ({ href, field, document, ...props }) => {
  if (href) {
    return (
      <PrismicLink href={href}>
        <ButtonInner {...props} />
      </PrismicLink>
    );
  }

  if (document) {
    return (
      <PrismicLink document={document}>
        <ButtonInner {...props} />
      </PrismicLink>
    );
  }

  if (field) {
    return (
      <PrismicLink field={field}>
        <ButtonInner {...props} />
      </PrismicLink>
    );
  }

  return <ButtonInner {...props} />;
};

export default Button;
