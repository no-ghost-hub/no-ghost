import Logo from "@/components/layout/Logo";
import Medium from "@/components/groups/Medium";

type Props = {
  medium?: any;
  theme?: string;
};

const LogoBlock = ({ medium }: Props) => {
  return (
    <div className="grid h-screen">
      <div className="z-10 col-start-1 row-start-1 place-self-center p-xs text-white">
        <Logo theme="block" />
      </div>
      <div className="col-start-1 row-start-1 grid">
        <Medium {...medium} theme="cover" />
      </div>
    </div>
  );
};

export default LogoBlock;
