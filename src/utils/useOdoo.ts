const useOdoo = async ({
  route,
  method = "GET",
  body,
}: {
  route: string;
  method?: string;
  body?: BodyInit;
}) => {
  let response;
  let cookie;
  let url = "";

  if (typeof window === "undefined") {
    url = process.env.NEXT_PUBLIC_SERVER_URL || "https://eatnoghost.com";
    const { headers } = await import("next/headers");
    const headersList = await headers();
    cookie = headersList.get("cookie");
  }

  response = await fetch(`${url}/api/odoo/${route}`, {
    method,
    body,
    headers: {
      cookie: cookie || "",
    },
  });

  const { result, error } = await response.json();

  if (typeof window !== "undefined" && method === "GET") {
    if (error) {
      throw new Error(error);
    }
    return result;
  } else {
    return { data: result, error };
  }
};

export default useOdoo;
