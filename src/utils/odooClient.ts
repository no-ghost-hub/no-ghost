const endpoint = process.env.ODOO_API_ENDPOINT || "";
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
  let response;
  response = await fetch(endpoint, {
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
      id: new Date().getTime(),
    }),
  });
  response = await response.json();

  if (response.error) {
    throw new Error(response.error.data.message);
  }
  return response;
};

export { odooQuery };
