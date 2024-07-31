export default /* GraphQL */ `
  query {
    Footer {
      ... on Footer {
        slug
      }
    }
  }
`;
