import type { FC } from 'react';
import React, { Fragment } from 'react';
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
  <div className="container col-span-12  col-start-1 mt-20 mb-20 ">
    <div className="masonry sm:masonry-sm md:masonry-md">
      <div className="break-inside pb-8">
        <div className="card-zoom">
          <div className="card-zoom-image">
            <Image
              src={slice.primary.imageOne.url ?? ''}
              alt={slice.primary.imageOne.alt ?? ''}
              width={614}
              height={650}
              layout="responsive"
              quality={100}
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
              width={614}
              height={650}
              layout="responsive"
              quality={100}
            />
          </div>
        </div>
      </div>
      <div className="break-inside pt-40">
        <div className="card-zoom">
          <div className="card-zoom-image">
            <Image
              src={slice.primary.imageThree.url ?? ''}
              alt={slice.primary.imageThree.alt ?? ''}
              width={614}
              height={650}
              layout="responsive"
              quality={100}
            />
          </div>
        </div>
        <div className="break-inside pt-8">
          <div className="card-zoom">
            <div className="card-zoom-image">
              <Image
                src={slice.primary.imageFour.url ?? ''}
                alt={slice.primary.imageFour.alt ?? ''}
                width={614}
                height={650}
                layout="responsive"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Masonrygrid;
