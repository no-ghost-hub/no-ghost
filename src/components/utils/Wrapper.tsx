"use client";

import { useEffect, useRef, useState } from "react";
import Context from "@/components/utils/Context";
import { useUiStore } from "@/components/providers/Global";
import { useClickAway } from "react-use";

type Props = {
  type?: string;
  context?: any;
  children?: React.ReactNode;
};

const Wrapper = ({ type, context, children }: Props) => {
  const [key, setKey] = useState(0);
  const { navigation, setNavigation } = useUiStore((state) => state);

  if (type === "reserve") {
    useEffect(() => {
      if (!navigation) {
        setTimeout(() => {
          setKey((prev) => prev + 1);
        }, 200);
      }
    }, [navigation]);
  }

  const el = useRef<HTMLDivElement>(null);

  if (type === "navigation") {
    useClickAway(el, () => {
      setNavigation("");
    });
  }

  return (
    <Context.Provider value={context} key={key}>
      <div ref={el} className="grid">
        {children}
      </div>
    </Context.Provider>
  );
};

export default Wrapper;
