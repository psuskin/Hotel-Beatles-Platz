import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import HotelIntroduction from "@/components/Home/HotelIntroduction";
import RestaurantShowcase from "@/components/Home/RestaurantBar";

import React from "react";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HotelIntroduction />
      <FeaturesSection />
      <RestaurantShowcase />
    </div>
  );
};

export default Home;
