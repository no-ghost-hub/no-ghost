import pageQuery from "@/graphql/queries/page";
import menuQuery from "@/graphql/queries/menu";
import parsed from "@/utils/parsed";

const queries = new Map([
  ["Pages", pageQuery],
  ["Menus", menuQuery],
]);

const util = async (slug: string, type: string) => {
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
  console.log(data, "data");

  if (data) {
    data = data?.data?.[type]?.docs[0];
  }

  return parsed(data, type);
};

export default util;
