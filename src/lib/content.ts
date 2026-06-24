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
const CANNES_DESCRIPTION =
  "We bring together emerging creative talent and some of the industry's most experienced professionals for a morning of honest conversations, fresh perspectives, and meaningful connections.\n\n" +
  "Unlike traditional talks or panel discussions, Friday Foundry is built around the questions, challenges, and ambitions of the next generation. We start by listening to emerging creatives and gathering insights on what they want to discuss, learn, and challenge. Based on those insights, we invite industry leaders and give them one simple brief: one hour and complete creative freedom to explore the topic in their own way.\n\n" +
  "The result is a series of engaging, unfiltered sessions designed to spark dialogue, share real-world lessons, and create genuine exchange between those entering the industry and those helping shape its future.";

const SPEAKERS: Speaker[] = [
  speaker(
    "odile",
    "Odile Breffa",
    "Strategy Lead at INNOCEAN Berlin",
    "Odile Breffa is Strategy Lead at INNOCEAN Berlin, combining cultural insight and creativity to drive impactful brand strategies. With a background in sociology, ethnography, PR, and artist management, she brings a distinctly human perspective to innovation.\n\nShe has served as a juror for Cannes Lions and Effie Europe, and as President of the D&AD Orbit Extra Jury. Her award-winning work includes the Grand Prix-winning The First Speech campaign for Reporters Without Borders and the acclaimed Vulva Spaceship campaign, both recognized internationally for their cultural relevance and creative impact.",
    {
      website: "innoceanberlin.com",
      handle: "@innocean_berlin",
      instagram: "https://www.instagram.com/innocean_berlin",
    },
  ),
  speaker(
    "jolyon",
    "Jolyon White",
    "Founder and CCO at 10Days London",
    "Jolyon White is Founder and Chief Creative Officer of 10 Days, one of London's most talked-about independent creative agencies.\n\nPreviously at Wieden+Kennedy, Mother, and Channel 4, he has created memorable award-winning work for brands including Nike, Lurpak, MoneySupermarket, and the Paralympics. Known for challenging industry conventions and championing bold ideas over process, Jolyon brings a unique perspective on creativity, advertising, and the future of the agency model. He is also an award-winning film director.",
    {
      website: "www.10days.london",
      handle: "@10days.london",
      instagram: "https://www.instagram.com/10days.london/",
    },
  ),
  speaker(
    "farah",
    "Farah El Feghali",
    "Executive Creative Director\nMcCann Paris + La Roche-Posay",
    "ECD @ McCann Paris, with 14+ years in 35 markets. Trilingual. 2× Cannes GP, creator of #Optink. Miami Ad School + American University of Beirut. Previously @ R/GA New York, BBDO Berlin, Ogilvy Tokyo & BBDO Beirut.",
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
