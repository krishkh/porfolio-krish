"use client";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute bottom-0">
      <div className="flex items-center justify-center">
        <Image
          src="/darkKrish.png"
          alt="Developer portrait"
          width={600}
          height={800}
          className=""
        />
        <h1 className="font-comfortaa text-[200px] font-bold text-foreground">
          I build
        </h1>
      </div>
    </div>
  );
};

export default Hero;
