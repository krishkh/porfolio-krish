"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";

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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showContent, setShowContent] = useState(false);

  // Calculate rotation based on index
  const getRotation = () => {
    if (isMobile) return 0; // No rotation on mobile
    const rotations = [-4, 3, -1, -5, -2, 2, 4];
    return rotations[index % rotations.length];
  };

  // Reset showContent when device type changes
  useEffect(() => {
    setShowContent(isMobile);
  }, [isMobile]);

  // Desktop card - keep original design
  if (!isMobile) {
    return (
      <Link href={link} passHref>
        <motion.div
          ref={cardRef}
          className="preview mobile relative min-w-[360px] min-h-[540px] max-w-[360px] max-h-[540px] 
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

  // Mobile card - enhanced for touch devices
  return (
    <Link href={link} passHref>
      <motion.div
        ref={cardRef}
        className="preview relative w-full h-[400px] rounded-md outline outline-[4px] outline-white outline-offset-[6px] 
                  bg-white shadow-lg cursor-pointer"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          boxShadow: "0 0 30px 0 rgba(240, 180, 41, 0.2)",
          borderWidth: "4px",
          borderStyle: "solid",
          borderColor: "rgba(240, 180, 41, 0.3)",
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
        onClick={() => setShowContent(!showContent)}
      >
        {/* Content overlay that is always visible but can expand/collapse */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-4 
                    bg-gradient-to-t from-black/90 via-black/60 to-transparent 
                    opacity-100 transition-opacity duration-300"
        >
          <div
            className={`transform transition-transform duration-300 ${
              !showContent ? "translate-y-[80%]" : "translate-y-0"
            }`}
          >
            <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
            <p
              className={`text-white/80 text-xs ${
                !showContent ? "hidden" : "block"
              }`}
            >
              {description}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-white/60 text-xs">
                {showContent ? "Tap to collapse" : "Tap to expand"}
              </span>
              <span className="bg-[#f0b429] text-black text-xs px-2 py-1 rounded-full">
                View Project
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
