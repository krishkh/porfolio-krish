"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate rotation based on index
  const getRotation = () => {
    const rotations = [-4, 3, -1, -5, -2, 2, 4];
    return rotations[index % rotations.length];
  };

  return (
    <Link href={link} passHref>
      <motion.div
        ref={cardRef}
        className="preview relative min-w-[360px] min-h-[540px] max-w-[360px] max-h-[540px] 
                  rounded-md outline outline-[9px] outline-white outline-offset-[9px] 
                  bg-white shadow-lg cursor-pointer
                  grayscale sepia-[5%] opacity-[0.69] mix-blend-multiply
                  tabindex-0 focus:outline-none"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          rotate: `${getRotation()}deg`,
          scale: 0.85,
          boxShadow: "0 0 24px 0 rgba(25, 25, 25, 0.1)",
          borderWidth: "9px",
          borderStyle: "solid",
          borderColor: "transparent",
          transition:
            "border 0.15s, box-shadow 0.15s, filter 0.3s, outline-offset 0.3s, opacity 0.3s, rotate 0.3s, scale 0.3s, z-index 0.15s",
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
          zIndex: 6,
          transition: {
            duration: 0.15,
            scale: { duration: 0.3 },
            rotate: { duration: 0.3 },
            filter: { duration: 0.3 },
            opacity: { duration: 0.3 },
          },
        }}
        whileFocus={{
          scale: 1,
          rotate: 0,
          filter: "none",
          opacity: 1,
          mixBlendMode: "normal",
          outlineOffset: "4.5px",
          boxShadow: "0 0 200px 0 rgba(240, 100, 180, 0.8)",
          borderColor: "rgba(240, 100, 180, 0.8)",
          zIndex: 5,
        }}
      >
        {/* Content overlay that appears on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300">
          <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}
