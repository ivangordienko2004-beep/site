// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Стартовый язык: из localStorage, иначе — "ru"
const storedLang =
  (typeof window !== "undefined" &&
    (localStorage.getItem("lang") as "ru" | "en" | null)) || "ru";

const resources = {
  ru: {
    common: {
      nav: {
        home: "Главная",
        projects: "Проекты",
        about: "Обо мне",
        blog: "Блог",
        contacts: "Контакты",
      },
      hero: {
        name: "Анастасия Францева",
        role: "Певица, солистка проекта «СВОи песни»",
        ctaAbout: "Обо мне",
        ctaProjects: "Смотреть проекты",
        ctaResume: "Скачать резюме",
      },
      home: {
        features: {
          services: { title: "Услуги", desc: "Концерты, официальные мероприятия" },
          values: { title: "Ценности", desc: "Память, уважение, служение" },
          reliability: { title: "Надёжность", desc: "Точность тайминга и репертуара" },
        },
      },
      about: {
        title: "Обо мне",
        short:
          "С 16 лет выезжаю в зону СВО с гуманитарной миссией и концертами для бойцов.",
        education: "Образование",
        awards: "Награды",
        positions: "Должности и статусы",
        letters: "Благодарственные письма / грамоты",
        volunteer: "Волонтёрская деятельность и сцена",
        media: "Медиа и проекты",
        contacts: "Контакты",
      },
      projects: { title: "Проекты", view: "Посмотреть" },
      tags: {
        all: "Все",
        song: "Песня",
        duet: "Дуэт",
        clip: "Клип",
        article: "Статья",
        event: "Событие",
      },
      blog: {
        title: "Блог",
        view: "Читать",
        readMore: "Читать",
        all: "Все",
        empty: "Постов пока нет.",
        back: "Назад",
        notFound: "Пост не найден.",
        share: "Поделиться",
        shareVk: "ВКонтакте",
        shareTg: "Telegram",
      },
    },
  },
  en: {
    common: {
      nav: {
        home: "Home",
        projects: "Projects",
        about: "About",
        blog: "Blog",
        contacts: "Contacts",
      },
      hero: {
        name: "Anastasia Frantseva",
        role: "Singer, soloist of the project ‘SVOi pesni’",
        ctaAbout: "About",
        ctaProjects: "View Projects",
        ctaResume: "Download CV",
      },
      home: {
        features: {
          services: { title: "Services", desc: "Concerts, official events" },
          values: { title: "Values", desc: "Remembrance, respect, service" },
          reliability: { title: "Reliability", desc: "Precise timing & repertoire" },
        },
      },
      about: {
        title: "About me",
        short:
          "Since the age of 16, I have travelled to the operation zone with a humanitarian mission and concerts for service members.",
        education: "Education",
        awards: "Awards",
        positions: "Positions & Roles",
        letters: "Letters of Appreciation / Certificates",
        volunteer: "Volunteering & Stage",
        media: "Media & Projects",
        contacts: "Contacts",
      },
      projects: { title: "Projects", view: "View" },
      tags: {
        all: "All",
        song: "Song",
        duet: "Duet",
        clip: "Clip",
        article: "Article",
        event: "Event",
      },
      blog: {
        title: "Blog",
        view: "Read",
        readMore: "Read",
        all: "All",
        empty: "No posts yet.",
        back: "Back to blog",
        notFound: "Post not found.",
        share: "Share",
        shareVk: "VK",
        shareTg: "Telegram",
      },
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: storedLang,
  fallbackLng: "ru",
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
