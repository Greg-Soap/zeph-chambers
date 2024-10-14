import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomDropdownProps<T extends string> {
  options: { value: T; label: string }[];
  onSelect: (value: T) => void;
  placeholder?: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  className?: string;
  showSelectedLabel?: boolean;
  showCheckmark?: boolean;
  align?: "start" | "center" | "end";
}

function CustomDropdown<T extends string>({
  options,
  onSelect,
  placeholder = "Select an option",
  buttonText,
  buttonIcon,
  className,
  showSelectedLabel = true,
  showCheckmark = false,
  align = "end",
}: CustomDropdownProps<T>) {
  const [value, setValue] = React.useState("");

  function handleSelect(optionValue: T) {
    setValue(optionValue);
    onSelect(optionValue);
  }

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {buttonIcon ? (
          <Button variant="outline" size="icon">
            {buttonIcon}
            <span className="sr-only">{buttonText || placeholder}</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !showSelectedLabel && "w-auto",
              className
            )}
          >
            {showSelectedLabel && (selectedLabel || placeholder)}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={cn("w-[200px]", className)}>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => handleSelect(option.value)}
          >
            {showCheckmark && (
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === option.value ? "opacity-100" : "opacity-0"
                )}
              />
            )}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomDropdown;
