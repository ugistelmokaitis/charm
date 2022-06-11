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
    <div className="container mt-8 self-center justify-self-center sm:mt-28 md:col-span-12 md:col-start-1 lg:mt-16">
      <div ref={emblaRef}>
        <div className="flex gap-8 ">
          {slice.items.map(({ carouselImage }, index) => (
            <div
              key={index}
              className="relative flex w-full max-w-[510px] flex-shrink-0 flex-grow-0 flex-col "
            >
              <div className="flex flex-col overflow-hidden transition-all">
                <Image
                  src={carouselImage.url ?? ''}
                  alt={carouselImage.alt ?? ''}
                  width={510}
                  height={344}
                  layout="fixed"
                  quality={100}
                  priority
                />
              </div>
            </div>
          ))}
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
    </div>
  );
};

export default Carousel;
