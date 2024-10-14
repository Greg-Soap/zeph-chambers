import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options?: Option[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

function CustomSelect({
  options = [],
  placeholder = "Select an option",
  value,
  onChange,
  className,
}: CustomSelectProps) {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {safeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
