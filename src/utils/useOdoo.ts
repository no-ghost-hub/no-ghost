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

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/odoo/${route}`,
    {
      method,
      body,
    },
  );

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
