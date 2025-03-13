"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";

const navItems = [
  { name: "CV", path: "/cv" },
  { name: "Work", path: "/work" },
  { name: "Hire Me", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020611]/90 backdrop-blur-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center text-white pl-10 xl:pl-0">
            <span className="font-handlee text-2xl md:text-3xl">*</span>
            <span className="font-handlee text-2xl md:text-3xl">Krish</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li
                    key={item.path}
                    className={`${styles.navItem} ${
                      isActive ? styles.active : ""
                    } relative`}
                  >
                    <Link
                      href={item.path}
                      className="font-comfortaa text-white text-sm lg:text-base py-1"
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-[5px] left-0 right-0 h-[3px] bg-[#f0b429] rounded-sm"
                          layoutId="navUnderline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Hamburger Menu Button */}
          <div
            className={`${styles.hamburgerContainer} ${
              isMenuOpen ? styles.hamburgerOpen : ""
            } md:hidden`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#020611]/98 backdrop-blur-md md:hidden z-40
                    transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full pt-24 px-8">
          {/* Navigation Links */}
          <nav className="flex-grow">
            <ul className="flex flex-col space-y-8">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path} className="relative">
                    <Link
                      href={item.path}
                      className={`font-comfortaa text-2xl block py-2 transition-colors duration-200
                                ${
                                  isActive
                                    ? "text-[#f0b429]"
                                    : "text-white hover:text-[#f0b429]/80"
                                }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-2 left-0 w-12 h-[3px] bg-[#f0b429] rounded-full"
                          layoutId="mobileNavUnderline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer with social links or other info */}
          <div className="py-8 mt-auto border-t border-white/10">
            <p className="text-white/60 text-sm font-comfortaa">
              © {new Date().getFullYear()} Krish Khanna
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-white/80 hover:text-[#f0b429] transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-[#f0b429] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-[#f0b429] transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
