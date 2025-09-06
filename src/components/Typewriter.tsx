"use client";

import React, { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  items: string[];
  typingSpeed?: number; // ms per character when typing
  deletingSpeed?: number; // ms per character when deleting
  pauseTime?: number; // ms to wait after finishing a word
  loop?: boolean;
  className?: string;
};

export default function Typewriter({
  items,
  typingSpeed = 90,
  deletingSpeed = 50,
  pauseTime = 1500,
  loop = true,
  className = "",
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!items || items.length === 0) return;
    const current = items[index % items.length];
    let timeout: number;

    if (!isDeleting) {
      // typing
      if (display.length < current.length) {
        timeout = window.setTimeout(() => {
          if (mounted.current) setDisplay(current.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        // finished typing, pause then start deleting
        timeout = window.setTimeout(() => {
          if (mounted.current) setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // deleting
      if (display.length > 0) {
        timeout = window.setTimeout(() => {
          if (mounted.current) setDisplay(current.slice(0, display.length - 1));
        }, deletingSpeed);
      } else {
        // finished deleting, move to next
        setIsDeleting(false);
        setIndex((i) => i + 1);
        if (!loop && index + 1 >= items.length) {
          // stop looping — leave empty and do not advance further
        }
      }
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, isDeleting, index, items, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={"typewriter-root " + className}>
      <span
        aria-live="polite"
        style={{ display: "inline-block", minWidth: "1ch", minHeight: "1em", whiteSpace: "pre" }}
      >
        {display || "\u00A0"}
      </span>
      <span className="typewriter-cursor" aria-hidden>
        |
      </span>
    </span>
  );
}
