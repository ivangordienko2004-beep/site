// src/data/blog.ts
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;          // YYYY-MM-DD
  tags: string[];        // используем ключи из i18n: 'article', 'event'
  cover?: string;        // /images/blog/...
  content: string;       // HTML
  lang: "ru" | "en";
  href?: string;         // (опционально) кастомный маршрут вместо /blog/:slug
};

export const posts: BlogPost[] = [
  {
    slug: "patriotic-concerts-2025",
    title: "Военно-патриотические концерты: организация и ценности",
    summary:
      "Как выстроить программу, взаимодействовать с площадкой и сохранить уважительный тон мероприятия.",
    date: "2025-06-01",
    tags: ["article"],
    cover: "/images/blog/cover-1.jpg",
    // Контент не используется, т.к. карточка ведёт на отдельную страницу (href),
    // но поле обязательно по типу — оставим краткий HTML.
    content: `
      <p>Материал вынесен на отдельную страницу с расширенным руководством и чек-листами.</p>
    `,
    lang: "ru",
    href: "/patriotic-concerts", // ← ведёт на созданную страницу
  },
  {
    slug: "report-kaliningrad",
    title: "Отчёт: День города Калининграда",
    summary:
      "Участие в открытии патриотического фестиваля «Город славен именами героев».",
    date: "2025-05-15",
    tags: ["event"],
    cover: "/images/blog/cover-2.jpg",
    content: `
      <p>Выступление прошло на центральной площади. Отдельное внимание — ветеранам и представителям флота. Благодарим организаторов за тёплый приём.</p>
    `,
    lang: "ru",
  },
  {
    slug: "values-and-repertoire",
    title: "Ценности и репертуар",
    summary:
      "Почему для нас важны уважение, память и служение — и как это отражается в песнях.",
    date: "2025-04-10",
    tags: ["article"],
    cover: "/images/blog/cover-3.jpg",
    content: `
      <p>Репертуар подбирается исходя из задачи события. Мы всегда бережно относимся к исторической памяти и людям в зале.</p>
    `,
    lang: "ru",
  },
];
