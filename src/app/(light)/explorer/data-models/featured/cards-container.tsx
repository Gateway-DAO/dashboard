'use client';

import { PropsWithChildren } from 'react';

import Slider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';

export default function FeaturedCardsContainer({
  children,
}: PropsWithChildren) {
  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 0,
    arrows: false,
    variableWidth: true,
  };
  return <Slider {...settings}>{children}</Slider>;
}
