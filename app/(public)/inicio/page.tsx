import { BeachesSection } from "@/components/beaches-section";
import { CtaSection } from "@/components/cta-section";
import { FeaturedProperties } from "@/components/featured-properties";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturedProperties />
      <BeachesSection />
      <CtaSection />
    </main>
  );
}
