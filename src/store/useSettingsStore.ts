import { create } from "zustand";

export type UserRole = "partner" | "associate" | "paralegal" | "client";

type SettingsState = {
  role: UserRole;
  language: "en" | "ar";
  theme: "light" | "dark" | "high-contrast";
  notificationsOpen: boolean;
  setRole: (role: UserRole) => void;
  setLanguage: (language: "en" | "ar") => void;
  setTheme: (theme: SettingsState["theme"]) => void;
  toggleNotifications: (open?: boolean) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  role: (typeof window !== "undefined" &&
    (localStorage.getItem("khirfan_role") as UserRole)) || "partner",
  language:
    (typeof window !== "undefined" &&
      (localStorage.getItem("khirfan_lang") as "en" | "ar")) || "en",
  theme:
    (typeof window !== "undefined" &&
      (localStorage.getItem("khirfan_theme") as SettingsState["theme"])) ||
    "light",
  notificationsOpen: false,
  setRole: (role) => {
    if (typeof window !== "undefined") localStorage.setItem("khirfan_role", role);
    set({ role });
  },
  setLanguage: (language) => {
    if (typeof window !== "undefined") localStorage.setItem("khirfan_lang", language);
    set({ language });
  },
  setTheme: (theme) => {
    if (typeof window !== "undefined") localStorage.setItem("khirfan_theme", theme);
    set({ theme });
  },
  toggleNotifications: (open) => set((s) => ({ notificationsOpen: open ?? !s.notificationsOpen })),
}));


