import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import Logo from "@/components/layout/Logo";
import dontDiePic from "./images/dont-die.jpg";
import burnPic from "./images/burn.jpg";
import Video from "@/components/elements/Video";
import Link from "@/components/elements/Link";

const StrategyPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <main className="gap-l pt-m pb-l mx-auto grid max-w-(--breakpoint-lg)">
      <div className="px-xs">
        <Text tag="h1">
          <Logo theme="inline" /> Communication strategy
        </Text>
      </div>
      <div className="px-xs top-xs sticky z-10">
        <div className="p-xs bg-yellow">
          <Text tag="h3">Short-term goal: attract more clients</Text>
        </div>
        <div className="p-xs bg-green">
          <Text tag="h3">
            Long-term goal: establish No Ghost as a healthy lifestyle movement
          </Text>
        </div>
      </div>
      <section className="gap-m grid">
        <div className="px-xs">
          <Text tag="h2" typo="md" transform="uppercase" align="center">
            Tone of voice
          </Text>
        </div>
        <div className="gap-xs px-xs grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start">
          <div className="bg-blue p-xs gap-m grid">
            <div className="gap-s grid">
              <Text tag="h3">K: knowledged & inspirational</Text>
              <Text>
                We are experts in healthy eating and communicate in a precise,
                transparent, and trustworthy manner. Our brand serves as a
                valuable resource, offering useful and inspiring information to
                help people lead healthier lifestyles.
              </Text>
              <Text>
                e.g. "Eating well is not about restrictions, but about
                discovering what truly nourishes you."
              </Text>
            </div>
            <Text typo="lg">80% if text</Text>
            <div className="shadow">
              <Image src={dontDiePic} />
            </div>
          </div>
          <div className="bg-orange p-xs gap-m grid">
            <div className="gap-s grid">
              <Text tag="h3">F: fast & raw</Text>
              <Text>
                Our visual style reflects the fast-paced nature of the culinary
                world and embraces its raw, unfiltered energy. A touch of
                mystery in our identity adds depth and intrigue.
              </Text>
              <Text>
                e.g. "No fluff, no filters—just bold flavors, raw ingredients,
                and the energy of the kitchen."
              </Text>
            </div>
            <Text typo="lg">80% if media</Text>
            <div className="gap-xs grid">
              <div className="grid bg-white">
                <Link
                  theme="button"
                  background="white"
                  href="https://www.loopearplugs.com/"
                >
                  <Text tag="div" wrap={false}>
                    Loop earplugs
                  </Text>
                </Link>
              </div>
              <div className="grid bg-white">
                <Link
                  theme="button"
                  background="white"
                  href="https://www.youtube.com/@DisruptReality"
                >
                  <Text tag="div" wrap={false}>
                    Disrupt
                  </Text>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gap-m grid">
        <div className="px-xs">
          <Text tag="h2" typo="md" transform="uppercase" align="center">
            Targets
          </Text>
        </div>
      </section>
      <section className="gap-m grid">
        <div className="px-xs">
          <Text tag="h2" typo="md" transform="uppercase" align="center">
            Channels
          </Text>
        </div>
      </section>
      <section className="gap-m grid">
        <div className="px-xs">
          <Text tag="h2" typo="md" transform="uppercase" align="center">
            Implementations - One off
          </Text>
        </div>
        <div className="gap-xs px-xs grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] items-start">
          <div className="grid">
            <div className="bg-blue p-xs justify-self-start">
              <Text typo="sm">K</Text>
            </div>
            <div className="p-xs gap-s grid bg-white">
              <Text tag="h3">B2B section</Text>
              <Text>
                It would help promoting and selling No Ghost meat. It could even
                become an e-commerce part with checkout flow. Possible to sell
                to privates instead of only companies?
              </Text>
            </div>
            <div className="p-xs bg-yellow">
              <Text typo="sm">
                Why? To get and keep more B2B clients. <br />
                What? How? Web page(s) or e-commerce. <br />
                When? April 2025. <br />
                Monitor? Increase in sales. <br />
              </Text>
            </div>
          </div>
          <div className="grid">
            <div className="grid grid-flow-col justify-self-start">
              <div className="bg-blue p-xs">
                <Text typo="sm">K</Text>
              </div>
              <div className="bg-orange p-xs">
                <Text typo="sm">F</Text>
              </div>
            </div>
            <div className="p-xs gap-s grid bg-white">
              <Text tag="h3">Website tuning</Text>
              <Text>
                Finishing up website details: SEO, make contact info more
                visible, decide about footer and navigation, implement visual
                effects on media. With the help of Alessandro De Vecchi.
              </Text>
              <Image src={burnPic} />
            </div>
            <div className="p-xs bg-green">
              <Text typo="sm">
                Why? To communicate the identity properly. <br />
                What? How? Development hours. <br />
                When? March 2025. <br />
                Monitor? Collective check. <br />
              </Text>
            </div>
          </div>
          <div className="grid">
            <div className="grid grid-flow-col justify-self-start">
              <div className="bg-orange p-xs">
                <Text typo="sm">F</Text>
              </div>
            </div>
            <div className="p-xs gap-s grid bg-white">
              <Text tag="h3">Community repost</Text>
              <Text>
                Adding thumbs of social media posts or web reviews to the
                website. They could go along individual long form contents, like
                blog posts. Idea to represent reviews not with quantitative data
                but qualitative, for example extracted keywords.
              </Text>
              <Link theme="button" background="white" href="https://i-d.co/">
                <Text tag="div">i-D</Text>
              </Link>
            </div>
            <div className="p-xs bg-green">
              <Text typo="sm">
                Why? To make the community visible. <br />
                What? How? Relinks, reposts, little thumbs. <br />
                When? April 2025. <br />
                Monitor? Web analytics. <br />
              </Text>
            </div>
          </div>
        </div>
      </section>
      <section className="gap-m grid">
        <div className="px-xs">
          <Text tag="h2" typo="md" transform="uppercase" align="center">
            Long-form content - Twice a month
          </Text>
        </div>
        <div className="gap-xs px-xs grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] items-start">
          <div className="grid">
            <div className="grid grid-flow-col justify-self-start">
              <div className="bg-blue p-xs">
                <Text typo="sm">K</Text>
              </div>
            </div>
            <div className="p-xs gap-s grid bg-white">
              <Text tag="h3">Updates</Text>
              <Text>
                Finishing up website details: SEO, make contact info more
                visible, decide about footer and navigation, implement visual
                effects on media. With the help of Alessandro De Vecchi.
              </Text>
              <Image src={burnPic} />
            </div>
            <div className="p-xs bg-green">
              <Text typo="sm">
                Why? To communicate the identity properly. <br />
                What? How? Development hours. <br />
                When? March 2025. <br />
                Monitor? Collective check. <br />
              </Text>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StrategyPage;
