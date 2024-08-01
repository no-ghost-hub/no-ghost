import { FC } from "react";
import Text from "@/components/elements/Text";

type Props = {
  text: string;
};

const Component: FC<Props> = ({ text }) => {
  return <Text html={text} />;
};

export default Component;
