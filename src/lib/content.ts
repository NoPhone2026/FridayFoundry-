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
    "Friday Foundry is a series of live, recurring events designed to bring together established creative professionals with students and people at the beginning of their careers. Our goal is to build a direct, accessible bridge between the classroom and the industry, stripping away the intimidating corporate facades to create an open space for real networking, learning, and growth.",
  image: "/images/intro.png",
};

export type Founder = {
  name: string;
  title: string;
  role: "Founder" | "Board member";
  image: string;
};

export const founders: Founder[] = [
  { name: "Ingmar Larsen", title: "Founder, ThisAgency", role: "Founder", image: "/images/founder-a.png" },
  { name: "Marlon Koster", title: "Creative Director, Fitzroy", role: "Founder", image: "/images/founder-b.png" },
  { name: "Henrique Louzada", title: "Creative Director, WINK", role: "Board member", image: "/images/founder-a.png" },
  { name: "Jonathan van Loon", title: "Senior Art Director, APS", role: "Board member", image: "/images/founder-a.png" },
];

export type Speaker = {
  name: string;
  image: string;
  bio: string;
  website: string;
  handle: string;
  detailImage: string;
};

const SPEAKER_BIO =
  "John Doe is a multidisciplinary art director who will be stripping away the polished award reels to share the unvarnished reality of her career path. In this session, she’ll break down her biggest creative setbacks, how she navigated early-career mistakes, and the exact practical building blocks she used to launch her own independent studio.";

const speaker = (name: string, image: string): Speaker => ({
  name,
  image,
  bio: SPEAKER_BIO,
  website: "www.johndoe.com",
  handle: "@johndoe",
  detailImage: "/images/speaker-4.png",
});

const EVENT_DESCRIPTION =
  "Lorem ipsum dolor sit amet consectetur. Faucibus blandit pharetra nisi suspendisse tellus mauris. Adipiscing mauris quam enim lobortis. Scelerisque risus morbi nullam dictum ut faucibus sit a. Vulputate duis pellentesque at nisl. Lorem ipsum dolor sit amet consectetur. Faucibus blandit pharetra nisi suspendisse tellus mauris. Adipiscing mauris quam enim lobortis. Scelerisque risus morbi nullam dictum ut faucibus sit a. Vulputate duis pellentesque at nisl.";

const SPEAKERS: Speaker[] = [
  speaker("Bob Johnson", "/images/speaker-3.png"),
  speaker("Jane Doe", "/images/speaker-2.png"),
  speaker("John Doe", "/images/speaker-1.png"),
  speaker("Bob Johnson", "/images/speaker-4.png"),
  speaker("Bob Johnson", "/images/speaker-3.png"),
  speaker("Jane Doe", "/images/speaker-2.png"),
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
    description: EVENT_DESCRIPTION,
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
  { title: "Cannes Lions edition", date: "07.04.2026" },
  { title: "1st edition @cake", date: "07.04.2026" },
  { title: "Lorem ipsum", date: "07.04.2026" },
  { title: "Dolor whatever", date: "07.04.2026" },
  { title: "Idk edition @rotterdam", date: "07.04.2026" },
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
    { label: "general inquiries", lines: ["hello@fridayfoundry.com", "+00 000 000 000"] },
    { label: "address", lines: ["Streetname 00,", "Amsterdam"] },
    { label: "collaborations", lines: ["collab@fridayfoundry.com", "+00 000 000 000"] },
    { label: "Instagram", lines: ["@fridayfoundry"] },
  ],
};
