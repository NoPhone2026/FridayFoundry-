// All site copy + data, lifted from the Figma. Swap real values in later.

export const nav = {
  links: [
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Grab a Seat", href: "#events" },
};

export const intro = {
  body:
    "Friday Foundry brings emerging creatives and industry leaders together for open conversations. Topics are proposed by the next generation and explored in group sessions led by seasoned professionals. The twist? Every guest gets one hour of complete carte blanche.",
  image: "/images/intro.png",
};

export type FounderVideo = { webm: string; mp4: string; poster: string };

export type Founder = {
  name: string;
  title: string;
  role: "Founder" | "Board member";
  image: string; // static fallback (placeholder, or the video's poster)
  video?: FounderVideo;
};

const founderVideo = (slug: string): FounderVideo => ({
  webm: `/videos/${slug}.webm`,
  mp4: `/videos/${slug}.mp4`,
  poster: `/images/founder-${slug}.jpg`,
});

export const founders: Founder[] = [
  {
    name: "Ingmar Larsen",
    title: "Founder, ThisAgency",
    role: "Founder",
    image: "/images/founder-ingmar.png",
    video: { ...founderVideo("ingmar"), poster: "/images/founder-ingmar.png" },
  },
  {
    name: "Marlon Koster",
    title: "Creative Director, Fitzroy",
    role: "Founder",
    image: "/images/founder-marlon.png",
    video: { ...founderVideo("marlon"), poster: "/images/founder-marlon.png" },
  },
  {
    name: "Henrique Louzada",
    title: "Creative Director, WINK",
    role: "Board member",
    image: "/images/founder-a.png",
  },
  {
    name: "Jonathan van Loon",
    title: "Senior Art Director, APS",
    role: "Board member",
    image: "/images/founder-jonathan.png",
    video: { ...founderVideo("jonathan"), poster: "/images/founder-jonathan.png" },
  },
];

export type Speaker = {
  slug: string;
  name: string;
  title: string;
  image: string; // collage (photo + glitch on transparent bg)
  // card back ("About the speaker & session")
  bio: string;
  website?: string;
  handle?: string;
  instagram?: string; // profile URL for the handle
};

const speaker = (
  slug: string,
  name: string,
  title: string,
  bio: string,
  links?: { website: string; handle: string; instagram: string },
): Speaker => ({
  slug,
  name,
  title,
  image: `/images/speakers/${slug}.webp`,
  bio,
  website: links?.website,
  handle: links?.handle,
  instagram: links?.instagram,
});

const EVENT_DESCRIPTION =
  "Lorem ipsum dolor sit amet consectetur. Faucibus blandit pharetra nisi suspendisse tellus mauris. Adipiscing mauris quam enim lobortis. Scelerisque risus morbi nullam dictum ut faucibus sit a. Vulputate duis pellentesque at nisl. Lorem ipsum dolor sit amet consectetur. Faucibus blandit pharetra nisi suspendisse tellus mauris. Adipiscing mauris quam enim lobortis. Scelerisque risus morbi nullam dictum ut faucibus sit a. Vulputate duis pellentesque at nisl.";

// Paragraphs separated by a blank line; rendered as separate <p> in EventBlock.
const AMSTERDAM_DESCRIPTION =
  "On November 27th from 15:00–19:00 at Fitzroy in Amsterdam, Friday Foundry brings together emerging creative talent and some of the industry’s most experienced professionals for an afternoon of honest conversations, fresh perspectives, and meaningful connections.\n\n" +
  "Unlike traditional talks or panel discussions, Friday Foundry is built around the questions, challenges, and ambitions of the next generation. We start by listening to emerging creatives and gathering insights on what they want to discuss, learn, and challenge. Based on those insights, we invite industry leaders and give them one simple brief: one hour and complete creative freedom to explore the topic in their own way.\n\n" +
  "The result is a series of engaging, unfiltered sessions designed to spark dialogue, share real-world lessons, and create genuine exchange between those entering the industry and those helping shape its future.\n\n" +
  "Reserve your seat right here. We’re looking forward to an unforgettable afternoon at Fitzroy :)";

const SPEAKERS: Speaker[] = [
  speaker(
    "emilio",
    "Emilio de Haan",
    "Executive Creative Director, Founder of Tranquil",
    "Emilio is a multiple award-winning Executive Creative Director. Founder of Tranquil creative club and, before that, the rebellious agency HERC. Mexican-Dutch, a connector by nature, working where advertising, brand identity, design and pop culture collide, and co-founder of Plusplusone, which opens doors for underrepresented creatives between 16 and 28.",
  ),
  speaker(
    "eddy",
    "Eddy Salfischberger",
    "Managing Director at Alfred",
    "Eddy Salfischberger is managing director at Amsterdam based creative agency Alfred, where his main job is making sure the agency is ready today for tomorrow. Since joining in 2016, he has helped Alfred evolve from a predominantly TV-led agency into one that pursues client growth through a broader range of creative ideas and channels.\n\nEddy started his career at Euro RSCG 4D, one of the Netherlands’ first leading digital agencies. His curiosity about technology has stayed with him ever since. Today, he experiments a lot with AI, including a personal advisory board of agents playing the optimist, pessimist, and realist. He believes progress starts with staying curious and being willing to try, fail, ask, and learn.",
  ),
  speaker(
    "cindy",
    "Cindy Fleur",
    "Founder and Strategy Director at The Business of Culture",
    "Cindy Fleur is a Dutch brand, culture, and business strategist, as well as the Founder and Strategy Director of the strategy studio The Business of Culture. Driven by the belief that perspective shapes outcomes, she helps organizations reframe complex strategic challenges before moving into execution.\n\nIn addition to leading her studio, Cindy is the Co-Founder and Program Director of The Decision Space and contributes as a trendwatcher and author for the Trendrede, an annual independent forecast on societal and cultural shifts. With an academic background in Communication and Information Sciences from Vrije Universiteit Amsterdam, she has advised a diverse portfolio of clients, including the Rijksmuseum, Rituals, Samsung, and the City of Amsterdam, and frequently shares her insights as a speaker at events like What Design Can Do.",
  ),
];

export type Venue = {
  name: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string; // ISO 3166-1 alpha-2
};

export type EventItem = {
  id: string;
  title: string;
  dates: string;
  location: string;
  description: string;
  ticketUrl: string;
  speakers: Speaker[];
  // Machine-readable details for the structured data in seo.ts
  fullName?: string;
  start?: string; // ISO 8601 with UTC offset
  end?: string;
  venue?: Venue;
  price?: { amount: number; currency: string };
};

export const events: EventItem[] = [
  {
    id: "amsterdam-3rd-edition",
    title: "Amsterdam",
    dates: "27.11.2026",
    location: "Fitzroy",
    description: AMSTERDAM_DESCRIPTION,
    ticketUrl:
      "https://www.eventbrite.com/e/friday-foundry-i-3rd-edition-tickets-2003428050229",
    speakers: SPEAKERS,
    fullName: "Friday Foundry · 3rd Edition, Amsterdam",
    start: "2026-11-27T15:00:00+01:00",
    end: "2026-11-27T19:00:00+01:00",
    venue: {
      name: "Fitzroy",
      streetAddress: "Prins Hendrikkade 192A",
      postalCode: "1011 TD",
      city: "Amsterdam",
      country: "NL",
    },
    price: { amount: 8.7, currency: "EUR" },
  },
  {
    id: "next-event",
    title: "Next Event",
    dates: "24–26.06.2026",
    location: "Location",
    description: EVENT_DESCRIPTION,
    ticketUrl:
      "https://www.eventbrite.com/e/friday-foundry-i-cannes-lions-2026-edition-tickets-1988931451512",
    speakers: SPEAKERS,
  },
];

export type PreviousEvent = { title: string; date: string };

export const previousEvents: PreviousEvent[] = [
  { title: "2nd edition @Cannes", date: "24–26.06.2026" },
  { title: "1st edition @cake", date: "07.04.2026" },
];

export const newsletter = {
  title: "Join our newsletter",
  body:
    "Subscribe to get early access to upcoming event tickets, unedited speaker insights, and the practical resources you need to build your career.",
  placeholder: "janedoe@gmail.com",
  cta: "Join",
};

export const contact = {
  heading: "Contact Us",
  tagline: "Let’s build together.",
  body:
    "Friday Foundry is an open canvas. Whether you want to take the stage as a speaker, pitch a great idea for a collaboration, or just ask us a question—we want to hear from you.",
  columns: [
    {
      label: "general inquiries",
      lines: [
        { text: "hello@friday-foundry.com", href: "mailto:hello@friday-foundry.com" },
      ],
    },
    {
      label: "Instagram",
      lines: [
        {
          text: "@friday_foundry",
          href: "https://www.instagram.com/friday_foundry/",
        },
      ],
    },
  ],
};
