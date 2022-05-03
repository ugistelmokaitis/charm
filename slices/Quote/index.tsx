import type { FC } from 'react';
import React, { Fragment } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { KeyTextField, LinkField, RichTextField } from '@prismicio/types';
import Button from '../../components/button';
import ArrowIcon from '../../public/icons/arrowIcon.svg';
import { docResolver } from '../../utils/prismic';

const Quote: FC<
  SliceComponentProps<{
    slice_type: 'quote';
    primary: {
      title: RichTextField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-5 col-start-1">
    <PrismicRichText field={slice.primary.title} />
  </div>
);

export default Quote;
