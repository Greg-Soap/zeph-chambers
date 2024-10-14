import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "iconsax-react";
import type { ReactNode } from "react";

interface CustomAvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "huge";
  className?: string;
}

function CustomAvatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
}: CustomAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-14 w-14",
    huge: "h-32 w-32",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    huge: 50,
  };

  return (
    <Avatar className={cn(sizeClasses[size], "object-cover", className)}>
      <AvatarImage
        src={src || "/assets/images/default-user.svg"}
        alt={alt}
        className="object-cover"
      />
      <AvatarFallback>
        {fallback || <User size={iconSizes[size]} />}
      </AvatarFallback>
    </Avatar>
  );
}

export default CustomAvatar;
