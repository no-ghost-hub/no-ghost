import { TextBlock } from "@/types";
import { FC } from "react";

type Props = TextBlock;

const Component: FC<Props> = (props) => {
  console.log(props);

  return (
    <div>
      <p>Text</p>
    </div>
  );
};

export default Component;
