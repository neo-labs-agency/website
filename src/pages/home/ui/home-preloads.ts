/**
 * Lazy-loaded home sections and preload functions.
 * Use preload on mount (home page) or on nav link hover (header) to start loading chunks early.
 */
import { lazyWithPreload } from "@/shared/lib/lazy-with-preload";

const [Header, preloadHeader] = lazyWithPreload(() =>
  import("@/widgets/header").then((m) => ({ default: m.Header }))
);
const [Hero, preloadHero] = lazyWithPreload(() =>
  import("@/widgets/hero").then((m) => ({ default: m.Hero }))
);
const [Services, preloadServices] = lazyWithPreload(() =>
  import("@/widgets/services").then((m) => ({ default: m.Services }))
);
const [About, preloadAbout] = lazyWithPreload(() =>
  import("@/widgets/about").then((m) => ({ default: m.About }))
);
const [Portfolio, preloadPortfolio] = lazyWithPreload(() =>
  import("@/widgets/portfolio").then((m) => ({ default: m.Portfolio }))
);
const [Contact, preloadContact] = lazyWithPreload(() =>
  import("@/widgets/contact").then((m) => ({ default: m.Contact }))
);
const [Footer, preloadFooter] = lazyWithPreload(() =>
  import("@/widgets/footer").then((m) => ({ default: m.Footer }))
);

export { Header, Hero, Services, About, Portfolio, Contact, Footer };
export {
  preloadHeader,
  preloadHero,
  preloadServices,
  preloadAbout,
  preloadPortfolio,
  preloadContact,
  preloadFooter,
};

export async function preloadHomeChunks(): Promise<void> {
  await preloadHeader();
  await preloadHero();
  await preloadServices();
  await preloadAbout();
  await preloadPortfolio();
  await preloadContact();
  await preloadFooter();
}
