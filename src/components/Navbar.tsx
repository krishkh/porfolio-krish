"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

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

  return (
    <nav>
      <div className="flex  gap-10 p-2 w-full bg-background">
        {navItems.map((item, index) =>
          index === 0 ? (
            <Link
              className="item-black font-roboto border-foreground"
              key={index}
              href={item.href}
            >
              <Home className="h-12 w-12" />
            </Link>
          ) : (
            <div
              key={index}
              className="item-black font-roboto font-bold text-5xl border-foreground"
            >
              {item.name}
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
