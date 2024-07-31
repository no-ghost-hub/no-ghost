export default /* GraphQL */ `
  query ($slugs: String[]) {
    Quotes(where: { slug: { in: $slugs } }) {
      docs {
        id
        title
        slug
        role
        age
        quote
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
    }
  }
`;
