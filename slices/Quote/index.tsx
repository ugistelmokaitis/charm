import type { FC } from 'react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';
import type { SliceComponentProps, JSXMapSerializer } from '@prismicio/react';
import richTextComponents from '../../components/richTextComponents';

const introComponents: JSXMapSerializer = {
  ...richTextComponents,
  heading2: ({ children, key }) => (
    <h2
      key={key}
      className="ABCWhyteEdu-Medium text-5xl font-bold tracking-[0.02em] text-neutral-100 dark:text-neutral-0 sm:text-4xl lg:text-3xl"
    >
      {children}
    </h2>
  ),
};

const Quote: FC<
  SliceComponentProps<{
    slice_type: 'quote';
    primary: {
      title: RichTextField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-8 col-start-3 mt-8 sm:mt-28 lg:mt-16">
    <PrismicRichText field={slice.primary.title} components={introComponents} />
  </div>
);

export default Quote;
