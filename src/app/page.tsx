import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import HotelIntroduction from "@/components/Home/HotelIntroduction";
import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HotelIntroduction />
      <FeaturesSection />
    </div>
  );
};

export default Home;
