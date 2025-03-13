import React from "react";
import { IconType } from "react-icons";
import styles from "./EnhancedSocialCard.module.css";

interface EnhancedSocialCardProps {
  icon: IconType;
  title: string;
  description: string;
  link: string;
  linkText: string;
  isExternal: boolean;
  showFullLink: boolean;
}

const EnhancedSocialCard = ({
  icon: Icon,
  title,
  description,
  link,
  linkText,
  isExternal,
  showFullLink,
}: EnhancedSocialCardProps) => {
  return (
    <a
      href={link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={styles.card}
    >
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
        <div className={styles.glow}></div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.linkWrapper}>
          {showFullLink ? (
            <span className={styles.link}>{linkText}</span>
          ) : (
            <span className={styles.link}>Click to contact</span>
          )}
        </div>
      </div>
      <div className={styles.border}></div>
    </a>
  );
};

export default EnhancedSocialCard;
