"use client";

import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import Logo from "@/components/layout/Logo";
import dontDiePic from "./images/dont-die.jpg";
import burnPic from "./images/burn.jpg";
import crypticPic from "./images/cryptic.jpg";
import sleepPic from "./images/sleep.jpg";
import lunePic from "./images/lune.jpg";
import qrPic from "./images/qr.jpg";
import shirtPic from "./images/shirt.jpg";
import signPic from "./images/sign.jpg";
import displayPic from "./images/display.jpg";
import relaxPic from "./images/relax.jpg";
import Video from "@/components/elements/Video";
import Link from "@/components/elements/Link";
import { useState } from "react";

const colors: Record<string, string> = {
  k: "bg-blue",
  f: "bg-orange",
  short: "bg-yellow",
  long: "bg-green",
  white: "bg-white",
};

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
      <Section title="Tone of voice">
        <Cards theme="big">
          <Card
            title="K: knowledged & inspirational"
            background="k"
            theme="simple"
          >
            <Text>
              We are experts in healthy eating and communicate in a precise,
              transparent, and trustworthy manner. Our brand serves as a
              valuable resource, offering useful and inspiring information to
              help people lead healthier lifestyles.
            </Text>
            <Text>
              e.g. "Eating well is not about restrictions, but about discovering
              what truly nourishes you."
            </Text>
            <div className="py-m">
              <Text typo="lg">80% if text</Text>
            </div>
            <div className="shadow">
              <Image src={dontDiePic} />
            </div>
          </Card>
          <Card title="F: fast & raw" background="f" theme="simple">
            <Text>
              Our visual style reflects the fast-paced nature of the culinary
              world and embraces its raw, unfiltered energy. A touch of mystery
              in our identity adds depth and intrigue.
            </Text>
            <Text>
              e.g. "No fluff, no filters—just bold flavors, raw ingredients, and
              the energy of the kitchen."
            </Text>
            <div className="py-m">
              <Text typo="lg">80% if media</Text>
            </div>
            <div className="gap-xs grid">
              <div className="grid bg-white">
                <Link
                  theme="button"
                  background="white"
                  href="https://www.loopearplugs.com/"
                >
                  <Text tag="div">Loop earplugs</Text>
                </Link>
              </div>
              <div className="grid bg-white">
                <Link
                  theme="button"
                  background="white"
                  href="https://www.youtube.com/@DisruptReality"
                >
                  <Text tag="div">Disrupt</Text>
                </Link>
              </div>
            </div>
          </Card>
        </Cards>
      </Section>
      <Section title="Targets">
        <Cards theme="big">
          <Card title="Conscious urban eaters" theme="simple">
            <Text>
              <span className="text-orange">Lunch</span> <br /> Busy
              professionals, students, and fitness enthusiasts seeking a quick,
              nutritious meal to fuel their day. <br />
            </Text>
            <Text>
              <span className="text-blue">Dinner</span> <br /> Groups looking to
              enjoy a fun, social dining experience without compromising on
              great taste and quality.
            </Text>
          </Card>
          <Card title="Subculture crowd" theme="simple">
            <Text>
              <span className="text-blue">Dinner and events</span> <br /> Those
              who love cool, hidden spots offering unique food and trendy
              alternative experiences.
            </Text>
          </Card>
          <Card title="Vegan industry" theme="simple">
            <Text>
              Restaurants, cafés, gyms, boutique hotels, and specialty grocery
              stores looking to offer high-quality vegan meat that stands out
              from mass-market alternatives.
            </Text>
          </Card>
        </Cards>
      </Section>
      <Section title="Channels">
        <Text tag="h4" typo="lg">
          G<span className="text-darkgrey">oogle</span>
          <br />I<span className="text-darkgrey">nstagram</span>
          <br />N<span className="text-darkgrey">ewsletter</span>
          <br />P<span className="text-darkgrey">rint</span>
          <br />S<span className="text-darkgrey">pace</span>
          <br />Y<span className="text-darkgrey">outube</span>
          <br /> W<span className="text-darkgrey">ebsite</span>
        </Text>
        <Text tag="h3" align="center">
          We should explore also smaller specific channels, like vegan community
          platforms and nomads.com.
        </Text>
      </Section>
      <Section title="Implementations - One off">
        <Cards>
          <Card
            tones={["k"]}
            title="B2B section"
            goal="short"
            channels="W"
            why="To get and keep more B2B clients."
            what="Web page(s) or e-commerce."
            when="April 2025."
            monitor="Increase in sales."
          >
            <Text>
              It would help promoting and selling No Ghost meat. It could even
              become an e-commerce part with checkout flow. Possible to sell to
              privates instead of only companies?
            </Text>
          </Card>
          <Card
            tones={["k", "f"]}
            title="Website tuning"
            goal="long"
            channels="W"
            why="To communicate the identity properly."
            what="Development hours."
            when="March 2025."
            monitor="Collective check."
          >
            <Text>
              Finishing up website details: SEO, make contact info more visible,
              decide about footer and navigation, implement visual effects on
              media. With the help of Alessandro De Vecchi.
            </Text>
            <Image src={burnPic} />
          </Card>
          <Card
            title="Space tuning"
            goal="short"
            channels="S"
            why="To communicate the identity properly and make the space comfortable and homey."
            what="Energy and effort."
            when="March 2025."
            monitor="Collective check."
          >
            <Text>
              Finishing up space details: Decorative elements (wall stuff,
              plants, art pieces, graphics), signage, music playlists, light
              sync, outdoor seating. With the help of Elin.
            </Text>
            <Image src={signPic} />
          </Card>
          <Card
            title="Window food"
            goal="short"
            channels="S"
            why="Get people in."
            what="Daily effort."
            when="ASAP"
            monitor="Qualitative judgement."
          >
            <Text>
              Showcasing one food item every day in the window, with a small
              text copy which describes the ingredients. Staff eats it at the
              end of shift. It could be coupled with a bakery smell machine.
            </Text>
            <Image src={displayPic} />
          </Card>
          <Card
            tones={["f"]}
            title="Community repost"
            goal="long"
            channels="W"
            why="To make the community visible."
            what="Relinks, reposts, little thumbs."
            when="April 2025."
            monitor="Web analytics."
          >
            <Text>
              Adding thumbs of social media posts or web reviews to the website.
              They could go along individual long form contents, like blog
              posts. Idea to represent reviews not with quantitative data but
              qualitative, for example extracted keywords.
            </Text>
            <Link theme="button" background="white" href="https://i-d.co/">
              <Text tag="div">i-D</Text>
            </Link>
          </Card>
          <Card
            tones={["f"]}
            title="Ghost gear"
            goal="short"
            channels="I - S - W"
            why="For the fans and to have another stream of income."
            what="Merchandise items on website."
            when="TBD"
            monitor="Sales."
          >
            <Text>
              Launch T-shirts with the slogan "Here There Are No Ghosts" on an
              e-commerce platform, offering stylish, minimalist designs to
              strengthen brand identity and engage fans. Buy at the restaurant.
            </Text>
            <Image src={shirtPic} />
          </Card>
          <Card
            title="1000 reviews"
            goal="short"
            channels="G"
            why="Have a significant presence on the most used platform in the world."
            what="Several actions."
            when="ASAP"
            monitor="Client feedback."
          >
            <Text>
              Strengthen Google Business profile (curated photos, videos),
              respond to reviews and add new ones. Check regarding posts and
              reservation features.
            </Text>
          </Card>
        </Cards>
      </Section>
      <Section title="Long-form content - Twice a month">
        <Cards>
          <Card
            tones={["k"]}
            title="Health insights"
            goal="long"
            channels="N - Y - W"
            why="To educate, attract and inspire."
            what="Articles, videos, newsletters."
            monitor="Analytics."
          >
            <Text>
              Engaging, thought-provoking content on vegan trends, health, and
              innovation—delivered with an inspiring hook that sparks curiosity
              and conversation.
            </Text>
            <Iframe src="https://www.youtube.com/embed/jDL9n_BQCg4" />
          </Card>
          <Card
            tones={["k"]}
            title="Better bites"
            goal="short"
            channels="Y - W"
            why="To educate, attract and inspire."
            what="Articles, videos."
            monitor="Analytics."
          >
            <Text>
              Honest, in-depth reviews and comparisons of No Ghost products,
              competitor offerings, and healthy alternatives—helping consumers
              make informed choices.
            </Text>
            <Iframe src="https://www.youtube.com/embed/u-WwhaDAPqk" />
          </Card>
          <Card
            tones={["k", "f"]}
            title="Community stories"
            goal="long"
            channels="Y - W"
            why="Make the community visible and show humans behind the brand."
            what="Videos."
            monitor="Analytics."
          >
            <Text>
              Long-form, video-driven content featuring interviews with staff
              and clients, fun social experiments like blind taste tests, and
              recipe showcases. This content connects the community, fosters
              engagement, and highlights the authentic, playful side of the
              brand.
            </Text>
            <Iframe src="https://www.youtube.com/embed/hPRseKbckSU" />
            <Iframe src="https://www.youtube.com/embed/i1ieD5Vwj8A" />
          </Card>
        </Cards>
      </Section>
      <Section title="Short-form content - Everyday">
        <div className="px-xs">
          <Text typo="md">
            All short-form content can benefit from automation, meaning:
            <br />
            - Scripts which process or create media according to No Ghost
            identity.
            <br />
            - AI tool which writes copy after training on our tone of voice.
            <br />- Post schedule randomizer to keep the channels fresh and
            humane.
          </Text>
        </div>
        <Cards>
          <Card
            tones={["f"]}
            title="Food showcase"
            goal="short"
            channels="G - I - Y"
            why="Emphasize quality, craftsmanship, and the appeal of
              plant-based cooking."
            what="Posts. Videos should be sharp, some color cuts, slow motion pans."
            when="30%"
            monitor="Analytics."
          >
            <Text>
              Videos and images focused on visually documenting the preparation
              process of No Ghost meals, from fresh ingredients to the final
              plated dish.
            </Text>
          </Card>
          <Card
            tones={["f"]}
            title="Real moments"
            goal="short"
            channels="G - I - Y"
            why="Show the human side of the brand and food enjoyment."
            what="Short videos"
            when="30%"
            monitor="Analytics."
          >
            <Text>
              Content featuring staff and clients in their everyday
              moments—juxtaposing their personal lives with their experiences at
              No Ghost. From a chef cooking in the kitchen to a customer
              arriving and enjoying a meal, these dynamic videos emphasize the
              human side of the brand and build a sense of community and
              authenticity.
            </Text>
            <Link
              theme="button"
              background="white"
              href="https://www.instagram.com/reel/C8H-8UytCJB"
            >
              <Text tag="div">DOJO</Text>
            </Link>
          </Card>
          <Card
            tones={["f"]}
            title="Cryptic vibes"
            goal="long"
            channels="G - I - Y"
            why="Engage and intrigue."
            what="Static images or psychedelic GIFs."
            when="10%"
            monitor="Analytics."
          >
            <Text>
              Abstract, eye-catching content designed purely for brand
              visibility. Random visuals, shapes, or messages with mysterious
              vibes that pique curiosity, boost engagement, and subtly showcase
              the No Ghost logo or graphics. Content is automated for
              consistent, low-effort interaction.
            </Text>
            <div className="shadow">
              <Image src={crypticPic} />
            </div>
          </Card>
          <Card
            tones={["k"]}
            title="Tips"
            goal="long"
            channels="G - I - Y"
            why="Inform and engage."
            what="Text posts."
            when="10%"
            monitor="Analytics."
          >
            <Text>
              Short, informative posts offering quick health insights—educating
              and inspiring your audience on the benefits of plant-based eating,
              nutritional facts, and wellness tips, all delivered in a concise,
              text-based format.
            </Text>
            <div className="shadow">
              <Image src={sleepPic} />
            </div>
          </Card>
          <Card
            tones={["f"]}
            title="Design focus"
            goal="short"
            channels="G - I - Y"
            why="Give off vibe and mood. Attract the hip."
            what="Posts."
            when="20%"
            monitor="Analytics."
          >
            <Text>
              Visual content highlighting the restaurant’s design elements,
              focusing on materials like metal, stone, and concrete, along with
              lighting and ambiance. The goal is to showcase the unique
              atmosphere of the space and its modern, brutalist aesthetic.
            </Text>
            <div className="shadow">
              <Image src={lunePic} />
            </div>
          </Card>
        </Cards>
      </Section>
      <Section title="Actions - Once in a while">
        <Cards>
          <Card
            tones={["k"]}
            title="Break deals"
            goal="short"
            channels="P - (W)"
            why="Attract the surrounding potential clients."
            what="Flyers (and basic web communication)."
            when="ASAP"
            monitor="Add a coupon and they need to bring it."
          >
            <Text>
              Targeted flyers with special lunch meal offers, designed for
              nearby businesses, universities, gyms, and libraries. These flyers
              highlight quick, nutritious meal options, with a focus on
              convenience, value, and plant-based quality to attract busy
              workers and students in the area.
            </Text>
            <Text>Map with relevant spots surrounding the restaurant:</Text>
            <Link
              theme="button"
              background="white"
              href="https://www.google.com/maps/d/u/0/edit?mid=1f2s8-5RG94O2z6H46E3s0MWXJWq2oWU"
            >
              <Text tag="div">Google Map</Text>
            </Link>
          </Card>
          <Card
            tones={["f"]}
            title="It's war"
            goal="short"
            channels="P"
            why="Attract unexpected potential clients."
            what="Stickers with digital hook."
            when="TBD"
            monitor="Via digital code."
          >
            <Text>
              Eye-catching guerrilla-style stickers featuring a code that leads
              to a special discount. Placed in high-traffic areas across the
              city, these stickers create curiosity and encourage passersby to
              scan for an exclusive offer, driving foot traffic and brand
              awareness in unexpected locations.
            </Text>
            <div className="shadow">
              <Image src={qrPic} />
            </div>
          </Card>
          <Card
            tones={["f"]}
            title="Referral program"
            goal="short"
            channels="N - W"
            why="Grow client base."
            what="Digital codes via email."
            when="TBD"
            monitor="Via digital code."
          >
            <Text>
              After making a reservation and signing up for marketing
              communications, customers receive an exclusive offer. If they
              return with a larger group, they’ll enjoy free food on their next
              visit.
            </Text>
          </Card>
          <Card
            title="Pop-up lab"
            goal="short"
            channels="S"
            why="Grow client base."
            what="Stands selling food."
            when="TBD"
            monitor="Partecipation."
          >
            <Text>
              A temporary pop-up in a new area to test a recipe, attract fresh
              customers, and spread brand awareness. A mix of tastings,
              limited-time specials, and immersive brand experience.
            </Text>
          </Card>
          <Card
            tones={["k"]}
            title="News"
            goal="long"
            channels="N - W - P"
            why="Keep a trusted community."
            what="Mostly a newsletter with a communication summery."
            when="Whenever necessary"
            monitor="Reach-outs and feedback forms."
          >
            <Text>
              Regular news summaries covering the latest from the brand and
              restaurant—menu changes, special events, collaborations, and
              business milestones. Keeps the community informed and engaged.
            </Text>
            <div className="gap-xs grid">
              <Link
                theme="button"
                background="white"
                href="https://github.com/freeCodeCamp/awesome-quincy-larson-emails"
              >
                <Text tag="div">Quincy Larson</Text>
              </Link>
              <Link
                theme="button"
                background="white"
                href="https://www.zsa.io/the-ergo"
              >
                <Text tag="div">ZSA</Text>
              </Link>
              <Link
                theme="button"
                background="white"
                href="https://garden3d.substack.com/p/expansive-brands"
              >
                <Text tag="div">Garden 3D</Text>
              </Link>
            </div>
          </Card>
        </Cards>
      </Section>
      <Section title="Events - Once a month">
        <Cards>
          <Card
            title="Sound & savor"
            goal="long"
            channels="S"
            why="Combine well-being and mindful eating to attract health-conscious guests."
            what="Listening session."
            when="TBD, perfect for sundays"
            monitor="Partecipation."
          >
            <Text>
              A sound healing session followed by a nourishing vegan lunch.
              Guests experience deep relaxation through immersive soundscapes
              before enjoying a wholesome meal.
            </Text>
            <Link
              theme="button"
              background="white"
              href="https://vibroacoustics.dk/"
            >
              <Text tag="div">VibroAcustics</Text>
            </Link>
            <div className="shadow">
              <Image src={relaxPic} />
            </div>
          </Card>
          <Card
            title="Flow"
            goal="long"
            channels="S"
            why="Attract an active, wellness-focused community and promote morning visits."
            what="Yoga."
            when="TBD, best on weekends"
            monitor="Partecipation."
          >
            <Text>
              A refreshing morning yoga session followed by a healthy vegan
              brunch, setting the tone for a balanced and energized day.
            </Text>
            <Text>Collaboration with Raket / Atelier du Mon?</Text>
            <Link
              theme="button"
              background="white"
              href="https://www.instagram.com/raket_antwerpen/"
            >
              <Text tag="div">Raket</Text>
            </Link>
          </Card>
          <Card
            title="Evening health talks"
            goal="long"
            channels="S"
            why="Position the brand as a hub for knowledge and conscious living."
            what="Expert talks."
            when="TBD, one weekeday."
            monitor="Partecipation."
          >
            <Text>
              Engaging talks by health experts on topics like nutrition,
              longevity, and wellness, paired with a cozy evening dining
              experience.
            </Text>
          </Card>
        </Cards>
      </Section>
    </main>
  );
};

export default StrategyPage;

const Section = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className="gap-m grid">
      <div className="px-xs">
        <Text tag="h2" typo="md" transform="uppercase" align="center">
          {title}
        </Text>
      </div>
      {children}
    </section>
  );
};

const Cards = ({
  theme = "default",
  children,
}: {
  theme?: string;
  children?: React.ReactNode;
}) => {
  const classes: Record<string, string> = {
    default: "grid-cols-[repeat(auto-fill,minmax(320px,1fr))]",
    small: "grid-cols-[repeat(auto-fill,minmax(320px,1fr))]",
    big: "grid-cols-[repeat(auto-fit,minmax(320px,1fr))]",
  };

  return (
    <div className={`gap-xs px-xs grid ${classes[theme]} items-start`}>
      {children}
    </div>
  );
};

const Card = ({
  tones,
  title,
  goal = "short",
  channels,
  why,
  what,
  when,
  monitor,
  background = "white",
  theme = "default",
  children,
}: {
  tones?: ("k" | "f")[];
  title: string;
  goal?: "short" | "long";
  channels?: string;
  why?: string;
  what?: string;
  when?: string;
  monitor?: string;
  background?: string;
  theme?: string;
  children?: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`grid opacity-0 ${isHovered ? "opacity-100" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className="grid grid-flow-col justify-between">
        <div className="grid grid-flow-col">
          {tones?.map((tone) => (
            <div key={tone} className={`${colors[tone]} p-xs`}>
              <Text typo="sm">{tone.toUpperCase()}</Text>
            </div>
          ))}
        </div>
        {channels && (
          <div className="p-xs bg-darkgrey">
            <Text typo="sm" wrap={false}>
              {channels}
            </Text>
          </div>
        )}
      </div>
      <div className={`p-xs gap-s grid ${colors[background]}`}>
        <Text tag="h3">{title}</Text>
        {children}
      </div>
      {theme === "default" && (
        <div className={`p-xs ${colors[goal]}`}>
          <Text typo="sm">
            Why? {why} <br />
            What? How? {what} <br />
            When? {when} <br />
            Monitor? {monitor} <br />
          </Text>
        </div>
      )}
    </div>
  );
};

const Iframe = ({ src }: { src: string }) => {
  return (
    <div className="shadow">
      <iframe src={`${src}`} allowFullScreen className="w-full" />
    </div>
  );
};
