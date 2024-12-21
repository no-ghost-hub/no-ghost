"use client";

import { useSearchParams } from "next/navigation";

type Props = {
  value: string;
  children?: React.ReactNode;
};

const stateClasses: Record<string, string> = {
  show: "transform translate-y-0",
  hide: "transform translate-y-full",
};

const NavigationToggleContainer = ({ value, children }: Props) => {
  const searchParams = useSearchParams();
  const navigation = searchParams.get("navigation");

  return (
    <div
      className={`${navigation === value ? stateClasses.show : stateClasses.hide} z-10 transition-transform`}
    >
      {children}
    </div>
  );
};

export default NavigationToggleContainer;
