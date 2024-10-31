export default /* GraphQL */ `
  query ($slug: String) {
    Pages(where: { slug: { in: [$slug] } }) {
      docs {
        id
        title
        slug
        blocks {
          ... on LogoBlock {
            id
            blockType
            theme
          }
        }
      }
    }
  }
`;
