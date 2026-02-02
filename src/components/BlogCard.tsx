// src/components/BlogCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blog";
import { useTranslation } from "react-i18next";

export default function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation();
  return (
    <article className="rounded-2xl border border-muted/25 overflow-hidden">
      {post.cover && (
        <img
          src={post.cover}
          alt=""
          className="h-50 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <div className="text-xs text-muted mt-1">{post.date}</div>
        <p className="mt-2 text-sm text-muted">{post.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
          {post.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full border border-muted/30">
              {t(`blog.tags.${tag}`, tag)}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <Link
            to={`/blog/${post.slug}`}
            className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition"
          >
            {t("blog.readMore")}
          </Link>
        </div>
      </div>
    </article>
  );
}
