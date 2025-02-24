"use client";

import Text from "@/components/elements/Text";
import Link from "@/components/elements/Link";
import { useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";
import setStyleProperty from "@/utils/setStyleProperty";

type Props = {
  group?: string;
  trigger: React.ReactNode;
  children?: React.ReactNode;
  theme?: string;
};

const Accordion = ({ trigger, children, theme = "default" }: Props) => {
  const el = useRef<HTMLDivElement>(null);

  const [contentEl, { height }] = useMeasure<HTMLDivElement>();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setStyleProperty(`--spacing-content`, `${height}px`, el.current);
    } else {
      setStyleProperty(`--spacing-content`, `0px`, el.current);
    }
  }, [open]);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div ref={el} className="grid">
      <Link onClick={handleClick} theme="button" shadow={false} active={open}>
        <div className="grid grid-flow-col items-center justify-between">
          <Text tag="div">{open ? "↑" : "↓"}</Text>
          {trigger}
          <Text tag="div">{open ? "↑" : "↓"}</Text>
        </div>
      </Link>
      <div className="h-content overflow-y-hidden transition-[height]">
        <div ref={contentEl}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
