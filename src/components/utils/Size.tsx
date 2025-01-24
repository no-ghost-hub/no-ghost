"use client";

import { useMeasure, useDebounce } from "react-use";

import setStyleProperty from "@/utils/setStyleProperty";
import { useRef, useEffect, useState } from "react";

type Props = {
  name: string;
  height?: boolean;
  width?: boolean;
  children?: React.ReactNode;
  scoped?: boolean;
};

const SizeUtil = ({
  name,
  height = false,
  width = false,
  children,
  scoped = false,
}: Props) => {
  const containerEl = useRef<HTMLDivElement>(null);

  const [el, { width: elWidth, height: elHeight }] =
    useMeasure<HTMLDivElement>();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, [elWidth, elHeight]);

  useDebounce(
    () => {
      if (width) {
        setStyleProperty(
          `--w-${name}`,
          `${elWidth}px`,
          scoped ? containerEl.current : null,
        );
      }
      if (height) {
        setStyleProperty(
          `--h-${name}`,
          `${elHeight}px`,
          scoped ? containerEl.current : null,
        );
      }
      if (name === "menu-category") {
        const minWidth = 160;
        const maxNumber = 6;
        setStyleProperty(
          `--w-item`,
          `${elWidth / Math.min(Math.floor(elWidth / minWidth), maxNumber)}px`,
          containerEl.current,
        );
      }
      setReady(true);
    },
    100,
    [elHeight, elWidth],
  );

  return (
    <div
      ref={containerEl}
      className={`relative ${ready ? "opacity-100" : "opacity-0"} transition-opacity`}
    >
      {children}
      <div ref={el} className="invisible absolute top-0 left-0 h-full w-full" />
    </div>
  );
};

export default SizeUtil;
