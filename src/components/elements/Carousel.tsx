"use client";

import { useRef, FC, ReactNode, useEffect } from "react";
import Swiper from "swiper";

import "swiper/css";

import { SwiperOptions } from "swiper/types";

type Props = { children: ReactNode; theme?: string };

const Component: React.FC<Props> = ({ children, theme = "default" }) => {
  const swiperEl = useRef<HTMLDivElement | null>(null);
  const swiper = useRef<Swiper | null>(null);

  const options: Record<string, SwiperOptions> = {
    default: {},
    quotes: {
      slidesPerView: 1.25,
      spaceBetween: 20,
      grabCursor: true,
      breakpoints: {
        600: {
          slidesPerView: 2.5,
        },
      },
    },
  };

  useEffect(() => {
    if (swiperEl.current) {
      swiper.current = new Swiper(swiperEl.current, options[theme]);
    }

    return () => {
      swiper.current?.destroy();
    };
  }, []);

  return (
    <div ref={swiperEl} className="swiper w-full">
      <div className="swiper-wrapper">{children}</div>
    </div>
  );
};

export default Component;
