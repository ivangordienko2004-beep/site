import React, { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import Heading from "@/components/Heading";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { posts } from "@/data/blog";
import { motion } from "framer-motion";
import ShareBar from "@/components/ShareBar";

const PAGE_SIZE = 4;

export default function Blog() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "ru").slice(0, 2) as "ru" | "en";
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://example.com";

  const list = useMemo(
    () =>
      posts
        .filter((p) => p.lang === lang)
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    [lang]
  );

  const tags = useMemo(() => {
    const s = new Set<string>();
    list.forEach((p) => p.tags.forEach((t) => s.add(t)));
    return ["all", ...Array.from(s)];
  }, [list]);

  const [tag, setTag] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (tag === "all" ? list : list.filter((p) => p.tags.includes(tag))),
    [list, tag]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const fadeIn = (i = 0) => ({
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: "easeOut", delay: 0.04 * i },
    viewport: { once: true },
  });

  return (
    <Section>
      <Heading as="h1" size="lg">{t("blog.title")}</Heading>

      {/* Фильтр по тегам */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((key) => (
          <button
            key={key}
            onClick={() => {
              setTag(key);
              setPage(1);
            }}
            className={`px-3 py-1 rounded-2xl border text-sm transition
              ${tag === key ? "border-primary text-primary" : "border-muted/40 hover:bg-fg/5"}`}
          >
            {key === "all" ? t("blog.all") : t(`tags.${key}`)}
          </button>
        ))}
      </div>

      {/* Список карточек */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {slice.map((p, i) => {
          // Если в объекте поста есть кастомная ссылка (например, на отдельную страницу),
          // используем её вместо стандартного маршрута /blog/:slug
          const href = (p as any).href ?? `/blog/${p.slug}`;
          const shareUrl = href.startsWith("http") ? href : `${origin}${href}`;

          return (
            <motion.article
              key={p.slug}
              {...fadeIn(i)}
              className="rounded-2xl border border-muted/25 overflow-hidden"
            >
            {p.cover && (
              <Link to={href} className="block group" aria-label={p.title}>
                <div className="aspect-[3/2] w-full overflow-hidden bg-fg/5">
                  <img
                    src={p.cover}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            )}
              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  <Link to={href} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>
                <div className="text-xs text-muted mt-1">
                  {new Date(p.date).toLocaleDateString(lang)}
                </div>
                <p className="mt-2 text-sm text-muted">{p.summary}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((tkey) => (
                    <span
                      key={tkey}
                      className="px-2 h-6 rounded-lg border border-muted/30 text-xs inline-flex items-center"
                    >
                      {t(`tags.${tkey}`)}
                    </span>
                  ))}
                </div>

                {/* Читать + Поделиться (компактно) */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link to={href} className="text-primary hover:opacity-80 text-sm">
                    {t("blog.view")}
                  </Link>

                  <ShareBar url={shareUrl} title={p.title} cover={p.cover} compact />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Пагинация */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`h-9 min-w-9 px-3 rounded-xl border text-sm transition
              ${page === i + 1 ? "border-primary text-primary" : "border-muted/40 hover:bg-fg/5"}`}
            aria-current={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Пусто */}
      {slice.length === 0 && <p className="mt-6 text-muted">{t("blog.empty")}</p>}
    </Section>
  );
}
