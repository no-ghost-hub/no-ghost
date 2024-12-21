import useOdoo from "@/utils/useOdoo";

import Link from "@/components/elements/Link";
import Text from "@/components/elements/Text";
import MenuGroupsContainer from "@/components/utils/MenuGroupsContainer";

type Props = {};

const MenuGroups = async ({}: Props) => {
  const { data: menuGroups }: { data: any[] } = await useOdoo({
    route: "menu-groups",
  });

  return (
    <MenuGroupsContainer
      colors={menuGroups.reduce(
        (acc, { slug, color }) => ({ ...acc, [slug]: color }),
        {},
      )}
    >
      <nav className={`grid grid-flow-col justify-center`}>
        {menuGroups?.map(({ name, url }) => {
          return (
            <Link theme="button" href={url} key={name}>
              <Text tag="div">{name}</Text>
            </Link>
          );
        })}
      </nav>
    </MenuGroupsContainer>
  );
};

export default MenuGroups;
