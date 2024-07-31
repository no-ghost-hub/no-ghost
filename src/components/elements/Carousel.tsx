"use client";

import { useRef, FC, ReactNode, useEffect } from "react";
import Swiper from "swiper";

import "swiper/css";

type Props = { children: ReactNode };

const Component: FC<Props> = ({ children }) => {
  const swiperEl = useRef<HTMLDivElement | null>(null);
  const swiper = useRef<Swiper | null>(null);

  useEffect(() => {
    if (swiperEl.current) {
      swiper.current = new Swiper(swiperEl.current, {
        slidesPerView: 2.5,
        spaceBetween: 16,
      });
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
