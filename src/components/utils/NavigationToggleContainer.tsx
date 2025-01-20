"use client";

type Props = {
  show: boolean;
  children?: React.ReactNode;
};

const stateClasses: Record<string, string> = {
  show: "transform translate-y-0",
  hide: "transform translate-y-full",
};

const NavigationToggleContainer = ({ show, children }: Props) => {
  return (
    <div
      className={`${show ? stateClasses.show : stateClasses.hide} z-10 transition-transform`}
    >
      {children}
    </div>
  );
};

export default NavigationToggleContainer;
