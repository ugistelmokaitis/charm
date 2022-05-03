import type { FC } from 'react';
import React, { Fragment } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { KeyTextField, LinkField, RichTextField } from '@prismicio/types';
import Button from '../../components/button';
import ArrowIcon from '../../public/icons/arrowIcon.svg';
import { docResolver } from '../../utils/prismic';

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
        <div className="font-FiraCode_SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100">
          {slice.primary.prefix}
        </div>
      </div>
    </div>
    <div className="col-span-6 col-start-6">
      <PrismicRichText field={slice.primary.title} />
      <div className="mb-[4.5625rem] mt-20 font-ABCWhyteEdu_Regular text-pLGRegular font-normal tracking-[0.02em] text-neutral-65 dark:text-neutral-15">
        {slice.primary.content}
      </div>
    </div>
  </>
);

export default Keywords;
