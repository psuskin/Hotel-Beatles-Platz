import { unstable_setRequestLocale } from 'next-intl/server';
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import HotelIntroduction from "@/components/Home/HotelIntroduction";
import RestaurantShowcase from "@/components/Home/RestaurantBar";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      <HeroSection />
      <HotelIntroduction />
      <FeaturesSection />
      <RestaurantShowcase />
    </div>
  );
}
