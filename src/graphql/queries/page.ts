import image from "@/graphql/fragments/image";
import video from "@/graphql/fragments/video";
import logo from "@/graphql/blocks/logo";
import content from "@/graphql/blocks/content";

export default /* GraphQL */ `
  ${image}
  ${video}
  ${logo}
  ${content}
  query ($slug: String) {
    Pages(where: { slug: { in: [$slug] } }) {
      docs {
        id
        title
        slug
        blocks {
          ...LogoBlock
          ...ContentBlock
        }
      }
    }
  }
`;
