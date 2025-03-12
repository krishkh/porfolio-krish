"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";

const MovingChara: React.FC = () => {
  const [movingRight, setMovingRight] = React.useState(true);
  const controls = useAnimationControls();

  useEffect(() => {
    const animateCharacter = () => {
      const screenWidth = window.innerWidth;
      // Calculate boundaries to keep character within visible area
      const moveDistance = Math.min(screenWidth * 0.3, 400); // Limit max distance

      controls.start({
        x: movingRight ? moveDistance : -moveDistance,
        transition: {
          duration: 8, // Slower movement
          ease: "linear",
        },
      });
    };

    animateCharacter();

    // Handle window resize
    window.addEventListener("resize", animateCharacter);
    return () => window.removeEventListener("resize", animateCharacter);
  }, [movingRight, controls]);

  const handleAnimationComplete = () => {
    setMovingRight(!movingRight);
  };

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      initial={{ x: 0 }}
      animate={controls}
      onAnimationComplete={handleAnimationComplete}
    >
      <div className="relative">
        {/* Dialog box */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm 
                    bg-white/90 text-black px-3 py-1.5 rounded-lg shadow-md
                    border border-gray-200"
        >
          i like games..
        </div>

        {/* Character sprite */}
        <Image
          src={movingRight ? "/frisk-right.gif" : "/frisk-left.gif"}
          alt="Character"
          width={64}
          height={64}
          priority
          style={{
            imageRendering: "pixelated",
          }}
        />
      </div>
    </motion.div>
  );
};

export default MovingChara;
