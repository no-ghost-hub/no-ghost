export default /* GraphQL */ `
  query {
    Footer {
      ... on Footer {
        menus {
          value {
            ... on Menu {
              id
              title
              slug
              items {
                ... on Menu_Items {
                  id
                  link {
                    type
                    reference {
                      value {
                        ... on Page {
                          id
                          title
                          slug
                        }
                      }
                    }
                    url
                    icon
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
