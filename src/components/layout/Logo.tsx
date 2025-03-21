import LogoSvg from "@/assets/vectors/logo.svg";

type Props = { theme?: string };

const Logo = ({ theme = "default" }: Props) => {
  const classes: Record<string, string> = {
    default: "w-[clamp(128px,20vw,192px)]",
    block: "w-[clamp(192px,30vw,256px)]",
    inline: "inline h-[0.74em] text-white bg-black align-baseline",
  };

  return <LogoSvg className={classes[theme]} />;
};

export default Logo;
