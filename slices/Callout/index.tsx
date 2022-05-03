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
      <div className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
        {slice.primary.prefix}
      </div>
    </div>
    <div className="col-span-5 col-start-1 mb-[4.375rem]">
      <div className="mb-12">
        <PrismicRichText field={slice.primary.titleFirst} />
      </div>
      <div className="mb-[3.375rem]">
        <PrismicRichText field={slice.primary.titleSecond} />
      </div>
    </div>
  </>
);

export default Callout;
