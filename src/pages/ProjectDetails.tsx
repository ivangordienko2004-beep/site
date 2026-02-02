import React from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import Heading from "@/components/Heading";
import { Section } from "@/components/Section";

export default function ProjectDetails() {
  const { slug } = useParams();
  const item = projects.find((p) => p.slug === slug);

  if (!item) {
    // Без throw — просто дружелюбный фолбэк, чтобы не видеть стандартную RR 404
    return (
      <Section className="py-12 text-center space-y-3">
        <Heading as="h1" size="lg">Проект не найден</Heading>
        <p className="text-muted">Проверьте ссылку или вернитесь к списку.</p>
        <Link to="/projects" className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition">
          К проектам
        </Link>
      </Section>
    );
  }

  const ytId = extractYouTubeId(item.links?.youtube);

  return (
    <Section className="space-y-6">
      <Heading as="h1" size="lg">{item.title}</Heading>
      <p className="text-muted">{item.summary}</p>

      {/* Встроенное видео YouTube, если есть */}
      {ytId && (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-muted/20">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${ytId}`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}

      {/* Ссылки наружу */}
      <div className="flex flex-wrap gap-2">
        {item.links?.youtube && (
          <a
            href={item.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition"
          >
            Открыть на YouTube
          </a>
        )}
        {item.links?.vk && (
          <a
            href={item.links.vk}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition"
          >
            Слушать во ВКонтакте
          </a>
        )}
      </div>
    </Section>
  );
}

function extractYouTubeId(url?: string) {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    return u.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}
