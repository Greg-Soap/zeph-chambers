import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import CustomDropdown from "@/components/customs/custom-dropdown";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <CustomDropdown
      options={[
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "system", label: "System" },
      ]}
      onSelect={setTheme}
      buttonText="Toggle theme"
      buttonIcon={
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </>
      }
      showSelectedLabel={false}
    />
  );
}
