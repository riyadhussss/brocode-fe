import React from "react";
import Header from "@/components/homepage/Header";
import Layanan from "@/components/homepage/Layanan";
import TentangKami from "@/components/homepage/TentangKami";
import Footer from "@/components/Footer";
import HomeSection from "@/components/homepage/Section";
import { Navbar1 } from "@/components/navbar1";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <Navbar1 />
      <div id="homesection">
        <HomeSection />
      </div>
      <div id="layanan">
        <Layanan />
      </div>
      <div id="tentang-kami">
        <TentangKami />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  );  
}
