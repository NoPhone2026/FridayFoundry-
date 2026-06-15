import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import PreviousEvents from "@/components/PreviousEvents";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <About />
      <Events />
      <PreviousEvents />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
}
