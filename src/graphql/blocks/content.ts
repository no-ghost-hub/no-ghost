export default /* GraphQL */ `
  fragment ContentBlock on ContentBlock {
    id
    blockType
    text
    medium {
      ... on ImageBlock {
        image {
          ...Image
        }
      }
      ...Video
    }
    background
    contentTheme: theme
  }
`;
