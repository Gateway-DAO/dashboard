'use client';

import { PropsWithChildren } from 'react';

import Slider, { Settings } from 'react-slick';

export default function FeaturedCardsContainer({
  children,
}: PropsWithChildren) {
  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return <Slider {...settings}>{children}</Slider>;
}
