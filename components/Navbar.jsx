import React, { useState, useEffect } from "react";
import Link from "next/link";
import Container from "./common/Container";
import FullContainer from "./common/FullContainer";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Navbar({ className }) {
  const [scrolled, setScrolled] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <FullContainer
      className={`py-2 lg:py-4 z-20 sticky top-0 transition-all duration-300 shadow-xl ${
        scrolled ? "pt-2 lg:pt-4 bg-white  text-black" : `${className}`
      }`}
    >
      <Container>
        <div className="flex items-center justify-between w-full p-2 lg:p-0">
          

          {/* Menu Button for Small Screens */}
          <div className="lg:hidden">
            <Menu className="h-6 w-6 cursor-pointer" onClick={toggleSidebar} />
          </div>

        
        </div>
      </Container>

      {/* Sidebar for Small Screens */}
      {sidebar && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-white z-30 flex flex-col items-center p-4">
          <button
            className="self-end text-xl p-2"
            onClick={toggleSidebar}
          >
            ✖️
          </button>
          <Link className="navLink my-2 text-xl" href="/about" onClick={toggleSidebar}>
            About
          </Link>
          <Link className="navLink my-2 text-xl" href="/contact" onClick={toggleSidebar}>
            Contact Us
          </Link>
        </div>
      )}
    </FullContainer>
  );
}
