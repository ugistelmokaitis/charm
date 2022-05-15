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
  <div className="col-span-12 col-start-2 mt-20 lg:mt-32">
    <Image
      src={slice.primary.image.url ?? ''}
      alt={slice.primary.image.alt ?? ''}
      width={1248}
      height={650}
      layout="responsive"
      quality={100}
    />
  </div>
);

export default Fullwidthimage;
