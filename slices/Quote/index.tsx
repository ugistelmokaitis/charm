import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';

const Quote: FC<
  SliceComponentProps<{
    slice_type: 'quote';
    primary: {
      title: RichTextField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-8 col-start-3 mt-8 sm:mt-28 lg:mt-16">
    <PrismicRichText field={slice.primary.title} />
  </div>
);

export default Quote;
