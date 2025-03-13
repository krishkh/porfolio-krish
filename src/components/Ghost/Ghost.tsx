"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Ghost.module.css";

const Ghost = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate normalized position (from -1 to 1)
      const normalizedX = (e.clientX / viewportWidth) * 2 - 1;
      const normalizedY = (e.clientY / viewportHeight) * 2 - 1;

      // Limit movement range
      const moveX = normalizedX * 3;
      const moveY = normalizedY * 3;

      // Update CSS variables
      document.documentElement.style.setProperty(
        "--ghost-eye-x",
        moveX.toString()
      );
      document.documentElement.style.setProperty(
        "--ghost-eye-y",
        moveY.toString()
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.ghostContainer}>
      <svg ref={svgRef} viewBox="0 0 14 14" className={styles.ghost}>
        <defs>
          <rect
            id="pixel-dot-rect"
            x="0.175"
            y="0.175"
            width="0.7"
            height="0.7"
            rx="0.2"
          />
          <pattern
            id="pixel-dot-pattern"
            viewBox="0 0 1 1"
            width="1"
            height="1"
            patternUnits="userSpaceOnUse"
          >
            <use fill="hsl(140 59% 55% / 0.3)" href="#pixel-dot-rect" />
          </pattern>
          <mask id="pixel-dot-mask">
            <rect fill="white" width="14" height="14" />
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="black"
              d="M 0 0 h5M 9 0h5 M 0 1h3 M 11 1h3 M 0 2h2 M 12 2h2M 0 3h1 M 13 3h1M 0 4h1 M 13 4h1 M 0 5h1 M 13 5h1 M 4 12h1 M 9 12h1 M 0 13h1 M 3 13h3 M8 13h3 M 13 13h1"
            />
          </mask>
        </defs>
        <rect
          mask="url(#pixel-dot-mask)"
          fill="url(#pixel-dot-pattern)"
          width="14"
          height="14"
        />
        <g className={styles.eye}>
          <g transform="translate(2 3)">
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="white"
              d="M 1 0 h2 M 0 1h4 M 0 2h4 M 0 3h4 M 1 4h2"
            />
            <g fill="black" className={styles.dot}>
              <use transform="translate(1 1)" href="#pixel-dot-rect" />
              <use transform="translate(2 1)" href="#pixel-dot-rect" />
              <use transform="translate(1 2)" href="#pixel-dot-rect" />
              <use transform="translate(2 2)" href="#pixel-dot-rect" />
            </g>
          </g>
        </g>
        <g className={styles.eye}>
          <g transform="translate(8 3)">
            <path
              transform="translate(0 0.5)"
              fill="none"
              stroke="white"
              d="M 1 0 h2 M 0 1h4 M 0 2h4 M 0 3h4 M 1 4h2"
            />
            <g fill="black" className={styles.dot}>
              <use transform="translate(1 1)" href="#pixel-dot-rect" />
              <use transform="translate(2 1)" href="#pixel-dot-rect" />
              <use transform="translate(1 2)" href="#pixel-dot-rect" />
              <use transform="translate(2 2)" href="#pixel-dot-rect" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Ghost;
