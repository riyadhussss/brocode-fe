"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/assets/logo.png",
    alt: "Brocode Aceh Logo",
  },
  menu = [
    { title: "Beranda", url: "#homesection" },
    { title: "Layanan", url: "#layanan" },
    { title: "Tentang Kami", url: "#tentang-kami" },
    { title: "Kontak", url: "#footer" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
}: Navbar1Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    // Check if it's a hash link
    if (url.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <section
      className={`fixed p-4 top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black backdrop-blur-md border-b border-gray-600"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <nav className="hidden justify-between items-center lg:flex relative">
          {/* Logo - Kiri */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={75}
                height={75}
                priority
              />
            </a>
          </div>

          {/* Navigation Menu - Tengah (Absolute) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item, handleMenuClick))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons - Kanan */}
          <div className="flex gap-2 flex-shrink-0">
            <Button asChild variant="outlineYellow" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button asChild size="sm" variant={"yellow"}>
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={75}
                height={75}
                className="h-8 w-auto dark:invert"
                priority
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-black border-white/20">
                <SheetHeader className="relative">
                  <SheetTitle className="flex items-center justify-between">
                    <a href={logo.url} className="flex items-center gap-2">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={75}
                        height={75}
                        className="h-8 w-auto dark:invert"
                      />
                    </a>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 hover:text-white"
                      >
                        <X className="size-6" />
                      </Button>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <nav className="flex flex-col gap-2">
                    {menu.map((item) =>
                      renderMobileMenuItem(item, handleMenuClick)
                    )}
                  </nav>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outlineYellow" className="w-full">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild variant="yellow" className="w-full">
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (
  item: MenuItem,
  handleMenuClick: (e: React.MouseEvent<HTMLAnchorElement>, url: string) => void
) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <a
          href={item.url}
          onClick={(e) => handleMenuClick(e, item.url)}
          className="text-white bg-transparent  group inline-flex h-12 w-max items-center justify-center rounded-md px-6 py-2 text-base font-semibold transition-colors hover:underline underline-offset-8"
        >
          {item.title}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (
  item: MenuItem,
  handleMenuClick: (e: React.MouseEvent<HTMLAnchorElement>, url: string) => void
) => {
  return (
    <a
      key={item.title}
      href={item.url}
      onClick={(e) => handleMenuClick(e, item.url)}
      className="text-base font-semibold text-white hover:text-[#FDFB03] hover:bg-white/10 transition-colors py-3 px-4 block rounded-md"
    >
      {item.title}
    </a>
  );
};

export { Navbar1 };
