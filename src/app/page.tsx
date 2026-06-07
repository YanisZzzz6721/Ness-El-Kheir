import HeroSection         from "@/components/sections/HeroSection";
import AboutSection        from "@/components/sections/AboutSection";
import JoinSection         from "@/components/sections/JoinSection";
import GallerySection      from "@/components/sections/GallerySection";
import AnnouncementsSection from "@/components/sections/AnnouncementsSection";
import ContactSection      from "@/components/sections/ContactSection";
import FaqSection          from "@/components/sections/FaqSection";
import DonationSection     from "@/components/sections/DonationSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <JoinSection />
      <GallerySection />
      <AnnouncementsSection />
      <ContactSection />
      <FaqSection />
      <DonationSection />
    </>
  );
}
