import type { FC } from 'react';
import type { SliceComponentProps, JSXMapSerializer } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';
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

const Content: FC<
  SliceComponentProps<{
    slice_type: 'content';
    primary: {
      title: RichTextField;
      content: RichTextField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-8 col-start-3">
    <div className="col-span-6 col-start-2 mt-[3.75rem] sm:mt-[5.75rem]">
      <PrismicRichText
        field={slice.primary.title}
        components={introComponents}
      />
      <div className="mt-8">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </div>
  </div>
);

export default Content;
