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
  <div className="col-span-8 col-start-3 mt-[3.75rem] sm:mt-[5.75rem]">
    <Image
      src={slice.primary.image.url ?? ''}
      alt={slice.primary.image.alt ?? ''}
      width={826}
      height={516}
      layout="responsive"
      quality={100}
      className="rounded-xl"
      priority
    />
  </div>
);

export default Fullwidthimage;
