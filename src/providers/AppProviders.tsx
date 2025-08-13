"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { initializeI18n, setDocumentDirection } from "@/lib/i18n";

type AppProvidersProps = {
  children: ReactNode;
};

function DirectionSync() {
  const { i18n } = useTranslation();
  useEffect(() => {
    setDocumentDirection(i18n.language);
  }, [i18n.language]);
  return null;
}

export function AppProviders({ children }: AppProvidersProps) {
  const i18n = initializeI18n();
  return (
    <I18nextProvider i18n={i18n}>
      <DirectionSync />
      {children}
    </I18nextProvider>
  );
}


