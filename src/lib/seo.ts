// Single source of truth for site-level SEO/AEO values + structured data.
import { events, contact } from "@/lib/content";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://friday-foundry.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Friday Foundry";

export const SITE_DESCRIPTION =
  "Friday Foundry runs live events connecting emerging creatives with established industry leaders — open conversations, group sessions, and one hour of complete carte blanche.";

// flatten multi-line copy into a single sentence for machine-readable fields
const inline = (s: string) => s.replace(/\s*\n\s*/g, ", ").trim();

const contactLines = contact.columns.flatMap((c) => c.lines);
const INSTAGRAM =
  contactLines.find((l) => l.href?.includes("instagram.com"))?.href ??
  "https://www.instagram.com/friday_foundry/";
const EMAIL = (
  contactLines.find((l) => l.href?.startsWith("mailto:"))?.href ??
  "mailto:hello@friday-foundry.com"
).replace("mailto:", "");

// "24–26.06.2026" -> { startDate: 2026-06-24, endDate: 2026-06-26 }
function parseDates(d: string): { startDate?: string; endDate?: string } {
  const m = d.match(/(\d{1,2})(?:[–-](\d{1,2}))?\.(\d{1,2})\.(\d{4})/);
  if (!m) return {};
  const [, d1, d2, mo, y] = m;
  const p = (n: string) => n.padStart(2, "0");
  return { startDate: `${y}-${p(mo)}-${p(d1)}`, endDate: `${y}-${p(mo)}-${p(d2 ?? d1)}` };
}

const httpsUrl = (s: string) => `https://${s.replace(/^https?:\/\//, "")}`;

// Schema.org graph: Organization + WebSite + the upcoming Event (with speakers
// as performers and the ticket offer). Consumed by search + AI answer engines.
export function buildJsonLd() {
  const ev = events[0];
  const { startDate, endDate } = parseDates(ev.dates);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        description: SITE_DESCRIPTION,
        email: EMAIL,
        sameAs: [INSTAGRAM],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Event",
        name: `${SITE_NAME} · Cannes Lions 2026 Edition`,
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Cannes",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cannes",
            addressCountry: "FR",
          },
        },
        description: inline(ev.description.split(/\n\s*\n/)[0]),
        image: `${SITE_URL}/og.png`,
        organizer: { "@id": `${SITE_URL}/#organization` },
        performer: ev.speakers.map((s) => ({
          "@type": "Person",
          name: s.name,
          jobTitle: inline(s.title),
          ...(s.website ? { url: httpsUrl(s.website) } : {}),
          ...(s.instagram ? { sameAs: [s.instagram] } : {}),
        })),
        offers: {
          "@type": "Offer",
          url: ev.ticketUrl,
          availability: "https://schema.org/InStock",
          category: "Ticket",
        },
      },
    ],
  };
}
