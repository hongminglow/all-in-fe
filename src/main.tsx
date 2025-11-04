import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import App from "./App";
import en from "./assets/locales/en.json";
import zh from "./assets/locales/zh.json";
import { LANGUAGES } from "./constant/misc";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
  },
  lng: LANGUAGES.ENGLISH,
  fallbackLng: LANGUAGES.ENGLISH,
  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
