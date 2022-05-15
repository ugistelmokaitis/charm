import type { FC } from 'react';
import React, { Fragment } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { KeyTextField, RichTextField } from '@prismicio/types';

const Callout: FC<
  SliceComponentProps<{
    slice_type: 'callout';
    primary: {
      titleFirst: RichTextField;
      titleSecond: RichTextField;
      prefix?: KeyTextField;
    };
  }>
> = ({ slice }) => (
  <>
    <div className="col-span-3 col-start-1">
      <div className="mt-20 mb-6 font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100 lg:mt-32">
        {slice.primary.prefix}
      </div>
    </div>
    <div className="col-start-1 sm:col-span-7 md:mt-20 lg:mt-32 xl:col-span-5">
      <div className="mb-8">
        <PrismicRichText field={slice.primary.titleFirst} />
      </div>
      <PrismicRichText field={slice.primary.titleSecond} />
    </div>
  </>
);

export default Callout;
