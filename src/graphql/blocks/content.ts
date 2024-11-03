export default /* GraphQL */ `
  fragment ContentBlock on ContentBlock {
    id
    blockType
    text
    links {
      ... on LinksBlock {
        id
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
    }
    medium {
      ... on ImageBlock {
        blockType
        image {
          ...Image
        }
      }
      ...Video
      ... on VideoBlock {
        blockType
      }
    }
    contentTheme: theme
    contentBackground: background
  }
`;
