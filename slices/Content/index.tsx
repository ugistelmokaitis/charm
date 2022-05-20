import type { FC } from 'react';
import React, { Fragment } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { KeyTextField, LinkField, RichTextField } from '@prismicio/types';
import Button from '../../components/button';
import ArrowIcon from '../../public/icons/arrowicon.svg';
import { docResolver } from '../../utils/prismic';

const Content: FC<
  SliceComponentProps<{
    slice_type: 'content';
    primary: {
      descriptionFirstPart: KeyTextField;
      descriptionSecondPart: KeyTextField;
      primaryButtonLabel: KeyTextField;
      primaryButtonLink: LinkField;
      title: RichTextField;
      prefix?: KeyTextField;
    };
  }>
> = ({ slice }) => (
  <>
    <div className="col-span-3 col-start-1">
      <div className="inline-block">
        <div className="mb-6 mt-20 font-FiraCode-SemiBold text-codeMDSemiBold font-semibold text-primary-100 dark:text-blue-100 lg:mt-32">
          {slice.primary.prefix}
        </div>
      </div>
    </div>
    <div className="col-span-6 col-start-6 lg:mt-32">
      <PrismicRichText field={slice.primary.title} />
      <div className="mt-20 font-ABCWhyteEdu-Regular text-pSMRegular font-normal tracking-[0.02em] text-neutral-65 dark:text-neutral-15 md:text-pLGRegular">
        {slice.primary.descriptionFirstPart}
        <div className="mt-8 font-ABCWhyteEdu-Regular text-pSMRegular font-normal tracking-[0.02em] text-neutral-65 dark:text-neutral-15 md:text-pLGRegular">
          {slice.primary.descriptionSecondPart}
        </div>
      </div>
    </div>
    <div className="col-span-4 col-start-6 mt-20 max-w-[15.875rem] md:col-span-4 md:col-start-6">
      <Button
        href={`${docResolver(slice.primary.primaryButtonLink)}`}
        variant="secondary"
      >
        {slice.primary.primaryButtonLabel}
        <ArrowIcon className="ml-2" />
      </Button>
    </div>
  </>
);

export default Content;
