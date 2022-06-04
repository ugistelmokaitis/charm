import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import Image from 'next/image';

const Geometry: FC<
  SliceComponentProps<{
    slice_type: 'geometry';
    primary: {
      image: ImageField;
    };
  }>
> = ({ slice }) => (
  <div className="col-span-12 col-start-2 mt-20 lg:mt-32">
    <Image
      src={slice.primary.image.url ?? ''}
      alt={slice.primary.image.alt ?? ''}
      width={93}
      height={13}
      layout="fixed"
      quality={100}
      className="dark:brightness-0 dark:invert-[1]"
    />
  </div>
);

export default Geometry;
