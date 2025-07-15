import OurStorySection from "@/components/Home/OurStorySection";
import Navbar from "../components/Navbar";
import HeroSection from "@/components/Home/HerSection";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Add padding top equal to navbar height (e.g., 80px) */}
      <main className="container pt-5 " style={{  }}>
        <section className="mb-5">
        <HeroSection/>
        </section>

        <section className="mb-5">
        <OurStorySection />
        </section>

        <section className="mb-5">
          <h2 className="text-primary fw-bold mb-3">Section 3</h2>
          <p>This is the third section content.</p>
        </section>
      </main>
    </>
  );
}
