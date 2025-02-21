import { odooQuery, odooSync } from "@/utils/odooClient";
import getOrder from "@/odoo/getOrder";

const updateOrder = async (id: string, lines: any[]) => {
  let json = await odooQuery({
    model: "pos.order",
    method: "write",
    domain: [
      [id],
      {
        lines,
      },
    ],
  });

  if (json.result === true) {
    const order = await getOrder(id);

    await odooSync({
      ...order.data,
      session_id: order.data.session_id[0],
      lines: [],
    });

    return order;
  } else {
    const { result: data, ...rest } = json;
    return { data, ...rest };
  }
};

export default updateOrder;
