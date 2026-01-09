import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

/**
 * Theme Toggle Component
 * Provides dark/light/system mode switching
 */

type Theme = "light" | "dark" | "system";

interface ThemeOption {
    value: Theme;
    label: string;
    icon: React.ElementType;
}

const themeOptions: ThemeOption[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
];

/**
 * Simple Theme Toggle Button
 * Toggles between light and dark mode
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
    const { resolvedTheme, toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`relative overflow-hidden ${className}`}
            title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        >
            <AnimatePresence mode="wait" initial={false}>
                {resolvedTheme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Moon className="w-5 h-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Sun className="w-5 h-5" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    );
}

/**
 * Theme Selector Dropdown
 * Allows choosing between light, dark, and system theme
 */
export function ThemeSelector({ className = "" }: { className?: string }) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const currentOption = themeOptions.find(opt => opt.value === theme) || themeOptions[0];
    const CurrentIcon = resolvedTheme === "dark" ? Moon : Sun;

    return (
        <div className={`relative ${className}`}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2"
            >
                <CurrentIcon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{currentOption.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-40 bg-card border border-border 
                                       rounded-xl shadow-lg z-50 overflow-hidden"
                        >
                            {themeOptions.map((option) => {
                                const Icon = option.icon;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            setTheme(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm 
                                                   transition-colors hover:bg-muted ${theme === option.value
                                                ? "text-primary bg-primary/10"
                                                : "text-foreground"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{option.label}</span>
                                        {theme === option.value && (
                                            <motion.div
                                                layoutId="theme-check"
                                                className="ml-auto w-2 h-2 rounded-full bg-primary"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Animated Theme Toggle with Sun/Moon animation
 */
export function AnimatedThemeToggle({ className = "" }: { className?: string }) {
    const { resolvedTheme, toggleTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 ${isDark ? "bg-slate-700" : "bg-blue-100"
                } ${className}`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
                {/* Stars (visible in dark mode) */}
                <AnimatePresence>
                    {isDark && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute top-1 right-2 w-1 h-1 bg-white rounded-full"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.1 }}
                                className="absolute top-2.5 right-4 w-0.5 h-0.5 bg-white rounded-full"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-white rounded-full"
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* Clouds (visible in light mode) */}
                <AnimatePresence>
                    {!isDark && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.6, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute top-1.5 left-8 w-4 h-2 bg-white rounded-full"
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Toggle knob */}
            <motion.div
                layout
                className={`w-5 h-5 rounded-full flex items-center justify-center ${isDark ? "bg-slate-900" : "bg-yellow-400"
                    }`}
                animate={{ x: isDark ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="moon"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <Moon className="w-3 h-3 text-slate-200" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <Sun className="w-3 h-3 text-yellow-600" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </button>
    );
}

export default {
    ThemeToggle,
    ThemeSelector,
    AnimatedThemeToggle
};
