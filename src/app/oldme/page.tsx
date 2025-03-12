"use client";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/old/Navbar";
import Hero from "@/components/old/Hero";

export default function Home() {
  return (
    <div className="">
      <ThemeProvider>
        <Navbar />
        <Hero />
      </ThemeProvider>
    </div>
  );
}
