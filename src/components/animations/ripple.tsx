import React, { type CSSProperties, useEffect, useState } from "react";

interface RippleProps {
  mainRectWidth?: number;
  mainRectHeight?: number;
  mainRectOpacity?: number;
  numRectangles?: number;
}

const Ripple = React.memo(function Ripple({
  mainRectWidth = 1020,
  mainRectHeight = 695,
  mainRectOpacity = 0.07,
  numRectangles = 8,
}: RippleProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scaleX = viewportWidth / mainRectWidth;
      const scaleY = viewportHeight / mainRectHeight;
      setScale(Math.min(scaleX, scaleY, 1)); // Limit scale to 1 to prevent enlargement
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mainRectWidth, mainRectHeight]);

  return (
    <div className="-z-10 absolute inset-0 flex items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,white,transparent)]">
      {Array.from({ length: numRectangles }, (_, i) => {
        const width = mainRectWidth + i * 70;
        const height =
          mainRectHeight + i * ((70 * mainRectHeight) / mainRectWidth);
        const opacity = mainRectOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numRectangles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`absolute animate-ripple bg-[#bdff00] shadow-xl border [--i:${i}]`}
            style={
              {
                width: `${width}px`,
                height: `${height}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(${scale})`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";

export default Ripple;
