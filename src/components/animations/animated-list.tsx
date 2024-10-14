import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface AnimatedListProps {
  className?: string;
  children: React.ReactNode[];
  delay?: number;
  visibleItems?: number;
}

export const AnimatedList = React.memo(
  ({
    className,
    children,
    delay = 3000,
    visibleItems = 5,
  }: AnimatedListProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
      }, delay);

      return () => clearInterval(interval);
    }, [children.length, delay]);
    // Calculate the unique items to show based on the currentIndex and visibleItems
    const uniqueItems = Array.from(
      new Set(
        [...Array(visibleItems)].map(
          (_, index) => children[(currentIndex + index) % children.length]
        )
      )
    );

    return (
      <div
        className={`relative h-[245px] w-full max-w-[80%] mx-auto  ${className}`}
      >
        <AnimatePresence initial={false}>
          {uniqueItems.map((item, index) => (
            <AnimatedListItem
              key={(currentIndex + index) % children.length}
              index={index}
            >
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

function AnimatedListItem({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const animations = {
    initial: { y: 30, opacity: 0, scale: 0.8 },
    animate: {
      y: index * 35, // Adjusted for a lower stacking effect
      opacity: 1 - index * 0.01, // Adjusted to make all items more visible
      scale: 1 - index * 0.1, // Subtle scaling effect
      zIndex: 1000 - index,
      transition: { type: "spring", stiffness: 350, damping: 25 },
    },
  };

  return (
    <motion.div
      {...animations}
      layout
      className={"absolute max-w-full w-full p-0 m-0 "}
      style={{ transformOrigin: "bottom", top: `${index * 5}px` }}
    >
      {children}
    </motion.div>
  );
}
