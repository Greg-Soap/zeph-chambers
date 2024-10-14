import { type ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

interface CustomDrawerProps {
  children: ReactNode;
  trigger?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  size?: DrawerSize;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const sizeClasses: Record<DrawerSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "sm:max-w-full",
};

function CustomDrawer({
  children,
  trigger,
  side = "right",
  size = "md",
  isOpen,
  onOpenChange,
}: CustomDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setInternalOpen(open);
    onOpenChange?.(open);
  };

  return (
    <Sheet open={isOpen ?? internalOpen} onOpenChange={handleOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side={side}
        className={`w-[90%] ${sizeClasses[size]} p-0 flex flex-col`}
      >
        <div className="flex-1 overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export default CustomDrawer;
