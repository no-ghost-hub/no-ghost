export default /* GraphQL */ `
  fragment Link on LinkBlock {
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
`;
