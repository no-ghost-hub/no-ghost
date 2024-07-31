import { FC } from "react";
import type { Quote } from "@/payload-types";

import Text from "@/components/elements/Text";

type Props = Quote;

const Component: FC<Props> = ({ title }) => {
  return (
    <div className="p-m bg-green">
      <Text>{title}</Text>
    </div>
  );
};

export default Component;
