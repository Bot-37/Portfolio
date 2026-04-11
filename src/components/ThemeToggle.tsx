import { MoonStar, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeMode, useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

const OPTIONS: Array<{ value: ThemeMode; label: string; icon: typeof MoonStar }> = [
  { value: "dark", label: "Dark", icon: MoonStar },
  { value: "light", label: "White", icon: SunMedium },
];

const ThemeToggle = ({ compact = false, className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("theme-toggle", compact && "theme-toggle-compact", className)}>
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          className={cn("theme-toggle-option", theme === value && "is-active")}
          aria-pressed={theme === value}
        >
          <Icon className="h-3.5 w-3.5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
