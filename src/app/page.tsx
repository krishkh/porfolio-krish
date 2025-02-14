"use client";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

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
