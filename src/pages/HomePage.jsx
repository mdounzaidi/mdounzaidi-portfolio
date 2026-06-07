import React from "react";
import HeroSection from "../components/HeroSection";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Eyes from "../components/Eyes";
import Featured from "../components/Featured";
import FeaturedArticles from "../components/FeaturedArticles";
import Footer from "../components/Footer";
import MobileSkills from "../components/MobileSkills";

function HomePage() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <About />
      <div className="hidden sm:block">
        <Eyes />
      </div>
      <MobileSkills />
      <Featured />
      <FeaturedArticles />
      <Footer />
    </>
  );
}

export default HomePage;
