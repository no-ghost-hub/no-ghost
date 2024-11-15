const util = async () => {
  let response;

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/odoo/company`,
  );

  const { result } = await response.json();

  return result;
};

export default util;
