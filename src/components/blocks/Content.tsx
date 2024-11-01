import Logo from "@/components/layout/Logo";

type Props = {
  theme?: string;
};

const Component = ({ theme = "default" }: Props) => {
  return (
    <div>
      <Logo />
    </div>
  );
};

export default Component;
