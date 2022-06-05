import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import Image from 'next/image';

const RegularImage: FC<
  SliceComponentProps<{
    slice_type: 'regularimage';
    primary: {
      image: ImageField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-10 col-start-2 mt-[2.875rem]">
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

export default RegularImage;
