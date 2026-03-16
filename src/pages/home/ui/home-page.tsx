import { Suspense, useEffect } from "react";
import {
  About,
  Contact,
  Footer,
  Header,
  Hero,
  Portfolio,
  preloadHomeChunks,
  Services,
} from "./home-preloads";

export function HomePage() {
  useEffect(() => {
    void preloadHomeChunks();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
        <Suspense fallback={null}>
          <Services />
        </Suspense>
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export { preloadHomeChunks };
