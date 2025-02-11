"use server";

import { odooQuery, odooOrder } from "@/utils/odooClient";
import parsed from "@/utils/parsed";
import { attributesPrice, CartItem } from "@/stores/cart";
import { randomUUID } from "crypto";

const createOrder = async ({
  table,
  lines,
}: {
  table?: string;
  lines: CartItem[];
}) => {
  const [
    {
      result: [posData],
    },
    {
      result: [tableData],
    },
  ] = await Promise.all([
    odooQuery({
      model: "pos.config",
      method: "search_read",
      options: {
        fields: ["access_token"],
        domain: [["self_ordering_mode", "=", "mobile"]],
      },
    }),
    odooQuery({
      model: "restaurant.table",
      method: "search_read",
      options: {
        fields: ["id", "identifier", "table_number"],
        domain: [["table_number", "=", table]],
      },
    }),
  ]);

  const json = await odooOrder({
    token: posData.access_token,
    table: tableData.identifier,
    order: {
      table_id: tableData.id,
      company_id: 1,
      session_id: 1,
      amount_tax: 0,
      amount_total: 0,
      amount_paid: 0,
      amount_return: 0,
      customer_count: 1,
      uuid: randomUUID(),
      lines: lines.map(
        ({ productId, price, attributes, quantity, taxedPrice, tax }) => [
          0,
          0,
          {
            product_id: productId,
            price_unit: price + attributesPrice(attributes),
            price_extra: attributesPrice(attributes),
            price_subtotal: (price + attributesPrice(attributes)) * quantity,
            price_subtotal_incl:
              (taxedPrice +
                attributesPrice(attributes) * (1 + tax.amount / 100)) *
              quantity,
            attribute_value_ids: attributes?.map(({ id }) => id),
            qty: quantity,
            tax_ids: [tax.id],
            uuid: randomUUID(),
          },
        ],
      ),
    },
  });

  const { result } = json;

  return { ...json, ...(result ? { data: parsed(result, "order") } : {}) };
};

export default createOrder;
