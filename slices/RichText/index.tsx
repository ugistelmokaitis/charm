import type { FC } from 'react';
import type { SliceComponentProps, JSXMapSerializer } from '@prismicio/react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';
import richTextComponents from '../../components/richTextComponents';
import { docResolver } from '../../utils/prismic';

const introComponents: JSXMapSerializer = {
  ...richTextComponents,
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
  hyperlink: ({ children, node, key }) => (
    <PrismicLink key={key} href={docResolver(node.data)}>
      <span className="ABCWhyteEdu-Book inline text-pm3 font-[350] underline hover:text-neutral-50 dark:hover:text-neutral-80 sm:text-pm2">
        {children}
      </span>
    </PrismicLink>
  ),
  list: ({ children, key }) => (
    <ul
      key={key}
      className="font-ABCWhyteEdu_Medium text-pMDRegular mb-4 list-inside list-disc pl-0 font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
    >
      {children}
    </ul>
  ),
  oList: ({ children, key }) => (
    <ul
      key={key}
      className="font-ABCWhyteEdu_Medium text-pMDRegular mb-4 list-inside list-decimal pl-0 font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
    >
      {children}
    </ul>
  ),
  listItem: ({ children, key }) => (
    <li
      key={key}
      className="font-ABCWhyteEdu_Medium text-pMDRegular pl-8 -indent-[1.4rem] font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
    >
      {children}
    </li>
  ),
  oListItem: ({ children, key }) => (
    <li
      key={key}
      className="font-ABCWhyteEdu_Medium text-pMDRegular pl-8 -indent-[1.4rem] font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
    >
      {children}
    </li>
  ),
};

const RichText: FC<
  SliceComponentProps<{
    slice_type: 'richtext';
    primary: {
      richtext: RichTextField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-8 col-start-3">
    <div className="text-left">
      <div className="mt-[2.875rem] lg:mt-10">
        <PrismicRichText
          field={slice.primary.richtext}
          components={introComponents}
        />
      </div>
    </div>
  </div>
);

export default RichText;
