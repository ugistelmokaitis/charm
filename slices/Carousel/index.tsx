import type { FC } from 'react';
import React, { Fragment } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Button from '../../components/button';
import ArrowIcon from '../../public/icons/arrowIcon.svg';
import { docResolver } from '../../utils/prismic';
import CarouselLeftIcon from '../../public/icons/carouselLeft.svg';
import CarouselRightIcon from '../../public/icons/carouselRight.svg';

const Carousel: FC<
  SliceComponentProps<{
    slice_type: 'content';
    primary: {
      carouselImageFirst: ImageField;
      carouselImageSecond: ImageField;
      carouselImageThird: ImageField;
      carouselImageFourth: ImageField;
    };
  }>
> = ({ slice }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    loop: false,
    dragFree: false,
    draggable: false,
    align: 'start',
  });
  return (
    <>
      <div className="col-span-1 col-start-1 self-center justify-self-center">
        <div
          // if statIndex is 0, show
          className="rounded-full border border-neutral-30 bg-neutral-50 p-4 transition-all hover:bg-neutral-30  dark:border-neutral-0 dark:bg-neutral-15 dark:hover:bg-neutral-30"
          onClick={() => emblaApi?.scrollPrev()}
          onKeyDown={() => emblaApi?.scrollPrev()}
          role="button"
          tabIndex={0}
        >
          <span className="bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-white dark:group-focus:ring-gray-800/70 inline-flex h-8 w-8 items-center justify-center rounded-full group-focus:outline-none group-focus:ring-4 sm:h-10 sm:w-10">
            <CarouselLeftIcon className="h-6 w-6" />
          </span>
        </div>
      </div>
      <div className="col-span-11 col-start-2 mb-[8.0625rem]">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            <div className="relative flex-[0_0_100%]">
              <Image
                src={slice.primary.carouselImageFirst.url ?? ''}
                alt={slice.primary.carouselImageFirst.alt ?? ''}
                width={1248}
                height={650}
                layout="responsive"
                quality={100}
              />
            </div>
            <div className="relative flex-[0_0_100%]">
              <Image
                src={slice.primary.carouselImageSecond.url ?? ''}
                alt={slice.primary.carouselImageSecond.alt ?? ''}
                width={1248}
                height={650}
                layout="responsive"
                quality={100}
              />
            </div>
            <div className="relative flex-[0_0_100%]">
              <Image
                src={slice.primary.carouselImageThird.url ?? ''}
                alt={slice.primary.carouselImageThird.alt ?? ''}
                width={1248}
                height={650}
                layout="responsive"
                quality={100}
              />
            </div>

            <div className="relative flex-[0_0_100%]">
              <Image
                src={slice.primary.carouselImageFourth.url ?? ''}
                alt={slice.primary.carouselImageFourth.alt ?? ''}
                width={1248}
                height={650}
                layout="responsive"
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-13 col-start-13 self-center justify-self-center">
        <div
          className="rounded-full border border-neutral-30 bg-neutral-50 p-4 transition-all hover:bg-neutral-30  dark:border-neutral-0 dark:bg-neutral-15 dark:hover:bg-neutral-30"
          onClick={() => emblaApi?.scrollNext()}
          onKeyDown={() => emblaApi?.scrollNext()}
          role="button"
          tabIndex={0}
        >
          <span className="bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-white dark:group-focus:ring-gray-800/70 inline-flex h-8 w-8 items-center justify-center rounded-full group-focus:outline-none group-focus:ring-4 sm:h-10 sm:w-10">
            <CarouselRightIcon className="h-6 w-6" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Carousel;
