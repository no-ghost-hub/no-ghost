import Text from "@/components/elements/Text";
import Image from "@/components/elements/Image";

import type { Quote } from "@/types";

type Props = Quote;

const Component: React.FC<Props> = ({ title, role, age, quote, image }) => {
  return (
    <div className="grid gap-m rounded-container bg-green p-m">
      <div className="grid grid-flow-col gap-m justify-self-start">
        <Image {...image} theme="quote-thumb" />
        <div className="grid content-start">
          <Text>
            <span className="font-bold">{title}</span>, {age}
          </Text>
          <Text>{role}</Text>
        </div>
      </div>
      <Text>{quote}</Text>
    </div>
  );
};

export default Component;
