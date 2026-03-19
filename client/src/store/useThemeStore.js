import { create } from "zustand";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "night";
  return localStorage.getItem("chat-theme") || "night";
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const useThemeStore = create((set) => {
  const initialTheme = getInitialTheme();
  if (typeof document !== "undefined") {
    applyTheme(initialTheme);
  }

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      localStorage.setItem("chat-theme", theme);
      applyTheme(theme);
      set({ theme });
    },
  };
});
