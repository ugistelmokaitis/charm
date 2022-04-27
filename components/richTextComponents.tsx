import type { JSXMapSerializer } from '@prismicio/react';
import { PrismicLink } from '@prismicio/react';
import Image from 'next/image';
import { docResolver } from '../utils/prismic';

const richTextComponents: JSXMapSerializer = {
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em]"
      {...props}
    >
      {children}
    </p>
  ),
  strong: ({ children, key }) => (
    <strong
      key={key}
      className="font-ABCWhyteEdu_Medium text-pLGSemiBold font-normal tracking-[0.02em]"
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
      <span className="">{children}</span>
    </PrismicLink>
  ),
  heading1: ({ children, key }) => (
    <h1
      key={key}
      className="font-ABCWhyteEdu_Heavy text-header1 font-extrabold"
    >
      {children}
    </h1>
  ),
  heading2: ({ children, key }) => (
    <h2
      key={key}
      className="font-ABCWhyteEdu_Heavy text-header2 font-extrabold"
    >
      {children}
    </h2>
  ),
  heading3: ({ children, key }) => (
    <h3
      key={key}
      className="font-ABCWhyteEdu_Heavy text-header3 font-extrabold"
    >
      {children}
    </h3>
  ),
  heading4: ({ children, key }) => (
    <h4
      key={key}
      className="text-pXLSemiBold font-ABCWhyteEdu_Medium font-semibold tracking-[0.02em]"
    >
      {children}
    </h4>
  ),
};

export default richTextComponents;
