import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import Icon from "@/components/elements/Icon";

import { Footer } from "@/payload-types";

import getGlobal from "@/utils/getGlobal";
import parsed from "@/utils/parsed";

type Props = {};

const Component: React.FC<Props> = async () => {
  const data: Footer = await getGlobal("Footer");

  return (
    <footer className="grid">
      {data.menus?.map((raw, index) => {
        const menu = parsed(raw, "menu");

        return (
          <div
            key={index}
            className="grid auto-cols-max grid-flow-col items-center gap-m"
          >
            {menu.items?.map((raw: any, index: number) => {
              const link = parsed(raw.link, "link");

              return (
                <Link key={index} href={link.href}>
                  {link.icon && <Icon name={link.icon} />}
                  {link.text && <Text>{link.text}</Text>}
                </Link>
              );
            })}
          </div>
        );
      })}
    </footer>
  );
};

export default Component;
