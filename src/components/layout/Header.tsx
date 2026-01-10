import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, Activity, Shield, Heart, FileText, BookOpen, Leaf, User, LogOut, Compass, Newspaper, Hospital, Siren } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatedThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilitySettingsPanel } from "@/components/accessibility/AccessibilitySettings";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  const navLinks = [
    { href: "/symptoms", label: t("nav.checkSymptoms"), icon: Activity },
    { href: "/chat", label: t("nav.healthChat"), icon: Heart },
    { href: "/library", label: t("nav.healthLibrary"), icon: BookOpen },
    { href: "/news", label: "News & Hospitals", icon: Newspaper },
    { href: "/natural-health", label: "Natural Health", icon: Leaf },
    { href: "/scanner", label: t("nav.prescriptionScanner"), icon: FileText },
    { href: "/about", label: t("nav.aboutUs"), icon: Shield },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-border/50"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Health Navigator AI - Home">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Heart className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
          </div>
          <span className="font-bold text-lg hidden sm:block">
            Health Navigator<span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              aria-current={location.pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {/* Accessibility Settings */}
          <AccessibilitySettingsPanel />
          {/* Theme Toggle */}
          <AnimatedThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard" className="gap-2">
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild size="default">
                <Link to="/symptoms">{t("common.getStarted")}</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Accessibility */}
          <AccessibilitySettingsPanel />
          {/* Mobile Theme Toggle */}
          <AnimatedThemeToggle />
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background"
          >
            <nav className="container py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link to="/symptoms" onClick={() => setIsOpen(false)}>
                  {t("common.getStarted")}
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
