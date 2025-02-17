import { odooQuery } from "@/utils/odooClient";
import getOrder from "@/odoo/getOrder";

const getTableOrder = async (table: string) => {
  const orderJson = await odooQuery({
    model: "pos.order",
    method: "search_read",
    domain: [
      [
        ["table_id.table_number", "=", parseInt(table)],
        ["state", "=", "draft"],
      ],
    ],
    options: {
      fields: ["id"],
    },
  });

  const { result: data, ...rest } = orderJson;

  if (data[0]) {
    const order = await getOrder(data[0].id);
    return order;
  } else return { data: data[0], ...rest };
};

export default getTableOrder;
