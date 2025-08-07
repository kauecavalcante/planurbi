"use client";
import { useState, useEffect } from 'react';
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ObjectiveSection } from "@/components/ObjectiveSection";
import { AudienceSection } from "@/components/AudienceSection";
import { WorkshopsSection } from "@/components/WorkshopsSection"; 
import { ExpectedResultsSection } from "@/components/ExpectedResultsSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { TransparencySection } from "@/components/TransparencySection";
import { Footer } from "@/components/Footer";
import { CallToActionSection } from "@/components/CallToActionSection";
import { BannerModal } from '@/components/BannerModal'; 

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  // 1. Link para o banner do modal
  const seminarUrl = "/programacao"; 
  // 2. Link para o questionário (botão e QR Code)
  const questionnaireUrl = "https://docs.google.com/forms/d/e/1FAIpQLScDO9BoQoZRkVd_OcgV1wyWCo9B9pln14kgpUsVmC5nw4LcsA/viewform"; 

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('planurbiModalSeen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 1500); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    sessionStorage.setItem('planurbiModalSeen', 'true');
    setIsModalOpen(false);
  };

  return (
    <>
      
      
      {isModalOpen && <BannerModal onClose={handleCloseModal} formUrl={seminarUrl} />}
      
      <Header />
      <main>
        <Hero />
        
       
        <CallToActionSection formUrl={questionnaireUrl} /> 
        <AboutSection />
        <WorkshopsSection /> 
        <ObjectiveSection />
        <AudienceSection />
        <ExpectedResultsSection />
        <BenefitsSection />
        <TransparencySection />
      </main>
      <Footer />
    </>
  );
}