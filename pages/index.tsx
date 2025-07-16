import OurStorySection from "@/components/Home/OurStorySection";
import HeroSection from "@/components/Home/HerSection";

export default function Home() {
  return (
    <>
          <HeroSection />     
        <OurStorySection />

      {/* Contained sections */}
      <div className="container">
        <section className="mb-5">
          <h2 className="text-primary fw-bold mb-3">Section 3</h2>
          <p>This is the third section content.</p>
        </section>
      </div>
    </>
  );
}
