"use client";

import React, { useEffect, useRef } from "react";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import Ghost from "@/components/Ghost/Ghost";
import EnhancedSocialCard from "@/components/EnhancedSocialCard/EnhancedSocialCard";
import styles from "./Contact.module.css";

// Social links data for easy maintenance and updates
const socialLinks = [
  {
    icon: FiMail,
    title: "Email",
    description: "Drop me a message anytime",
    link: "mailto:krishkhanna007@gmail.com",
    linkText: "krishkhanna007@gmail.com",
    isExternal: false,
    showFullLink: false,
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
  // Create particles effect
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star particles
    const stars: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      color: string;
    }[] = [];

    // Create stars with different sizes and opacities
    const createStars = () => {
      const starCount = Math.min(100, Math.floor(window.innerWidth / 15));

      for (let i = 0; i < starCount; i++) {
        const size = Math.random() * 2 + 0.5;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.05 + 0.01,
          color: i % 3 === 0 ? "#f0b429" : i % 3 === 1 ? "#14c878" : "#ffffff",
        });
      }
    };

    // Animate stars with twinkling effect
    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle effect
        s.opacity = s.opacity + Math.sin(Date.now() * s.speed) * 0.1;
        const opacity = Math.max(0.1, Math.min(0.9, s.opacity));

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color
          .replace(")", `, ${opacity})`)
          .replace("rgb", "rgba");
        ctx.fill();

        // Slow vertical movement
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      }

      requestAnimationFrame(animateStars);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars.length = 0;
      createStars();
    };

    createStars();
    animateStars();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.particles}></canvas>
      <Ghost />
      {/* <img
        src="http://localhost:8000/track-pixel?clickId=6800f4c9cc06680e99e92815&conversion=true"
        width="1"
        height="1"
        style={{ display: "none" }}
        alt=""
      /> */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Let&apos;s Connect</h1>
          <p className={styles.subtitle}>
            I&apos;m always open to new opportunities and collaborations. Feel
            free to reach out through any of the channels below.
          </p>
        </div>

        <div className={styles.socialGrid}>
          {socialLinks.map((social, index) => (
            <EnhancedSocialCard
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

        <div className={styles.footer}>
          <h2 className={styles.footerTitle}>
            Looking Forward to Hearing From You
          </h2>
          <p className={styles.footerText}>
            Whether you have a project in mind, a question about my work, or
            just want to say hello, I&apos;m always excited to connect with new
            people and explore potential collaborations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
