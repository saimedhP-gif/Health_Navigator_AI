import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Shield, Mail, Phone } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/50 border-t border-border">
      {/* Disclaimer Banner */}
      <div className="bg-health-amber/10 border-b border-health-amber/20">
        <div className="container py-3">
          <p className="text-sm text-center text-health-amber font-medium">
            ⚠️ {t("common.disclaimer")}
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">
                Health Navigator<span className="text-primary"> AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-primary" />
                {t("landing.trustPrivacy")}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-primary" />
                {t("landing.trustDoctorReviewed")}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/symptoms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.checkSymptoms")}
              </Link>
              <Link to="/chat" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.healthChat")}
              </Link>
              <Link to="/library" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.healthLibrary")}
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.aboutUs")}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:support@healthnavigator.ai" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                support@healthnavigator.ai
              </a>
              <a href="tel:+1-800-HEALTH" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                1-800-HEALTH
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-6">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.privacyPolicy")}
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t("footer.termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
