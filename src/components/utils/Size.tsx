"use client";

import { useEffect } from "react";
import { useMeasure } from "react-use";

import setStyleProperty from "@/utils/setStyleProperty";

type Props = {
  name: string;
  height?: boolean;
  width?: boolean;
};

const SizeUtil = ({ name, height = false, width = false }: Props) => {
  const [el, { height: elHeight, width: elWidth }] =
    useMeasure<HTMLDivElement>();

  useEffect(() => {
    if (height) {
      setStyleProperty(`--h-${name}`, `${elHeight}px`);
    }
    if (width) {
      setStyleProperty(`--h-${name}`, `${elWidth}px`);
    }
  }, [elHeight, elWidth]);

  return (
    <div ref={el} className="invisible absolute left-0 top-0 h-full w-full" />
  );
};

export default SizeUtil;
