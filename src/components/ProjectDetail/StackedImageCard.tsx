"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface StackedImageCardProps {
  imageUrl: string;
  imageType: "mobile" | "desktop";
  index: number;
  isActive: boolean;
  totalCards: number;
  onClick: () => void;
  zIndex: number;
  visualStackPosition: number; // Position in the visual stack (0 = top, 1 = second, etc.)
}

export default function StackedImageCard({
  imageUrl,
  imageType,
  index,
  isActive,
  totalCards,
  onClick,
  zIndex,
  visualStackPosition,
}: StackedImageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate 3D transform values for cool stacking effect
  // Cards further back have more offset, rotation, and scale reduction
  const depthOffset = visualStackPosition * 24; // Increased offset for more dramatic effect
  const rotationY = visualStackPosition * 2; // Slight rotation for 3D effect
  const rotationX = visualStackPosition * -1; // Subtle tilt
  const scale = visualStackPosition === 0
    ? 1 
    : Math.max(0.94 - visualStackPosition * 0.03, 0.88);
  
  // Opacity: top card is fully opaque, cards behind are slightly transparent but still visible
  const opacity = visualStackPosition === 0
    ? 1 
    : Math.max(0.92 - visualStackPosition * 0.04, 0.8);

  // Calculate shadow intensity based on position
  const shadowBlur = 20 + visualStackPosition * 10;
  const shadowSpread = 5 + visualStackPosition * 3;
  const shadowOpacity = 0.3 - visualStackPosition * 0.05;

  // Determine container styling based on image type
  const isMobile = imageType === "mobile";

  return (
    <motion.div
      className="absolute inset-0 cursor-pointer"
      style={{ 
        zIndex,
        transformStyle: "preserve-3d",
      }}
      initial={false}
      animate={{
        x: depthOffset,
        y: depthOffset,
        scale: isHovered && visualStackPosition > 0 ? scale + 0.03 : scale,
        opacity: opacity,
        rotateY: `${rotationY}deg`,
        rotateX: `${rotationX}deg`,
        filter: `blur(${visualStackPosition * 0.5}px)`,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 0.7,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileTap={{
        scale: visualStackPosition === 0 ? 0.97 : scale - 0.02,
      }}
    >
      {/* Browser Frame with enhanced 3D styling */}
      <div 
        className="relative w-full h-full bg-[#1a1a1a] rounded-lg overflow-hidden"
        style={{
          boxShadow: `0 ${depthOffset}px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, ${Math.max(shadowOpacity, 0.15)})`,
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Browser Header */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-[#2a2a2a] flex items-center gap-2 px-4 z-10 border-b border-[#3a3a3a]/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></div>
          </div>
        </div>

        {/* Image Content - Minimal padding (2px) for optimal space usage */}
        <div className="absolute inset-0 top-10" style={{ padding: "2px" }}>
          <div className="relative w-full h-full bg-[#0f0f0f] flex items-center justify-center">
            {isMobile ? (
              // Mobile: Center horizontally, maximize height usage with minimal side padding
              <div className="relative h-full mx-auto" style={{ width: "65%", maxWidth: "calc(100% - 4px)", minWidth: "200px" }}>
                <Image
                  src={imageUrl}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 30vw"
                  priority={isActive}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>
            ) : (
              // Desktop: Fill width, maximize height usage with minimal top/bottom padding
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={isActive}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Active Indicator with glow effect */}
        {isActive && (
          <motion.div
            className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#f0b429] rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              boxShadow: "0 0 8px rgba(240, 180, 41, 0.8)",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          />
        )}

        {/* Hover Overlay with gradient */}
        {isHovered && visualStackPosition > 0 && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Subtle border glow for active card */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              boxShadow: "inset 0 0 0 1px rgba(240, 180, 41, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
}
