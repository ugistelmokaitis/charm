import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';

const Legal: FC<
  SliceComponentProps<{
    slice_type: 'content';
    primary: {
      title?: RichTextField;
      subtitle?: RichTextField;
      description: RichTextField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-8 col-start-3">
    <div className="col-span-6 col-start-2">
      {slice.primary.title && (
        <div className="pb-8 pt-12">
          <PrismicRichText field={slice.primary.title} />
        </div>
      )}

      <PrismicRichText field={slice.primary.subtitle} />

      <div className="pt-4">
        <PrismicRichText field={slice.primary.description} />
      </div>
    </div>
  </div>
);

export default Legal;
