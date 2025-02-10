import Category from "@/components/menu/Category";
import Text from "@/components/elements/Text";
import SizeUtil from "@/components/utils/Size";

import parsed from "@/utils/parsed";
import getMenu from "@/odoo/getMenu";

type Props = { theme?: string };

const Menu = async ({ theme = "default" }: Props) => {
  const categories = await getMenu();

  return (
    <div className="gap-l grid">
      {categories.map((category: any) => (
        <div key={category.id}>
          <Category {...parsed(category, "category")} theme={theme} />
        </div>
      ))}
    </div>
  );
};

export default Menu;

export const MenuLoading = () => {
  return (
    <div className="mx-auto max-w-(--breakpoint-lg) px-[calc(var(--spacing-xs)/2)]">
      <SizeUtil name="menu-category" width scoped>
        <div className="gap-m grid">
          <Text tag="h3" align="center" transform="uppercase">
            <div className="bg-darkgrey w-(--w-item)">&nbsp;</div>
          </Text>
          <div className="gap-y-xs flex flex-wrap justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-(--w-item) px-[calc(var(--spacing-xs)/2)]"
              >
                <div className="grid shadow">
                  <div className="bg-darkgrey grid aspect-square" />
                  <div className="custom-underline animate-underline grid aspect-square bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SizeUtil>
    </div>
  );
};
