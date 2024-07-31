import { FC } from "react";
import { FooterBlock } from "@/types";

import getGlobal from "@/utils/getGlobal";
import { Footer } from "@/payload-types";

type Props = FooterBlock;

const Component: FC<Props> = async (props) => {
  // const data: Footer = await getGlobal("Footer");

  return (
    <footer className="self-end">
      <p>{JSON.stringify(props)}</p>
    </footer>
  );
};

export default Component;
