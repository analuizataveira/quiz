"use client"

import { useEffect } from "react"
import { useThemeStore } from "../data/stores/theme.store"

export const useDarkMode = () => {
  const { theme, isDark, setTheme, toggleTheme } = useThemeStore()

  useEffect(() => {
    // Initialize theme on mount
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        setTheme("system") // This will recalculate isDark
      }
    }

    // Set initial theme
    setTheme(theme)

    // Listen for system theme changes
    mediaQuery.addEventListener("change", handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
  }, [theme, setTheme])

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  }
}
