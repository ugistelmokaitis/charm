import type { FC } from 'react';
import React, { Fragment } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { KeyTextField, RichTextField } from '@prismicio/types';

const Keywords: FC<
  SliceComponentProps<{
    slice_type: 'keywords';
    primary: {
      prefix?: KeyTextField;
      title: RichTextField;
      content: KeyTextField;
    };
  }>
> = ({ slice }) => (
  <>
    <div className="col-span-3 col-start-1">
      <div className="inline-block">
        <div className="mt-20 mb-6 font-FiraCode-SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100 lg:mt-32">
          {slice.primary.prefix}
        </div>
      </div>
    </div>
    <div className="col-span-6 col-start-6 lg:mt-32">
      <PrismicRichText field={slice.primary.title} />
      <div className="mt-20 font-ABCWhyteEdu-Regular text-pSMRegular font-normal tracking-[0.02em] text-neutral-65 dark:text-neutral-15 md:text-pLGRegular">
        {slice.primary.content}
      </div>
    </div>
  </>
);

export default Keywords;
