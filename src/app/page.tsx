import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ObjectiveSection } from "@/components/ObjectiveSection";
import { AudienceSection } from "@/components/AudienceSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ExpectedResultsSection } from "@/components/ExpectedResultsSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { TransparencySection } from "@/components/TransparencySection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <ObjectiveSection />
        <AudienceSection />
        <HowItWorksSection />
        <ExpectedResultsSection />
        <BenefitsSection />
        <TransparencySection />
      </main>
      <Footer />
    </>
  );
}