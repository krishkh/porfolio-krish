"use client";

import { useState } from "react";
import StackedImageCard from "./StackedImageCard";
import { ProjectImage } from "@/data/projects";

interface StackedImageGalleryProps {
  images: ProjectImage[];
}

export default function StackedImageGallery({
  images,
}: StackedImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-[600px] lg:h-[800px] bg-[#0f0f0f] rounded-lg" />
    );
  }

  // Get active image type to adjust container height
  const activeImageType = images[activeIndex]?.type || "desktop";
  const isMobileActive = activeImageType === "mobile";

  // Adjust container height based on active image type
  const containerHeight = isMobileActive
    ? "h-[700px] lg:h-[900px]"
    : "h-[600px] lg:h-[800px]";

  // Calculate visual stack position for each card
  // Cards are stacked with index 0 at the back, higher indices in front
  // When a card is clicked, it moves to the front (position 0)
  const getVisualStackPosition = (imageIndex: number): number => {
    if (imageIndex === activeIndex) {
      return 0; // Active card is always on top
    }
    // For non-active cards, calculate their position
    // Cards with higher indices than active are behind it
    // Cards with lower indices than active are also behind it
    if (imageIndex < activeIndex) {
      // This card is before the active one in the array
      return activeIndex - imageIndex;
    } else {
      // This card is after the active one in the array
      return imageIndex - activeIndex;
    }
  };

  return (
    <div 
      className={`relative w-full ${containerHeight}`}
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {images.map((image, index) => {
        const isActive = index === activeIndex;
        const visualStackPosition = getVisualStackPosition(index);

        return (
          <StackedImageCard
            key={`${image.url}-${index}`}
            imageUrl={image.url}
            imageType={image.type}
            index={index}
            isActive={isActive}
            totalCards={images.length}
            onClick={() => setActiveIndex(index)}
            visualStackPosition={visualStackPosition}
            zIndex={
              isActive
                ? images.length + 1
                : images.length - visualStackPosition
            }
          />
        );
      })}
    </div>
  );
}
