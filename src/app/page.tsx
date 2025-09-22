import Image from "next/image";
import Header from "@/components/Homepage/Header";
import Section from "@/components/Homepage/Section";
import Layanan from "@/components/Homepage/Layanan";
import TentangKami from "@/components/Homepage/TentangKami";
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
