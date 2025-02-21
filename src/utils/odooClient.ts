import getSession from "@/odoo/getSession";
import { randomUUID } from "crypto";

const endpoint = process.env.ODOO_API_ENDPOINT || "";
const orderEndpoint = process.env.ODOO_API_ORDER_ENDPOINT || "";
const syncEndpoint = process.env.ODOO_API_SYNC_ENDPOINT || "";
const db = process.env.ODOO_DATABASE_NAME;
const user = process.env.ODOO_API_USER;
const token = process.env.ODOO_API_TOKEN;

const odooQuery = async ({
  model,
  method,
  domain = [],
  options = {},
}: {
  model: string;
  method: string;
  domain?: any[];
  options?: any;
}) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [db, user, token, model, method, domain, options],
      },
      id: randomUUID(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { error: response.status };
  }

  const json = await response.json();

  if (json.error) {
    console.error(json.error.data.message);
  }

  return json;
};

const odooOrder = async ({
  token,
  order,
  table,
}: {
  token: string;
  order: any;
  table: string;
}) => {
  const response = await fetch(orderEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        access_token: token,
        table_identifier: table,
        order,
      },
      id: randomUUID(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { error: response.status };
  }

  const json = await response.json();

  if (json.error) {
    console.error(json.error.data.message);
  }

  return json;
};

const odooSync = async (order: any) => {
  const { id } = await getSession();
  const response = await fetch(syncEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: `session_id=${id}` },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "pos.order",
        method: "sync_from_ui",
        args: [[order]],
        kwargs: {},
      },
      id: randomUUID(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { error: response.status };
  }

  const json = await response.json();

  if (json.error) {
    console.error(json.error.data.message);
  }

  return json;
};

export { odooQuery, odooOrder, odooSync };
