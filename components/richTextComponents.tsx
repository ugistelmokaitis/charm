import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicLink } from '@prismicio/react';
import Image from 'next/image';
import { docResolver } from '../utils/prismic';

const richTextComponents: JSXMapSerializer = {
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="font-ABCWhyteEdu-Regular text-pSMRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-pLGRegular"
      {...props}
    >
      {children}
    </p>
  ),
  strong: ({ children, key }) => (
    <strong
      key={key}
      className="font-ABCWhyteEdu-Medium text-pSMSemiBold font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-pLGSemiBold "
    >
      {children}
    </strong>
  ),
  image: ({ key, node }) => (
    <Image
      key={key}
      src={node.url}
      alt={node.alt ?? ''}
      width={node.dimensions.width}
      height={node.dimensions.height}
      quality={100}
    />
  ),
  hyperlink: ({ children, node, key }) => (
    <PrismicLink key={key} href={docResolver(node.data)}>
      <span className="inline font-ABCWhyteEdu-Regular text-pSMRegular font-normal tracking-[0.02em] underline hover:text-neutral-50 dark:hover:text-neutral-30 md:text-pLGRegular ">
        {children}
      </span>
    </PrismicLink>
  ),
  heading1: ({ children, key }) => (
    <h1
      key={key}
      className="font-ABCWhyteEdu-Heavy text-4xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-2xl md:text-1xl"
    >
      {children}
    </h1>
  ),
  heading2: ({ children, key }) => (
    <h2
      key={key}
      className="font-ABCWhyteEdu-Heavy text-4xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 md:text-2xl"
    >
      {children}
    </h2>
  ),
  heading3: ({ children, key }) => (
    <h3
      key={key}
      className="md:3xl font-ABCWhyteEdu-Heavy text-5xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-4xl"
    >
      {children}
    </h3>
  ),
  heading4: ({ children, key }) => (
    <h4
      key={key}
      className="font-ABCWhyteEdu-Medium text-pSMSemiBold font-semibold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-pLGSemiBold md:text-4xl"
    >
      {children}
    </h4>
  ),
  heading5: ({ children, key }) => (
    <h5
      key={key}
      className="font-ABCWhyteEdu-Medium text-pSMSemiBold font-semibold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-pLGSemiBold md:text-5xl"
    >
      {children}
    </h5>
  ),
};

export default richTextComponents;
