import Logo from "@/components/layout/Logo";
import Medium from "@/components/groups/Medium";

type Props = {
  medium?: any;
  theme?: string;
  background?: string;
};

const LogoBlock = ({ medium, background = "default" }: Props) => {
  const classes: Record<string, string> = {
    default: "",
    orange: "bg-orange",
    blue: "bg-blue",
    none: "",
  };

  return (
    <div className={`grid min-h-screen ${classes[background]}`}>
      <div
        className={`z-10 col-start-1 row-start-1 place-self-center p-m ${medium ? "text-white" : ""}`}
      >
        <Logo theme="block" />
      </div>
      {medium && (
        <div className="col-start-1 row-start-1 grid">
          <Medium {...medium} theme="cover" />
        </div>
      )}
    </div>
  );
};

export default LogoBlock;
