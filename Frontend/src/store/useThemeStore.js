import { create } from 'zustand';

const INITIAL_THEME = localStorage.getItem('theme') || 'light';

export const useThemeStore = create((set) => ({
    theme: INITIAL_THEME,
    setTheme: (newTheme) => {
    console.log("Setting theme to:", newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        set({ theme: newTheme });
    },
}));

// Initialize theme on store creation
document.documentElement.setAttribute('data-theme', INITIAL_THEME);
