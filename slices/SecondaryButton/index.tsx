import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { KeyTextField, LinkField } from '@prismicio/types';
import Button from '../../components/button';
import { docResolver } from '../../utils/prismic';
import ArrowIcon from '../../public/icons/arrowicon.svg';

const SecondaryButton: FC<
  SliceComponentProps<{
    slice_type: 'secondarybutton';
    primary: {
      secondaryButtonLabel: KeyTextField;
      secondaryButtonLink: LinkField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-4 col-start-3 mt-[3.75rem]">
    <Button
      href={`${docResolver(slice.primary.secondaryButtonLink)}`}
      variant="secondary"
    >
      {slice.primary.secondaryButtonLabel}
      <ArrowIcon className="ml-2" />
    </Button>
  </div>
);

export default SecondaryButton;
