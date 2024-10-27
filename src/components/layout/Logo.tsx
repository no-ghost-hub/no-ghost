import Logo from "@/assets/vectors/logo.svg";

type Props = { theme?: string };

const Component = ({ theme = "default" }: Props) => {
  const classes: Record<string, string> = {
    default: "w-[clamp(128px,20vw,192px)]",
  };

  return <Logo className={classes[theme]} />;
};

export default Component;
