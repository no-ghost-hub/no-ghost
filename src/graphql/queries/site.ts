export default /* GraphQL */ `
  query {
    Site {
      title
      home {
        value {
          ... on Page {
            slug
            title
          }
        }
      }
      description
    }
  }
`;
