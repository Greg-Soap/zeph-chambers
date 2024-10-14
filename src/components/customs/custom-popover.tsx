import type { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomPopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

function CustomPopover({
  trigger,
  content,
  side = "bottom",
  align = "center",
  className,
}: CustomPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side={side} align={align} className={` ${className}`}>
        {content}
      </PopoverContent>
    </Popover>
  );
}

export default CustomPopover;
