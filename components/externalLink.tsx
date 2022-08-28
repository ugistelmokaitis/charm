import type { LinkProps } from '@prismicio/react';
import Link from 'next/link';
import type { FC } from 'react';

const ExternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => (
  <Link href={href}>
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </Link>
);

export default ExternalLinkComponent;
