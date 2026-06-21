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
    image: "/images/founder-ingmar.jpg",
    video: founderVideo("ingmar"),
  },
  {
    name: "Marlon Koster",
    title: "Creative Director, Fitzroy",
    role: "Founder",
    image: "/images/founder-marlon.jpg",
    video: founderVideo("marlon"),
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
    image: "/images/founder-jonathan.jpg",
    video: founderVideo("jonathan"),
  },
];

export type Speaker = {
  slug: string;
  name: string;
  title: string;
  image: string; // collage (photo + glitch on transparent bg)
  // detail panel — placeholder until the real per-speaker expand designs land
  bio: string;
  website: string;
  handle: string;
  detailImage: string;
};

const SPEAKER_BIO =
  "John Doe is a multidisciplinary art director who will be stripping away the polished award reels to share the unvarnished reality of her career path. In this session, she’ll break down her biggest creative setbacks, how she navigated early-career mistakes, and the exact practical building blocks she used to launch her own independent studio.";

const speaker = (slug: string, name: string, title: string): Speaker => ({
  slug,
  name,
  title,
  image: `/images/speakers/${slug}.webp`,
  bio: SPEAKER_BIO,
  website: "www.johndoe.com",
  handle: "@johndoe",
  detailImage: "/images/speaker-4.png",
});

const EVENT_DESCRIPTION =
  "Lorem ipsum dolor sit amet consectetur. Faucibus blandit pharetra nisi suspendisse tellus mauris. Adipiscing mauris quam enim lobortis. Scelerisque risus morbi nullam dictum ut faucibus sit a. Vulputate duis pellentesque at nisl. Lorem ipsum dolor sit amet consectetur. Faucibus blandit pharetra nisi suspendisse tellus mauris. Adipiscing mauris quam enim lobortis. Scelerisque risus morbi nullam dictum ut faucibus sit a. Vulputate duis pellentesque at nisl.";

// Paragraphs separated by a blank line; rendered as separate <p> in EventBlock.
const CANNES_DESCRIPTION =
  "We bring together emerging creative talent and some of the industry's most experienced professionals for a morning of honest conversations, fresh perspectives, and meaningful connections.\n\n" +
  "Unlike traditional talks or panel discussions, Friday Foundry is built around the questions, challenges, and ambitions of the next generation. We start by listening to emerging creatives and gathering insights on what they want to discuss, learn, and challenge. Based on those insights, we invite industry leaders and give them one simple brief: one hour and complete creative freedom to explore the topic in their own way.\n\n" +
  "The result is a series of engaging, unfiltered sessions designed to spark dialogue, share real-world lessons, and create genuine exchange between those entering the industry and those helping shape its future.";

const SPEAKERS: Speaker[] = [
  speaker("odile", "Odile Breffa", "Strategy Lead at INNOCEAN Berlin"),
  speaker("jolyon", "Jolyon White", "Founder and CCO at 10Days London"),
  speaker(
    "farah",
    "Farah El Feghali",
    "Executive Creative Director\nMcCann Paris + La Roche-Posay",
  ),
];

export type EventItem = {
  id: string;
  title: string;
  dates: string;
  location: string;
  description: string;
  ticketUrl: string;
  speakers: Speaker[];
};

export const events: EventItem[] = [
  {
    id: "cannes-lions",
    title: "Cannes Lions",
    dates: "24–26.06.2026",
    location: "Location",
    description: CANNES_DESCRIPTION,
    ticketUrl:
      "https://www.eventbrite.com/e/friday-foundry-i-cannes-lions-2026-edition-tickets-1988931451512",
    speakers: SPEAKERS,
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
