import type { LinkProps } from '@prismicio/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';

const InternalLinkComponent: FC<LinkProps> = ({ children, href, ...props }) => {
  const { asPath } = useRouter();
  const active = asPath === href;

  return (
    <Link href={href} passHref>
      <a href={href} className={active ? '' : ''} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default InternalLinkComponent;
