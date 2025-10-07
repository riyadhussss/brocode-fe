import Header from "@/components/homepage/Header";
import Layanan from "@/components/homepage/Layanan";
import TentangKami from "@/components/homepage/TentangKami";
import Footer from "@/components/Footer";
import HomeSection from "@/components/homepage/Section";

export default function Home() {
  return (
    <>
      <Header />
      <HomeSection />
      <Layanan />
      <TentangKami />
      <Footer />
    </>
  );
}
