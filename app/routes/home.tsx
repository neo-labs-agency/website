import { HomePage } from "@/pages/home";

export function meta() {
  return [
    { title: "Neo Labs Agency — Digital Development" },
    {
      name: "description",
      content:
        "Մատչելի Թվային լուծումներ ձեր բիզնեսի համար. Web, SaaS, bots, API integration.",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
