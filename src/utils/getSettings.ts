const util = async () => {
  let response;
  let data;

  response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/foodics/settings`,
  );

  data = await response.json();

  return data;
};

export default util;
