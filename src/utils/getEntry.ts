const util = async (type: string, slug: string) => {
  let response;

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payload/${type}/${slug}`,
  );

  const { data } = await response.json();

  return data;
};

export default util;
