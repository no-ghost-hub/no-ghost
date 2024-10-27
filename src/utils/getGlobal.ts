const util = async (type: string) => {
  let response;
  let data;

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payload/globals/${type}`,
  );

  data = await response.json();

  return data;
};

export default util;
