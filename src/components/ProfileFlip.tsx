"use client";
import React, { useState } from "react";
import Image from "next/image";
import profileCircle from "@/assets/images/profile-circle.png";
import memojiImage from "@/assets/images/memoji-computer.png";

type Props = {
  size?: number;
  className?: string;
  alt?: string;
};

export default function ProfileFlip({ size = 100, className = "", alt = "Profile" }: Props) {
  const [flipped, setFlipped] = useState(false);
  const px = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: px, height: px, perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      tabIndex={0}
      role="img"
      aria-label={alt}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 motion-reduce:transition-none"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <Image src={profileCircle} alt={alt} width={typeof size === "number" ? size : undefined} height={typeof size === "number" ? size : undefined} className="object-cover rounded-full" />
        </div>

        <div
          className="absolute inset-0"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <Image src={memojiImage} alt={`${alt} memoji`} width={typeof size === "number" ? size : undefined} height={typeof size === "number" ? size : undefined} className="object-cover rounded-full" />
        </div>
      </div>
    </div>
  );
}
