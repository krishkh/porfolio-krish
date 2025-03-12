"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
  index: number;
  link: string;
}

export default function ProjectCard({
  imageUrl,
  title,
  description,
  index,
  link,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate rotation based on index
  const getRotation = () => {
    const rotations = [-4, 3, -1, -5, -2, 2, 4];
    return rotations[index % rotations.length];
  };

  // Calculate animation duration based on index
  const getDuration = () => {
    return 6 + index * 0.25;
  };

  return (
    <motion.div
      className="relative min-w-[360px] min-h-[540px] max-w-[360px] max-h-[540px] rounded-md 
                outline outline-white outline-[9px] outline-offset-[9px] 
                bg-white shadow-lg transition-all duration-300 cursor-pointer
                grayscale sepia-[5%] opacity-70 mix-blend-multiply overflow-hidden
                group"
      style={{
        rotate: `${getRotation()}deg`,
        scale: 0.85,
      }}
      whileHover={{
        scale: 1,
        rotate: 0,
        filter: "none",
        opacity: 1,
        mixBlendMode: "normal",
        outlineOffset: "4.5px",
        boxShadow: "0 0 200px 0 rgba(240, 180, 41, 0.8)",
        borderColor: "rgba(240, 180, 41, 0.8)",
        borderWidth: "9px",
        zIndex: 10,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => window.open(link, "_blank")}
    >
      {/* Background image with animation */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        initial={{
          backgroundPosition: `center ${index * 10}%`,
        }}
        animate={{
          backgroundPosition: isHovered
            ? "center center"
            : `center ${(index * 10 + 30) % 100}%`,
        }}
        transition={{
          backgroundPosition: {
            duration: getDuration(),
            ease: isHovered ? "easeOut" : "linear",
          },
        }}
      />

      {/* Content overlay that appears on hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
