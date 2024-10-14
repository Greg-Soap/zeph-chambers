import type { CSSProperties } from "react";

interface SpinnerProps {
  size?: "huge" | "average" | "small" | "tiny";
  color?: string;
}

function Spinner({ size = "average", color = "#Cff073" }: SpinnerProps) {
  const sizeMap = {
    huge: "w-20 h-20 border-8",
    average: "w-12 h-12 border-4",
    small: "w-4 h-4 border-3",
    tiny: "w-3 h-3 border-2",
  };

  const spinnerStyle: CSSProperties = {
    animation: "spin 0.75s linear infinite",
    borderColor: color,
    borderLeftColor: "transparent",
  };

  return (
    <div
      className={`${sizeMap[size]} border-double rounded-full border-l-solid`}
      style={spinnerStyle}
    />
  );
}

export default Spinner;
