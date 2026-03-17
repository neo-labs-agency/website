import { HomePage } from "@/pages/home";

const SITE_URL = "https://neolabsagency.com";
const TITLE = "Neo Labs Agency — Digital Development";
const DESCRIPTION = "Web, SaaS, bots, API integration.";
const OG_IMAGE = "/favicon/favicon-96x96.png";

export function meta() {
  return [
    // Basic SEO
    { title: TITLE },
    { name: "description", content: DESCRIPTION },

    // Canonical
    { rel: "canonical", href: SITE_URL },

    // Open Graph
    { property: "og:title", content: TITLE },
    { property: "og:description", content: DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { property: "og:image", content: OG_IMAGE },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: TITLE },
    { name: "twitter:description", content: DESCRIPTION },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

export default function Home() {
  return <HomePage />;
}
