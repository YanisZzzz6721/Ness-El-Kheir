import HeroSection          from "@/components/sections/HeroSection";
import AboutSection         from "@/components/sections/AboutSection";
import JoinSection          from "@/components/sections/JoinSection";
import GallerySection       from "@/components/sections/GallerySection";
import AnnouncementsSection from "@/components/sections/AnnouncementsSection";
import ContactSection       from "@/components/sections/ContactSection";
import FaqSection           from "@/components/sections/FaqSection";
import DonationSection      from "@/components/sections/DonationSection";
import { getSiteContent, getFaq } from "@/lib/supabase/queries";

export default async function Home() {
  const content = await getSiteContent();
  const faq     = await getFaq();

  return (
    <>
      <HeroSection    content={content} />
      <AboutSection   content={content} />
      <JoinSection    content={content} />
      <GallerySection />
      <AnnouncementsSection />
      <ContactSection content={content} />
      <FaqSection     faq={faq} />
      <DonationSection content={content} />
    </>
  );
}
