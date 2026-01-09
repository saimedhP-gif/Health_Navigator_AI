import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/**
 * Theme Context
 * Provides dark/light mode toggle with system preference detection
 * and localStorage persistence
 */

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = "health-navigator-theme";

function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === "undefined") return "system";
        const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        return stored || "system";
    });

    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        if (stored === "light" || stored === "dark") return stored;
        return getSystemTheme();
    });

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;
        const resolved = theme === "system" ? getSystemTheme() : theme;

        root.classList.remove("light", "dark");
        root.classList.add(resolved);
        setResolvedTheme(resolved);

        // Update meta theme-color for mobile browsers
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute("content", resolved === "dark" ? "#0f172a" : "#ffffff");
        }
    }, [theme]);

    // Listen for system theme changes
    useEffect(() => {
        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setResolvedTheme(e.matches ? "dark" : "light");
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(e.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    };

    const toggleTheme = () => {
        const newTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default ThemeProvider;
