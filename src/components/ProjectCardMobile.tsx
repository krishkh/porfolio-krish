import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardMobileProps {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCardMobile = ({
  imageUrl,
  title,
  description,
  link,
}: ProjectCardMobileProps) => {
  return (
    <Link href={link} passHref>
      <motion.div
        className="relative w-full h-[280px] rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Border animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#f0b429] via-[#e85d04] to-[#9d0208] animate-pulse-slow opacity-70" />
          <div className="absolute inset-[3px] bg-[#0f172a] rounded-lg" />
        </div>

        {/* Image */}
        <div
          className="absolute inset-[3px] rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.8)",
          }}
        >
          {/* Content overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
            <p className="text-white/80 text-sm line-clamp-3">{description}</p>

            <motion.div
              className="mt-4 bg-[#f0b429] text-black font-medium text-sm py-2 px-4 rounded-full w-fit"
              whileTap={{ scale: 0.95 }}
            >
              View Project
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCardMobile;

