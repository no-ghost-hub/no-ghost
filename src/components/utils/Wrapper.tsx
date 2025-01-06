"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Context from "@/components/utils/Context";

type Props = {
  type?: string;
  context?: any;
  children?: React.ReactNode;
};

const Wrapper = ({ type, context, children }: Props) => {
  const [key, setKey] = useState(0);
  const searchParams = useSearchParams();

  if (type === "reserve") {
    const navigation = searchParams.get("navigation");
    useEffect(() => {
      if (!navigation) {
        setTimeout(() => {
          setKey((prev) => prev + 1);
        }, 500);
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
