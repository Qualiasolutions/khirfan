"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Minimal namespaces to start; can be expanded as needed
const resources = {
  en: {
    common: {
      appName: "Khirfan AI Command Center",
      poweredBy: "Powered by Qualia Solutions",
      overview: "Overview",
      matters: "Matters",
      documents: "Documents",
      research: "Research",
      clients: "Clients",
      workflows: "Workflows",
      billing: "Billing",
      governance: "Governance",
      aiAssistant: "AI Assistant",
      settings: "Settings",
      language: "Language",
      english: "English",
      arabic: "Arabic",
      role: "Role",
      partner: "Partner",
      associate: "Associate",
      paralegal: "Paralegal",
      client: "Client",
      seedDemoData: "Seed Demo Data",
      compliance: "Compliance",
      notifications: "Notifications",
      search: "Search...",
      explainThis: "Explain this",
      viewControls: "View Controls",
      pdpBanner: "Complies with Jordan Personal Data Protection Law (2023)",
      highContrast: "High contrast",
    },
  },
  ar: {
    common: {
      appName: "مركز قيادة خيرفان للذكاء الاصطناعي",
      poweredBy: "بالتعاون مع كواليا سوليوشنز",
      overview: "نظرة عامة",
      matters: "القضايا",
      documents: "الوثائق",
      research: "البحث",
      clients: "العملاء",
      workflows: "سير العمل",
      billing: "الفوترة",
      governance: "الحوكمة",
      aiAssistant: "المساعد الذكي",
      settings: "الإعدادات",
      language: "اللغة",
      english: "الإنجليزية",
      arabic: "العربية",
      role: "الدور",
      partner: "شريك",
      associate: "محامٍ مساعد",
      paralegal: "مساعد قانوني",
      client: "عميل",
      seedDemoData: "تعبئة بيانات العرض",
      compliance: "الامتثال",
      notifications: "الإشعارات",
      search: "ابحث...",
      explainThis: "اشرح ذلك",
      viewControls: "عرض الضوابط",
      pdpBanner: "متوافق مع قانون حماية البيانات الشخصية الأردني (2023)",
      highContrast: "تباين عالٍ",
    },
  },
} as const;

const isInitialized = { current: false };

export function initializeI18n() {
  if (isInitialized.current) return i18n;

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: undefined, // language-detector decides; falls back to 'en'
      fallbackLng: "en",
      defaultNS: "common",
      ns: ["common"],
      interpolation: {
        escapeValue: false,
      },
      detection: {
        // localStorage key
        lookupLocalStorage: "khirfan_lang",
        caches: ["localStorage"],
      },
    });

  isInitialized.current = true;
  return i18n;
}

export function setDocumentDirection(lang: string) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }
  return dir;
}


