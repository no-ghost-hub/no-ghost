import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import Icon from "@/components/elements/Icon";

import { Footer as FooterType } from "@/payload-types";

import getGlobal from "@/utils/getGlobal";
import parsed from "@/utils/parsed";

type Props = {};

const Footer = async ({}: Props) => {
  const { text }: FooterType = await getGlobal("Footer");

  return (
    <footer className="mx-xs grid bg-white pb-[calc(var(--h-nav)+var(--spacing-xs)*2)]">
      {text && (
        <div className="p-m">
          <Text html={text} align="center" />
        </div>
      )}
    </footer>
  );
};

export default Footer;
