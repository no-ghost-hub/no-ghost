import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import Icon from "@/components/elements/Icon";

import { Footer } from "@/payload-types";

import getGlobal from "@/utils/getGlobal";
import parsed from "@/utils/parsed";

type Props = {};

const Component: React.FC<Props> = async ({}: Props) => {
  const data: Footer = await getGlobal("Footer");

  return <footer className="grid"></footer>;
};

export default Component;
