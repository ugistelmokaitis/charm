import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import Image from 'next/image';

const Fullwidthimage: FC<
  SliceComponentProps<{
    slice_type: 'fullwidthimage';
    primary: {
      image: ImageField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-8 col-start-3 mt-8 sm:mt-28 lg:mt-16">
    <Image
      src={slice.primary.image.url ?? ''}
      alt={slice.primary.image.alt ?? ''}
      width={1248}
      height={650}
      layout="responsive"
      quality={100}
      priority
    />
  </div>
);

export default Fullwidthimage;
