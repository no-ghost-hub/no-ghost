export default /* GraphQL */ `
  fragment LogoBlock on LogoBlock {
    id
    blockType
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
    logoTheme: theme
    logoBackground: background
  }
`;
