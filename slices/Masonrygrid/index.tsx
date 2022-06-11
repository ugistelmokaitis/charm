import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import Image from 'next/image';

const Masonrygrid: FC<
  SliceComponentProps<{
    slice_type: 'masonrygrid';
    primary: {
      imageOne: ImageField;
      imageTwo: ImageField;
      imageThree: ImageField;
      imageFour: ImageField;
    };
  }>
> = ({ slice }) => (
  <div className="container col-span-8  col-start-3 mt-8 sm:mt-28 lg:mt-16">
    <div className="masonry sm:masonry-sm md:masonry-md">
      <div className="break-inside pb-5">
        <div className="card-zoom">
          <div className="card-zoom-image">
            <Image
              src={slice.primary.imageOne.url ?? ''}
              alt={slice.primary.imageOne.alt ?? ''}
              width={403}
              height={480}
              layout="responsive"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
      <div className="break-inside">
        <div className="card-zoom">
          <div className="card-zoom-image">
            <Image
              src={slice.primary.imageTwo.url ?? ''}
              alt={slice.primary.imageTwo.alt ?? ''}
              width={403}
              height={480}
              layout="responsive"
              quality={100}
              priority
            />
          </div>
        </div>
      </div>
      <div className="break-inside pt-20">
        <div className="card-zoom">
          <div className="card-zoom-image">
            <Image
              src={slice.primary.imageThree.url ?? ''}
              alt={slice.primary.imageThree.alt ?? ''}
              width={403}
              height={480}
              layout="responsive"
              quality={100}
              priority
            />
          </div>
        </div>
        <div className="break-inside pt-5">
          <div className="card-zoom">
            <div className="card-zoom-image">
              <Image
                src={slice.primary.imageFour.url ?? ''}
                alt={slice.primary.imageFour.alt ?? ''}
                width={403}
                height={480}
                layout="responsive"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Masonrygrid;
