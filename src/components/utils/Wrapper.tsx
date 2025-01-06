"use client";

import { useEffect, useState } from "react";
import Context from "@/components/utils/Context";
import { useUiStore } from "../providers/Global";

type Props = {
  type?: string;
  context?: any;
  children?: React.ReactNode;
};

const Wrapper = ({ type, context, children }: Props) => {
  const [key, setKey] = useState(0);
  const { navigation } = useUiStore((state) => state);

  if (type === "reserve") {
    useEffect(() => {
      if (!navigation) {
        setTimeout(() => {
          setKey((prev) => prev + 1);
        }, 200);
      }
    }, [navigation]);
  }

  return (
    <Context.Provider value={context} key={key}>
      {children}
    </Context.Provider>
  );
};

export default Wrapper;
