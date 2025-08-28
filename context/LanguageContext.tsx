"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/public/locales/en.json";
import ar from "@/public/locales/ar.json";

type Language = "en" | "ar";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: typeof en; // نصوص اللغة الحالية
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Language) || "en";
    }
    return "en";
  });

  const toggleLanguage = () => {
    const newLang: Language = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = language === "en" ? en : ar;
  const dir: "ltr" | "rtl" = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
