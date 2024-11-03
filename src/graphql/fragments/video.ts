export default /* GraphQL */ `
  fragment Video on VideoBlock {
    src
    poster {
      ...Image
    }
    ratio {
      x
      y
    }
  }
`;
