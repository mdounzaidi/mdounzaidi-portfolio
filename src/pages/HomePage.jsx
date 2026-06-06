import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Eyes from "../components/Eyes";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import MobileSkills from "../components/MobileSkills";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Marquee />
      <About />
      <div className="hidden sm:block">
        <Eyes />
      </div>
      <MobileSkills />
      <Featured />
      <Footer />
    </>
  );
}

export default HomePage;
