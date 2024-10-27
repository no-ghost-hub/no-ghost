const util = async (group: string | string[]) => {
  let response;
  let data;

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodics/menu?group=${group}`,
  );

  data = await response.json();

  return data;
};

export default util;
