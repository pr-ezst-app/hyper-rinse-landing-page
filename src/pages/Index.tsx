import { useState } from "react";
import NavBar from "@/components/NavBar";
import HeroSections from "@/components/HeroSections";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";

export default function Index() {
  const [selectedService, setSelectedService] = useState("");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceClick = (value: string) => {
    setSelectedService(value);
    scrollTo("contact");
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-dm overflow-x-hidden">
      <NavBar scrollTo={scrollTo} />
      <HeroSections scrollTo={scrollTo} onServiceClick={handleServiceClick} />
      <ReviewsSection />
      <ContactSection selectedService={selectedService} setSelectedService={setSelectedService} />
    </div>
  );
}
