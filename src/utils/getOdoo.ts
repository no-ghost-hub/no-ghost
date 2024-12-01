const util = async (route: string) => {
  let response;

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/odoo/${route}`,
  );

  const { result } = await response.json();

  return result;
};

export default util;
