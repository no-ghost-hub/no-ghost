import quotesQuery from "@/graphql/queries/quotes";

const queries = new Map([["Quotes", quotesQuery]]);

const util = async (type: string, slugs?: string[]) => {
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
        variables: { slugs },
      }),
    });
  }

  data = await res?.json();

  if (data) {
    data = data?.data?.[type]?.docs;
  }

  return data;
};

export default util;
