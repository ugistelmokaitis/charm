import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import ArrowLeft from '../../public/icons/carouselleft.svg';
import ArrowRight from '../../public/icons/carouselright.svg';

const Carousel: FC<
  SliceComponentProps<{
    slice_type: 'content';
    items: {
      carouselImage: ImageField;
    }[];
  }>
> = ({ slice }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    loop: false,
    dragFree: false,
    draggable: true,
    align: 'start',
  });

  return (
    <div className="container col-start-1 mt-20 self-center justify-self-center md:col-span-12">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slice.items.map((carouselImage, index) => (
            <div className="embla__slide" key={index}>
              <Image
                src={carouselImage.carouselImage.url ?? ''}
                alt={carouselImage.carouselImage.alt ?? ''}
                width={1480}
                height={650}
                layout="responsive"
                quality={100}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-8 pt-6">
        <div
          className="rounded-full border border-neutral-30 bg-neutral-0 p-3 transition-all hover:bg-neutral-15 dark:border-neutral-50 dark:bg-neutral-100 dark:hover:bg-neutral-80 lg:p-[1.3125rem]"
          onClick={() => emblaApi?.scrollPrev()}
          onKeyDown={() => emblaApi?.scrollPrev()}
          role="button"
          tabIndex={0}
        >
          <ArrowLeft className="text-neutral-100 dark:text-neutral-0" />
        </div>
        <div
          className="rounded-full border border-neutral-30 bg-neutral-0 p-3 transition-all hover:bg-neutral-15 dark:border-neutral-50 dark:bg-neutral-100 dark:hover:bg-neutral-80 lg:p-[1.3125rem]"
          onClick={() => emblaApi?.scrollNext()}
          onKeyDown={() => emblaApi?.scrollNext()}
          role="button"
          tabIndex={0}
        >
          <ArrowRight className="text-neutral-100 dark:text-neutral-0" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
