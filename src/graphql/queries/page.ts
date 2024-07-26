export default /* GraphQL */ `
  query ($slug: String) {
    Pages(where: { slug: { equals: $slug } }) {
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
                  ... on Media {
                    id
                    alt
                    caption
                    url
                    width
                    height
                  }
                }
              }
            }
            blocks {
              ... on TextBlock {
                id
                type: blockType
                text
              }
              ... on QuotesBlock {
                id
                type: blockType
                quotes {
                  ... on Quote {
                    id
                    title
                    slug
                    role
                    age
                    quote
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
