"use client";

import { useRef, ReactNode, useEffect } from "react";
import Swiper from "swiper";
import { Mousewheel } from "swiper/modules";

import "swiper/css";

import { SwiperOptions } from "swiper/types";

type Props = { children: ReactNode; theme?: string };

const Component: React.FC<Props> = ({ children, theme = "default" }) => {
  const swiperEl = useRef<HTMLDivElement | null>(null);
  const swiper = useRef<Swiper | null>(null);

  const options: Record<string, SwiperOptions> = {
    default: {},
    quotes: {
      modules: [Mousewheel],
      mousewheel: {
        enabled: true,
      },
      slidesPerView: "auto",
      spaceBetween: 20,
      grabCursor: true,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20,
      breakpoints: {
        600: {
          slidesOffsetBefore: 72,
          slidesOffsetAfter: 72,
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
