"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Button } from "@/components/ui/Button";
import { Bell, Globe, UserCircle, ShieldCheck, Sparkles, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { OmniSearch } from "@/app/(components)/OmniSearch";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";

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
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr] bg-[--color-background] text-[--color-foreground]">
      <aside className="hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 p-4 gap-4">
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
      </aside>

      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-3 lg:p-4">
          <div className="flex items-center gap-2 lg:hidden">
            <LayoutGrid className="h-5 w-5" />
            <span className="font-semibold">{t("appName")}</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-cyan-600" />
            <span>{t("pdpBanner")}</span>
            <Button variant="ghost" size="sm">
              {t("viewControls")}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" aria-label={t("notifications")} onClick={() => toggleNotifications(true)}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="secondary" size="sm">
              <UserCircle className="h-5 w-5" />
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


