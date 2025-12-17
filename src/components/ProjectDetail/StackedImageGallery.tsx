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

  const activeImageType = images[activeIndex]?.type || "desktop";
  const isMobileActive = activeImageType === "mobile";

  const containerHeight = isMobileActive
    ? "h-[700px] lg:h-[900px]"
    : "h-[600px] lg:h-[800px]";

  const getVisualStackPosition = (imageIndex: number): number => {
    if (imageIndex === activeIndex) {
      return 0;
    }
    if (imageIndex < activeIndex) {
      return activeIndex - imageIndex;
    } else {
      return imageIndex - activeIndex;
    }
  };

  return (
    <div className={`relative w-full ${containerHeight}`}>
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
