import Text from "@/components/elements/Text";

type Props = {
  text: string;
};

const Component: React.FC<Props> = ({ text }) => {
  return <Text html={text} />;
};

export default Component;
