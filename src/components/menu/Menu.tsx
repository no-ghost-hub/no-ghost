import Category from "@/components/menu/Category";

import parsed from "@/utils/parsed";
import getMenu from "@/odoo/getMenu";

type Props = {};

const Menu = async ({}: Props) => {
  const categories = await getMenu();

  return (
    <div className="gap-l grid">
      {categories.map((category: any) => (
        <div key={category.id}>
          <Category {...parsed(category, "category")} />
        </div>
      ))}
    </div>
  );
};

export default Menu;
