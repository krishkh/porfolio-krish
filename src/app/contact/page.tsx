"use client";

import React from "react";
import Background from "@/components/ui/Background";
import SocialCard from "@/components/SocialCard";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";

// Social links data for easy maintenance and updates
const socialLinks = [
  {
    icon: FiMail,
    title: "Email",
    description: "Drop me a message anytime",
    link: "mailto:krishkhanna007@gmail.com",
    linkText: "krishkhanna007@gmail.com",
    isExternal: false,
    showFullLink: false, // Don't show the full email address
  },
  {
    icon: FiLinkedin,
    title: "LinkedIn",
    description: "Connect professionally",
    link: "https://linkedin.com/in/krishkh",
    linkText: "linkedin.com/in/krishkh",
    isExternal: true,
    showFullLink: false,
  },
  {
    icon: FiGithub,
    title: "GitHub",
    description: "Check out my code",
    link: "https://github.com/krishkh",
    linkText: "github.com/krishkh",
    isExternal: true,
    showFullLink: true,
  },
];

const ContactPage = () => {
  return (
    <Background>
      <div className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Let's Connect
            </h1>
            <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-2">
              I'm always open to new opportunities and collaborations. Feel free
              to reach out through any of the channels below.
            </p>
          </div>

          {/* Responsive grid that adjusts based on screen size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
            {socialLinks.map((social, index) => (
              <SocialCard
                key={index}
                icon={social.icon}
                title={social.title}
                description={social.description}
                link={social.link}
                linkText={social.linkText}
                isExternal={social.isExternal}
                showFullLink={social.showFullLink}
              />
            ))}
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              Looking Forward to Hearing From You
            </h2>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto px-2">
              Whether you have a project in mind, a question about my work, or
              just want to say hello, I'm always excited to connect with new
              people and explore potential collaborations.
            </p>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default ContactPage;
