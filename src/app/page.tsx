import Image from "next/image";
import Header from "@/components/homepage/Header";
import Section from "@/components/homepage/Section";
import Layanan from "@/components/homepage/Layanan";
import TentangKami from "@/components/homepage/TentangKami";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Section />
      <Layanan />
      <TentangKami />
      <Footer />
    </>
  );
}
