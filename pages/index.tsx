import HeroSection from "@/components/Home/HerSection";
import OurStorySection from "@/components/Home/OurStorySection";
import Custom3DCarousel from "@/components/Home/carousel/Carousel";
import ConsultUsSection from "@/components/Home/consult section/ConsultUsSection";

export default function Home() {
  return (
    <>
          <HeroSection />     
        <OurStorySection />
      <Custom3DCarousel />
     <ConsultUsSection/>
    </>
  );
}
