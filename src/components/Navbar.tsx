"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
// TypeScript interface for nav items
interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Me", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Words", href: "/words" },
  { name: "Socials", href: "/socials" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <nav>
      <div className="flex w-full border-b-8 border-foreground bg-accent">
        {navItems.map((item, index) =>
          index === 0 ? (
            <Link
              className="border-r-8 border-foreground p-2 px-8 bg-background hover:bg-transparent"
              key={index}
              href={item.href}
            >
              <Image
                height={100}
                width={100}
                src={theme === "light" ? "/lightHome.svg" : "/darkHome.svg"}
                alt="Home"
                className="h-16 w-16"
              />
            </Link>
          ) : (
            <Link
              href={item.href}
              key={index}
              className="bg-background border-r-8 px-14 border-foreground py-2 font-roboto font-bold text-7xl hover:bg-transparent hover:text-background transition-colors"
            >
              {item.name}
            </Link>
          )
        )}
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="bg-background border-r-8 px-14 border-foreground py-2 font-roboto font-bold text-7xl hover:bg-transparent hover:text-background transition-colors cursor-pointer"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
