"use client";

import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("settings")}</h1>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-white/50 dark:bg-black/20 text-sm">
        Firm info, integrations, theming, demo reset placeholder.
      </div>
    </div>
  );
}


