import MonogramSvg from "@/assets/vectors/monogram.svg";

type Props = {
  children?: React.ReactNode;
};

const Loading = ({ children }: Props) => {
  return (
    <div className="gap-s grid justify-items-center place-self-center">
      <MonogramSvg className="h-m" />
      {children}
    </div>
  );
};

export default Loading;
