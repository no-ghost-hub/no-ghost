"use client";

import useOdoo from "@/utils/useOdoo";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import MenuGroupsContainer from "@/components/utils/MenuGroupsContainer";
import useSWR from "swr";

type Props = {};

const MenuGroups = ({}: Props) => {
  const { data: menuGroups }: { data: any[] } = useSWR(
    {
      route: "menu-groups",
    },
    useOdoo,
  );

  return (
    menuGroups && (
      <MenuGroupsContainer
        colors={menuGroups.reduce(
          (acc, { slug, color }) => ({ ...acc, [slug]: color }),
          {},
        )}
      >
        <nav className={`grid grid-flow-col justify-center`}>
          {menuGroups.map(({ name, url }) => {
            return (
              <Link theme="button" href={url} key={name}>
                <Text tag="div">{name}</Text>
              </Link>
            );
          })}
        </nav>
      </MenuGroupsContainer>
    )
  );
};

export default MenuGroups;
