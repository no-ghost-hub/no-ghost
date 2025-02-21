const odooUrl = process.env.NEXT_PUBLIC_ODOO_URL || "";

const db = process.env.ODOO_DATABASE_NAME;
const email = process.env.ODOO_API_EMAIL;
const password = process.env.ODOO_API_PASSWORD;

const getSession = async () => {
  const { headers } = await fetch(`${odooUrl}/web/session/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        db,
        login: email,
        password,
      },
    }),
    cache: "no-store",
  });

  const headersCookies = headers.getSetCookie();
  const id = headersCookies
    .find((cookie) => cookie.includes("session_id"))
    ?.split(";")[0]
    .split("=")[1];

  return { id };
};

export default getSession;
