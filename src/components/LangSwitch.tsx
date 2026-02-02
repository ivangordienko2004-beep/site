import React from "react";
import { useTranslation } from "react-i18next";

export function LangSwitch() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ru";

  const setLang = (next: "ru" | "en") => {
    i18n.changeLanguage(next);
    try { localStorage.setItem("lang", next); } catch {}
    // можно также обновить атрибут <html lang="...">
    document.documentElement.setAttribute("lang", next);
  };

  return (
    <div className="inline-flex rounded-full border border-gold/40 p-0.5 text-xs">
      <button
        onClick={() => setLang("ru")}
        className={`px-2 py-1 rounded-full ${lang === "ru" ? "bg-gold/10" : ""}`}
        aria-pressed={lang === "ru"}
      >
        RU
      </button>
      <span className="px-1 opacity-50">|</span>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded-full ${lang === "en" ? "bg-gold/10" : ""}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
