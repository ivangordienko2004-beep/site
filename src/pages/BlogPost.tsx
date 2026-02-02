// src/pages/BlogPost.tsx  (перевели в «карточку» и подключили ShareBar)
import React, { useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Section } from "@/components/Section";
import Heading from "@/components/Heading";
import { posts } from "@/data/blog";
import ShareBar from "@/components/ShareBar";
import { useTranslation } from "react-i18next";

export default function BlogPost() {
  const { t, i18n } = useTranslation();
  const { slug = "" } = useParams();
  const lang = (i18n.language || "ru").slice(0, 2) as "ru" | "en";
  const post = posts.find(p => p.slug === slug && p.lang === lang);

  useEffect(() => { if (post) document.title = `${post.title} — ${t("nav.blog")}`; }, [post, t]);

  if (!post) {
    return (
      <Section>
        <Heading as="h1" size="lg">404</Heading>
        <p className="mt-2">{t("blog.notFound")}</p>
        <Link to="/blog" className="text-primary hover:opacity-80 mt-3 inline-block">{t("blog.back")}</Link>
      </Section>
    );
  }

  const dateStr = useMemo(() => {
    if (!post.date) return "";
    const d = new Date(post.date);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  }, [post.date, lang]);

  return (
    <Section>
      <article className="rounded-2xl border border-muted/25 p-4 sm:p-6 space-y-4">
        <header className="space-y-2">
          <Heading as="h1" size="lg">{post.title}</Heading>
          {dateStr && <div className="text-xs text-muted">{dateStr}</div>}
          <div className="flex flex-wrap gap-2">
            {post.tags.map(k => (
              <span key={k} className="px-2 h-6 rounded-lg border border-muted/30 text-xs inline-flex items-center">
                {t(`tags.${k}`)}
              </span>
            ))}
          </div>
          {post.cover && (
            <div className="h-56 sm:h-72 rounded-2xl border border-muted/25 bg-center bg-cover"
                 style={{ backgroundImage: `url(${post.cover})` }} aria-hidden />
          )}
        </header>

        <div className="leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer className="pt-2 flex items-center justify-between gap-3 flex-wrap">
          <Link to="/blog" className="text-primary hover:opacity-80">{t("blog.back")}</Link>
          <ShareBar url={`/blog/${post.slug}`} title={post.title} cover={post.cover} />
        </footer>
      </article>
    </Section>
  );
}
