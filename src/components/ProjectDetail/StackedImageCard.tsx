"use client";

import Image from "next/image";

interface StackedImageCardProps {
  imageUrl: string;
  imageType: "mobile" | "desktop";
  index: number;
  isActive: boolean;
  totalCards: number;
  onClick: () => void;
  zIndex: number;
  visualStackPosition: number;
}

export default function StackedImageCard({
  imageUrl,
  imageType,
  index,
  isActive,
  onClick,
  zIndex,
  totalCards,
  visualStackPosition,
}: StackedImageCardProps) {
  const isMobile = imageType === "mobile";
  console.log(totalCards, visualStackPosition);

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      style={{ zIndex }}
      onClick={onClick}
    >
      {isMobile ? (
        <div className="relative h-full mx-auto" style={{ width: "65%", maxWidth: "calc(100% - 4px)", minWidth: "200px" }}>
          <Image
            src={imageUrl}
            alt={`Project image ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 30vw"
            priority={isActive}
          />
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={`Project image ${index + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={isActive}
          />
        </div>
      )}
    </div>
  );
}
