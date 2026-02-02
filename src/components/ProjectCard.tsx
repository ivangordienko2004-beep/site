// src/components/ProjectCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

type Aspect = "3/2" | "16/9" | "1/1";

type ProjectCardProps = {
  item: Project;
  /** Соотношение сторон блока обложки. По умолчанию 3:2 */
  coverAspect?: Aspect;
};

export default function ProjectCard({ item, coverAspect = "3/2" }: ProjectCardProps) {
  const href = item.slug ? `/projects/${item.slug}` : "#";

  const aspectClass =
    coverAspect === "3/2"
      ? "aspect-[3/2]"
      : coverAspect === "16/9"
      ? "aspect-[16/9]"
      : coverAspect === "1/1"
      ? "aspect-square"
      : "aspect-[3/2]";

  const performers = item.credits?.performers ?? [];
  const perfLabel = performers.length > 1 ? "Исполняют" : "Исполняет";
  const poet = item.credits?.poet;
  const music = item.credits?.music;

  const watchUrl =
    item.links?.youtube ||
    item.links?.vk ||
    item.links?.mp3 ||
    item.links?.yandex;

  return (
    <article className="rounded-2xl border border-muted/25 overflow-hidden h-full flex flex-col">
      {/* Обложка → переход на страницу проекта */}
      <Link to={href} className="block group" aria-label={item.title}>
        <div className={`${aspectClass} w-full overflow-hidden bg-fg/5`}>
          {item.cover ? (
            <img
              src={item.cover}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-muted text-sm">
              {item.title}
            </div>
          )}
        </div>
      </Link>

      {/* Контент карточки */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-semibold leading-tight">
          <Link to={href} className="hover:underline">{item.title}</Link>
        </h3>

        {item.summary && (
          <p className="text-sm text-muted">{item.summary}</p>
        )}

        {/* Мета: Исполняет(ют) / Музыка / Стихи */}
        <div className="text-sm space-y-1">
          {performers.length > 0 && (
            <div>
              <span className="text-muted">{perfLabel}: </span>
              {performers.join(", ")}
            </div>
          )}
          {music && (
            <div>
              <span className="text-muted">Музыка: </span>
              {music}
            </div>
          )}
          {poet && (
            <div>
              <span className="text-muted">Стихи: </span>
              {poet}
            </div>
          )}
        </div>

        {/* Действия */}
        <div className="mt-2 flex items-center gap-3">
          {watchUrl && (
            <a
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:opacity-80 text-sm inline-flex items-center gap-1"
            >
              Смотреть
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24">
                <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}

          <Link
            to={href}
            className="text-primary/80 hover:opacity-80 text-sm inline-flex items-center gap-1"
          >
            Подробнее
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24">
              <path d="M5 12h12m0 0l-5-5m5 5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
