import footerQuery from "@/graphql/queries/footer";

const queries = new Map([["Footer", footerQuery]]);

const util = async (type: string) => {
  let res;
  let data;

  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  if (endpoint) {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queries.get(type),
      }),
    });
  }

  data = await res?.json();

  console.log(data);

  if (data) {
    // data = data?.data[type].docs[0];
  }

  return data;
};

export default util;
