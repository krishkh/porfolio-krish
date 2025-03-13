import React from "react";
import { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

interface SocialCardProps {
  icon: IconType;
  title: string;
  description: string;
  link: string;
  linkText: string;
  isExternal?: boolean;
  showFullLink?: boolean;
}

const SocialCard: React.FC<SocialCardProps> = ({
  icon: Icon,
  title,
  description,
  link,
  linkText,
  isExternal = false,
  showFullLink = true,
}) => {
  // Display "Click to contact" for email or custom text for other platforms
  const displayText = !showFullLink ? "Click to contact" : linkText;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden group hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6 sm:p-8 text-center h-full flex flex-col">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#f0b429]/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <Icon className="text-[#f0b429] text-2xl sm:text-3xl" />
        </div>

        <h3 className="text-white text-lg sm:text-xl font-bold mb-2">
          {title}
        </h3>

        <p className="text-white/70 mb-4 text-sm sm:text-base">{description}</p>

        <a
          href={link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="mt-auto inline-flex items-center justify-center text-[#f0b429] hover:text-[#f0b429]/80 font-medium transition-colors text-sm sm:text-base"
          title={linkText} // Show full link on hover
        >
          {displayText}
          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default SocialCard;
