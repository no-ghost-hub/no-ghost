import Text from "@/components/elements/Text";
import Image from "@/components/elements/Image";

type Props = {
  title: string;
  image?: string;
  description?: string;
  price: number;
};

const Component = (props: Props) => {
  return <pre>{JSON.stringify(props)}</pre>;
};

export default Component;
