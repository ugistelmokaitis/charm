import type { FC, HTMLProps, SVGAttributes } from 'react';
import { createElement } from 'react';
import type React from 'react';
import type { PrismicDocument, LinkField } from '@prismicio/types';
import { PrismicLink } from '@prismicio/react';

type ButtonInnerProps = {
  variant?: 'primary' | 'secondary' | 'neutral';
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
        'rounded py-[0.7188rem] px-[1.8175rem] bg-primary-100 text-neutral-0 outline-[0.0625rem] active:outline-[0.125rem] disabled:bg-primary-5 disabled:text-neutral-30 disabled:hover:outline-none active:outline-primary-50 outline-none hover:bg-primary-200',
      secondary:
        'rounded py-[0.7188rem] px-[1.8175rem] outline outline-[0.0625rem] hover:bg-primary-25 outline-neutral-65 active:outline-[0.125rem] active:outline-primary-200 disabled:bg-primary-5 disabled:text-neutral-30 disabled:hover:outline-none dark:bg-neutral-100 dark:hover:bg-neutral-65 dark:text-neutral-0 dark:disabled:bg-neutral-80 dark:disabled:text-neutral-50 dark:disabled:hover:outline-none dark:active:outline-neutral-15 dark:active:bg-neutral-65',
      neutral: 'text-neutral-50 dark:text-neutral-30',
    },
  };

  return (
    <button
      className={`flex items-center justify-center
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
