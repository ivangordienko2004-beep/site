// src/pages/Projects.tsx
import React, { useMemo, useState } from "react";
import Heading from "@/components/Heading";
import { Section } from "@/components/Section";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const PAGE_SIZE = 2;

// Фиксированный набор фильтров
const TAGS = ["all", "solo", "duet"] as const;
type TagKey = typeof TAGS[number];

export default function Projects() {
  const [tag, setTag] = useState<TagKey>("all");
  const [page, setPage] = useState(1);

  // Сортировка по дате (если есть), новые выше
  const sorted = useMemo(() => {
    return [...projects].sort((a, b) => {
      const ta = a.date ? Date.parse(a.date) : 0;
      const tb = b.date ? Date.parse(b.date) : 0;
      return tb - ta;
    });
  }, []);

  // Определяем категорию из данных:
  // - если есть явный tag 'solo'/'duet' в item.tags — используем его
  // - иначе считаем по количеству исполнителей в credits.performers
  function categoryOf(p: (typeof projects)[number]): "solo" | "duet" | null {
    if (p.tags?.includes("solo")) return "solo";
    if (p.tags?.includes("duet")) return "duet";
    const count = p.credits?.performers?.length ?? 0;
    if (count === 1) return "solo";
    if (count > 1) return "duet";
    return null;
  }

  const filtered = useMemo(() => {
    if (tag === "all") return sorted;
    return sorted.filter((p) => categoryOf(p) === tag);
  }, [sorted, tag]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const slice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const fadeIn = (i = 0) => ({
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut", delay: 0.03 * i },
    viewport: { once: true },
  });

  return (
    <div className="space-y-8">
      <Section>
        <Heading as="h1" size="lg">Проекты</Heading>

        {/* Фильтры: Все / Соло / Дуэт */}
        <div className="mt-4 flex flex-wrap gap-2">
          {TAGS.map((tg) => (
            <button
              key={tg}
              onClick={() => { setTag(tg); setPage(1); }}
              className={`px-3 py-1 rounded-2xl border text-sm transition
                ${tag === tg ? "border-primary text-primary" : "border-muted/40 hover:bg-fg/5"}`}
            >
              {tg === "all" ? "Все" : tg === "solo" ? "Соло" : "Дуэт"}
            </button>
          ))}
        </div>

        {/* Грид карточек */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {slice.map((p, i) => (
            <motion.div key={p.slug} {...fadeIn(i)}>
              <ProjectCard item={p} coverAspect="3/2" />
            </motion.div>
          ))}
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
      </Section>
    </div>
  );
}
