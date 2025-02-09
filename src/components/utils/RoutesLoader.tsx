"use client";

import { useTransition } from "react";

const RoutesLoader = ({ className = "" }: { className?: string }) => {
  const [isPending] = useTransition();

  return (
    <div
      className={`${isPending ? "opacity-100" : "opacity-0"} ${className} custom-underline animate-underline animate-underline-highlight h-[0.1em]`}
    />
  );
};

export default RoutesLoader;
