import type { FC } from 'react';
import type { SliceComponentProps, JSXMapSerializer } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';
import richTextComponents from '../../components/richTextComponents';

const introComponents: JSXMapSerializer = {
  ...richTextComponents,
  paragraph: ({ children, key, ...props }) => (
    <p
      key={key}
      className="font-ABCWhyteEdu_Medium text-pMDRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
      {...props}
    >
      {children}
    </p>
  ),
  strong: ({ children, key }) => (
    <strong
      key={key}
      className="font-ABCWhyteEdu_Medium text-pMDRegular font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 "
    >
      {children}
    </strong>
  ),
  list: ({ children, key }) => (
    <ul
      key={key}
      className="font-ABCWhyteEdu_Medium mb-4 list-inside list-disc pl-0 text-pMDRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
    >
      {children}
    </ul>
  ),
  oList: ({ children, key }) => (
    <ul
      key={key}
      className="font-ABCWhyteEdu_Medium mb-4 list-inside list-decimal pl-0 text-pMDRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
    >
      {children}
    </ul>
  ),
  listItem: ({ children, key }) => (
    <li
      key={key}
      className="font-ABCWhyteEdu_Medium pl-8 -indent-[1.4rem] text-pMDRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
    >
      {children}
    </li>
  ),
  oListItem: ({ children, key }) => (
    <li
      key={key}
      className="font-ABCWhyteEdu_Medium pl-8 -indent-[1.4rem] text-pMDRegular font-normal tracking-[0.02em] text-neutral-100 dark:text-neutral-0"
    >
      {children}
    </li>
  ),
};

const TitleText: FC<
  SliceComponentProps<{
    slice_type: 'titletext';
    primary: {
      title: RichTextField;
      description: RichTextField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-8 col-start-3 text-left">
    <div className="mt-[2.875rem] lg:mt-10">
      <div className="mb-8">
        <PrismicRichText field={slice.primary.title} />
      </div>
      <PrismicRichText
        field={slice.primary.description}
        components={introComponents}
      />
    </div>
  </div>
);

export default TitleText;
