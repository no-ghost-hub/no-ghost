import { FC } from "react";

import getGlobal from "@/utils/getGlobal";
import { Footer } from "@/payload-types";

type Props = {};

const Component: FC<Props> = async () => {
  const data: Footer = await getGlobal("Footer");

  return <footer></footer>;
};

export default Component;
