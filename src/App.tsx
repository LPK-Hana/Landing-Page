import { Careers, Gallery, News, Product } from "./Sections";
import { Footer, Marquee } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Intro } from "./Intro";
import { SmoothScroll } from "./SmoothScroll";

export function App() {
  return (
    <SmoothScroll>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Gallery />
        <Product />
        <Marquee />
        <News />
        <Careers />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
