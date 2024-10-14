import type React from "react";
import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Link, DollarSign } from "lucide-react"; // Assuming you're using lucide-react for icons

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  variant?: "input" | "textarea" | "password" | "number" | "link" | "currency";
  icon?: React.ReactNode;
}

const CustomInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CustomInputProps
>(({ className, variant = "input", icon, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClassName = cn("w-full", icon && "pl-10", className);

  const renderInput = () => {
    switch (variant) {
      case "textarea":
        return (
          <Textarea
            className={inputClassName}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
          />
        );
      case "password":
        return (
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              className={inputClassName}
              ref={ref as React.Ref<HTMLInputElement>}
              {...props}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        );
      case "number":
        return (
          <Input
            type="number"
            className={inputClassName}
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
          />
        );
      case "link":
        return (
          <div className="relative">
            <Input
              className={cn(inputClassName, "pl-10")}
              ref={ref as React.Ref<HTMLInputElement>}
              {...props}
            />
            <Link
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        );
      case "currency":
        return (
          <div className="relative">
            <Input
              className={cn(inputClassName, "pl-10")}
              ref={ref as React.Ref<HTMLInputElement>}
              {...props}
            />
            <DollarSign
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        );
      default:
        return (
          <Input
            className={inputClassName}
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
          />
        );
    }
  };

  return (
    <div className="relative w-full">
      {icon && !["link", "currency"].includes(variant) && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      {renderInput()}
    </div>
  );
});

CustomInput.displayName = "CustomInput";

export { CustomInput };
