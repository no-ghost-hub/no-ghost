const util = async (type: string) => {
  let response;

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payload/globals/${type}`,
  );

  const { data } = await response.json();

  return data;
};

export default util;
