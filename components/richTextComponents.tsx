import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicLink } from '@prismicio/react';
import Image from 'next/image';
import { docResolver } from '../utils/prismic';

const richTextComponents: JSXMapSerializer = {
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="ABCWhyteEdu-Book text-pm3 font-[350] text-neutral-100 dark:text-neutral-0 sm:text-pm2"
      {...props}
    >
      {children}
    </p>
  ),
  strong: ({ children, key }) => (
    <strong
      key={key}
      className="ABCWhyteEdu-Medium text-pm3 font-medium text-neutral-100 dark:text-neutral-0 sm:text-pm2"
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
      <span className="ABCWhyteEdu-Medium inline text-pm3 font-medium underline hover:text-neutral-65 dark:hover:text-neutral-30 sm:text-pm2">
        {children}
      </span>
    </PrismicLink>
  ),
  heading1: ({ children, key }) => (
    <h1
      key={key}
      className="ABCWhyteEdu-Medium text-3xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-2xl lg:text-1xl"
    >
      {children}
    </h1>
  ),
  heading2: ({ children, key }) => (
    <h2
      key={key}
      className="ABCWhyteEdu-Medium text-4xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-3xl lg:text-2xl"
    >
      {children}
    </h2>
  ),
  heading3: ({ children, key }) => (
    <h3
      key={key}
      className="ABCWhyteEdu-Medium text-5xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-4xl lg:text-3xl"
    >
      {children}
    </h3>
  ),
  heading4: ({ children, key }) => (
    <h4
      key={key}
      className="ABCWhyteEdu-Medium text-pm1 font-medium tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-5xl lg:text-4xl"
    >
      {children}
    </h4>
  ),
  list: ({ children, key }) => (
    <ul
      key={key}
      className="ABCWhyteEdu-Book mb-4 list-inside list-disc pl-0 text-pm3 font-[350] text-neutral-100 dark:text-neutral-0 sm:text-pm2"
    >
      {children}
    </ul>
  ),
  oList: ({ children, key }) => (
    <ul
      key={key}
      className="ABCWhyteEdu-Book mb-4 list-inside list-decimal pl-0 text-pm3 font-[350] text-neutral-100 dark:text-neutral-0 sm:text-pm2"
    >
      {children}
    </ul>
  ),
  listItem: ({ children, key }) => (
    <li
      key={key}
      className="ABCWhyteEdu-Book pl-8 -indent-[1.4rem] text-pm3 font-[350] text-neutral-100 dark:text-neutral-0 sm:text-pm2 "
    >
      {children}
    </li>
  ),
  oListItem: ({ children, key }) => (
    <li
      key={key}
      className="ABCWhyteEdu-Book pl-8 -indent-[1.4rem] text-pm3 font-[350] text-neutral-100 dark:text-neutral-0 sm:text-pm2"
    >
      {children}
    </li>
  ),
};

export default richTextComponents;
