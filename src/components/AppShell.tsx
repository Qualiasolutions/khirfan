"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Button } from "@/components/ui/Button";
import { Bell, Globe, UserCircle, ShieldCheck, Sparkles, LayoutGrid, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { OmniSearch } from "@/app/(components)/OmniSearch";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", key: "overview" },
  { href: "/matters", key: "matters" },
  { href: "/documents", key: "documents" },
  { href: "/research", key: "research" },
  { href: "/clients", key: "clients" },
  { href: "/workflows", key: "workflows" },
  { href: "/billing", key: "billing" },
  { href: "/governance", key: "governance" },
  { href: "/ai-assistant", key: "aiAssistant" },
  { href: "/settings", key: "settings" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const { role, setRole, language, setLanguage, toggleNotifications } = useSettingsStore();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{t("appName")}</span>
          <span className="text-xs opacity-70">{t("poweredBy")}</span>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm",
                active ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300" : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2">
        <div className="text-xs font-medium opacity-70">{t("language")}</div>
        <div className="flex gap-2">
          <Button
            variant={language === "en" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setLanguage("en");
              i18n.changeLanguage("en");
            }}
          >
            EN
          </Button>
          <Button
            variant={language === "ar" ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setLanguage("ar");
              i18n.changeLanguage("ar");
            }}
          >
            AR
          </Button>
        </div>
        <div className="text-xs font-medium opacity-70">{t("role")}</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { k: "partner", label: t("partner") },
            { k: "associate", label: t("associate") },
            { k: "paralegal", label: t("paralegal") },
            { k: "client", label: t("client") },
          ].map((r) => (
            <Button
              key={r.k}
              size="sm"
              variant={mounted && role === r.k ? "default" : "outline"}
              onClick={() => setRole(r.k as "partner" | "associate" | "paralegal" | "client")}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-foreground]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:w-80 lg:flex-col border-r border-gray-200 dark:border-gray-800 p-4 gap-4 bg-white dark:bg-gray-900">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 gap-4 z-50 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{t("appName")}</span>
                    <span className="text-xs opacity-70">{t("poweredBy")}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen lg:ml-80">
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-3 lg:p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-30">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="h-8 w-8 p-0"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-semibold text-sm">{t("appName")}</span>
            </div>
          </div>

          {/* Desktop Banner */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-cyan-600" />
            <span>{t("pdpBanner")}</span>
            <Button variant="ghost" size="sm">
              {t("viewControls")}
            </Button>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" aria-label={t("notifications")} onClick={() => toggleNotifications(true)}>
              <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button variant="secondary" size="sm">
              <UserCircle className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </header>
        
        <main className="flex-1 p-4 lg:p-6">{children}</main>
        <Footer />
        <OmniSearch />
      </div>
    </div>
  );
}


