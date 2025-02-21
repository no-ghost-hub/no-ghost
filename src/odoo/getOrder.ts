import { odooQuery } from "@/utils/odooClient";
import parsed from "@/utils/parsed";

const getOrder = async (id: string) => {
  const [orderJson, linesJson] = await Promise.all([
    odooQuery({
      model: "pos.order",
      method: "search_read",
      domain: [[["id", "=", parseInt(id)]]],
      options: {
        fields: [
          "state",
          "session_id",
          "amount_tax",
          "amount_total",
          "amount_paid",
          "amount_return",
          "lines",
          "uuid",
        ],
      },
    }),
    odooQuery({
      model: "pos.order.line",
      method: "search_read",
      domain: [[["order_id", "=", parseInt(id)]]],
      options: {
        fields: ["display_name", "qty", "price_subtotal_incl"],
      },
    }),
  ]);

  orderJson.result = {
    ...orderJson.result[0],
    lines: linesJson.result.map((line: any) => parsed(line, "orderLine")),
  };

  const { result: data, ...rest } = orderJson;
  return { data, ...rest };
};

export default getOrder;
