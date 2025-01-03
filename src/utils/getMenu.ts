const util = async (group: string | string[]) => {
  let response;

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/odoo/menu?group=${group}`,
  );

  const { result } = await response.json();

  return result;
};

export default util;
