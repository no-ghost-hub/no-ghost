import pageQuery from "@/graphql/queries/page";

const queries = new Map([["Pages", pageQuery]]);

export default async (slug: string, type: string) => {
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
        variables: {
          slug,
        },
      }),
    });
  }

  data = await res?.json();

  if (data) {
    data = data?.data[type]?.docs[0];
  }

  return data;
};
