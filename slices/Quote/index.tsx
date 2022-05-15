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
  <div className="col-span-5 col-start-1 mt-20 lg:mt-32">
    <PrismicRichText field={slice.primary.title} />
  </div>
);

export default Quote;
