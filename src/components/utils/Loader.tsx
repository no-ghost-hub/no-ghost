import MonogramSvg from "@/assets/vectors/monogram.svg";

type Props = {
  children?: React.ReactNode;
};

const Loader = ({ children }: Props) => {
  return (
    <div className="gap-s grid justify-items-center place-self-center">
      <div className="grid *:col-start-1 *:row-start-1">
        <MonogramSvg className="h-m text-blue animate-load z-10" />
        <MonogramSvg className="h-m" />
      </div>
      {children}
    </div>
  );
};

export default Loader;
