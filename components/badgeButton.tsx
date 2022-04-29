import type { FC } from 'react';
import type React from 'react';
import type { LinkProps } from 'next/link';
import RightArrowIcon from '../public/icons/rightArrowIcon.svg';

type BadgeButtonProps = LinkProps & {
  href: string;
  child1: React.ReactNode;
  child2: React.ReactNode;
};

const TagButton: FC<BadgeButtonProps> = ({ child1, child2, ...props }) => (
  <a
    className="inline-flex items-center justify-between rounded-full bg-primary-25 py-1 px-1 pr-4 hover:bg-primary-50 dark:bg-neutral-65 dark:hover:bg-neutral-50"
    {...props}
  >
    <span className="mr-3 rounded-full bg-primary-100 px-4 py-1 text-neutral-0">
      {child1}
    </span>
    <span className="text-neutral-100 dark:text-neutral-0">{child2}</span>
    <div className="ml-4">
      <RightArrowIcon />
    </div>
  </a>
);

export default TagButton;
