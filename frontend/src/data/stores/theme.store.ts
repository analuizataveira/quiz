import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ThemeState, Theme } from "../../domain/types/theme"
import { STORAGE_KEYS } from "../../domain/constants/storage"

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      isDark: false,

      setTheme: (theme: Theme) => {
        const isDark =
          theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

        set({ theme, isDark })

        // Apply theme to document
        if (isDark) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      },

      toggleTheme: () => {
        const { theme } = get()
        const newTheme: Theme = theme === "light" ? "dark" : "light"
        get().setTheme(newTheme)
      },
    }),
    {
      name: STORAGE_KEYS.THEME_PREFERENCE,
    },
  ),
)
