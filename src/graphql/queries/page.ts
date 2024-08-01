export default /* GraphQL */ `
  query ($slug: String) {
    Pages(where: { slug: { in: [$slug] } }) {
      docs {
        id
        title
        slug
        blocks {
          ... on ContentBlock {
            id
            blockType
            medium {
              ... on ContentBlock_Medium {
                medium {
                  ... on ImageBlock {
                    id
                    blockType
                    image {
                      ... on Media {
                        id
                        alt
                        url
                        width
                        height
                      }
                    }
                  }
                  ... on VideoBlock {
                    id
                    blockType
                    video {
                      src
                      poster {
                        ... on Media {
                          id
                          alt
                          url
                          width
                          height
                        }
                      }
                      ratio {
                        x
                        y
                      }
                    }
                  }
                }
              }
            }
            blocks {
              ... on TextBlock {
                id
                blockType
                textHTML
              }
              ... on QuotesBlock {
                id
                blockType
                quotes {
                  ... on Quote {
                    id
                    slug
                  }
                }
              }
              ... on FooterBlock {
                id
                blockType
              }
            }
          }
        }
      }
    }
  }
`;
