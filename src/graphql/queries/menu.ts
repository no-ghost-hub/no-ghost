import link from "@/graphql/fragments/link";

export default /* GraphQL */ `
  ${link}
  query ($slug: String) {
    Menus(where: { slug: { in: [$slug] } }) {
      docs {
        id
        items {
          ...Link
          ... on LinkBlock {
            id
            blockType
          }
          ... on MenuBlock {
            id
            blockType
          }
          ... on OrderBlock {
            id
            blockType
          }
          ... on ReserveBlock {
            id
            blockType
          }
        }
      }
    }
  }
`;
