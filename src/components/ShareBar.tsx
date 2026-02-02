import React from "react";
import { useTranslation } from "react-i18next";

type ShareBarProps = {
  url: string;
  title: string;
  cover?: string;
  className?: string;
  compact?: boolean; // <-- иконки без текста для карточек
};

function VkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M3 7.5c.1 5 4.2 9.9 9.7 9.9h.3v-3.5c2 .2 3.5 1.7 4.1 3.5h3.1c-.8-2.8-2.8-4.4-4.1-5 .9-.5 3-2.1 3.4-4.9h-2.9c-.5 2.1-2.1 3.4-3.6 3.6V7.5H10v6.1c-1.6-.4-3.5-2.1-4.3-6.1H3z"
        fill="currentColor"
      />
    </svg>
  );
}

function TgIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M21.7 4.6c.3-.9-.5-1.3-1.3-1L3.3 10.6c-.9.3-.9 1 .2 1.3l4.6 1.4 1.8 5.7c.3.9.8 1 1.3.2l2.6-3.4 4.8 3.6c.8.6 1.4.3 1.6-.7l1.5-14.1zM8.9 12.8l7.7-4.7-5.9 5.6-.2 3.2-1.6-4.1z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15 8a3 3 0 1 0-2.8-4H12a3 3 0 0 0 0 6h.2A9 9 0 0 0 6 18.5v1A11 11 0 0 1 15.2 8H15z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ShareBar({ url, title, cover, className, compact = false }: ShareBarProps) {
  const { t } = useTranslation();

  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://example.com";
  const absCover = cover ? (cover.startsWith("http") ? cover : origin + cover) : "";

  const vkHref =
    `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` +
    (absCover ? `&image=${encodeURIComponent(absCover)}` : "");
  const tgHref = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
    title
  )}`;

  const canNativeShare =
    typeof navigator !== "undefined" && typeof (navigator as any).share === "function";

  const onNativeShare = async () => {
    try {
      await (navigator as any).share({ title, url });
    } catch {}
  };

  const btnBase = [
    "inline-flex items-center gap-2 border border-muted/40 hover:bg-fg/5 transition",
    compact ? "px-2 h-8 rounded-lg" : "px-3 h-9 rounded-xl",
    "text-sm"
  ].join(" ");

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}>
      <a
        href={vkHref}
        target="_blank"
        rel="noopener noreferrer"
        className={btnBase}
        title={t("blog.shareVk")}
      >
        <VkIcon className="w-4 h-4" />
        {!compact && <span>{t("blog.shareVk")}</span>}
        {compact && <span className="sr-only">{t("blog.shareVk")}</span>}
      </a>
      <a
        href={tgHref}
        target="_blank"
        rel="noopener noreferrer"
        className={btnBase}
        title={t("blog.shareTg")}
      >
        <TgIcon className="w-4 h-4" />
        {!compact && <span>{t("blog.shareTg")}</span>}
        {compact && <span className="sr-only">{t("blog.shareTg")}</span>}
      </a>
      {canNativeShare && (
        <button onClick={onNativeShare} className={btnBase} title={t("blog.share")}>
          <ShareIcon className="w-4 h-4" />
          {!compact && <span>{t("blog.share")}</span>}
          {compact && <span className="sr-only">{t("blog.share")}</span>}
        </button>
      )}
    </div>
  );
}
