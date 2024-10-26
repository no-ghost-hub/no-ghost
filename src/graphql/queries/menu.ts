export default /* GraphQL */ `
  query ($slug: String) {
    Menus(where: { slug: { in: [$slug] } }) {
      docs {
        id
        items {
          ... on LinkBlock {
            id
            blockType
            type
            reference {
              value {
                ... on Page {
                  slug
                  title
                }
              }
            }
            url
            text
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
