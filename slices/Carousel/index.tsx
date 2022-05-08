import type { FC } from 'react';
import React, { Fragment, useRef, useState } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { ImageField } from '@prismicio/types';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import Button from '../../components/button';
import ArrowIcon from '../../public/icons/arrowIcon.svg';
import { docResolver } from '../../utils/prismic';
import CarouselLeftIcon from '../../public/icons/carouselLeft.svg';
import CarouselRightIcon from '../../public/icons/carouselRight.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Container from '../../components/container';

const Carousel: FC<
  SliceComponentProps<{
    slice_type: 'content';
    items: {
      carouselImage: ImageField;
    }[];
  }>
> = ({ slice }) => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  {
    console.log(slice.items.index, 'Carousel');
  }
  return (
    <div className="container col-span-12 col-start-1 mt-20 mb-20 self-center justify-self-center">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 9900,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[650px] w-full bg-neutral-100"
      >
        {slice.items.map((carouselImage, index) => (
          <div key={index}>
            <SwiperSlide>
              <Image
                src={carouselImage.carouselImage.url ?? ''}
                alt={carouselImage.carouselImage.alt ?? ''}
                width={1480}
                height={650}
                layout="fixed"
                quality={100}
              />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
