"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export function AdminThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center gap-2 px-3"
    >
      {/* Icon Container - para hindi gumalaw yung text kapag nag-switch */}
      <div className="relative h-4 w-4">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      
      <span className="min-w-[70px] text-left">
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </span>
    </Button>
  );
}