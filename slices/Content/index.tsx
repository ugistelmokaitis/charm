import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';

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
    <div className="col-span-6 col-start-2 mt-8 sm:mt-28 lg:mt-16">
      <PrismicRichText field={slice.primary.title} />
      <PrismicRichText field={slice.primary.content} />
    </div>
  </div>
);

export default Content;
