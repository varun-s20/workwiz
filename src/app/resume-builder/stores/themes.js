import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SYSTEM_COLORS, CUSTOM_THEME_COLOR } from "../helpers/constants/index";

/**
 * Zustand store for managing theme settings.
 */
export const useThemes = create(
  persist(
    (set) => ({
      selectedTheme: SYSTEM_COLORS[0],
      customTheme: CUSTOM_THEME_COLOR,
      chooseTheme: (theme) => {
        set(() => ({ selectedTheme: theme }));
      },
    }),
    { name: "themes" }
  )
);
