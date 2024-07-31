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
            type: blockType
            medium {
              ... on ContentBlock_Medium {
                medium {
                  ... on ImageBlock {
                    id
                    type: blockType
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
                    type: blockType
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
                type: blockType
                text: textHTML
              }
              ... on QuotesBlock {
                id
                type: blockType
                quotes {
                  ... on Quote {
                    id
                    slug
                  }
                }
              }
              ... on FooterBlock {
                id
                type: blockType
              }
            }
          }
        }
      }
    }
  }
`;
