import parsed from "@/utils/parsed";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";

import type { LinksBlock } from "@/payload-types";

type Props = {
  links: LinksBlock;
};

const LinksBlock = ({ links }: Props) => {
  return (
    <div className="grid gap-xs p-m sm:place-content-center">
      {links?.map((link) => {
        const { href, text } = parsed(link, "link");
        return (
          <Link key={link.id} href={href} background="blue" theme="button">
            <Text tag="div" typo="2">
              {text}
            </Text>
          </Link>
        );
      })}
    </div>
  );
};

export default LinksBlock;
