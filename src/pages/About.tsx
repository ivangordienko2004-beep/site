// src/pages/About.tsx
import React, { useId, useState } from "react";
import { Section } from "@/components/Section";
import Heading from "@/components/Heading";
import { useTranslation } from "react-i18next";
import { profile, type ListItem } from "@/data/profile";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "@/components/icons/ChevronDown";

// Появление сразу (для элементов, которые видны при загрузке)
const enter = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.28, ease: "easeOut", delay: 0.05 * i },
});

// Появление при прокрутке (ленивое)
const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.28, ease: "easeOut", delay: 0.05 * i },
  viewport: { once: true, amount: 0.2 },
});

function ExpandableItem({
  item,
  anim,
}: {
  item: ListItem;
  // анимация поступает из родителя: enter() или reveal()
  anim?: any;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduce = useReducedMotion();

  const title = typeof item === "string" ? item : item.title;
  const desc = typeof item === "string" ? undefined : item.desc;

  return (
    <motion.li
      {...(anim || {})}
      layout
      transition={{ layout: { duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] } }}
      className="rounded-xl border border-muted/25"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-fg/5 transition"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-medium">{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduce ? 0.1 : 0.25, ease: "easeOut" }}
          aria-hidden
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            // Плавный автогроу высоты + прозрачность
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduce ? 0.15 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="px-4 pb-4 text-sm text-muted overflow-hidden will-change-[height,opacity]"
          >
            {desc ?? "Подробнее скоро."}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

type Aspect = "3/2" | "16/9" | "1/1" | "3/4";
const aspectClass = (a: Aspect = "3/2") =>
  a === "3/2"
    ? "aspect-[3/2]"
    : a === "16/9"
    ? "aspect-[16/9]"
    : a === "1/1"
    ? "aspect-square"
    : "aspect-[3/4]";

function CardRow({
  title,
  items,
  image,
  reverse = false,
  immediate = false, // если true — показываем сразу (enter)
  imageAspect = "3/2",
}: {
  title: string;
  items: ListItem[];
  image?: string;
  reverse?: boolean;
  immediate?: boolean;
  imageAspect?: Aspect;
}) {
  const anim = immediate ? enter : reveal;

  return (
    <Section className="rounded-2xl border border-muted/25 p-5 sm:p-6">
      <div
        className={`flex flex-col gap-5 sm:gap-8 sm:items-center ${
          reverse ? "sm:flex-row-reverse" : "sm:flex-row"
        }`}
      >
        <motion.div {...anim(0)} className="flex-1 min-w-0">
          <Heading as="h2" size="md">
            {title}
          </Heading>
          <ul className="mt-3 space-y-2">
            {items.map((x, i) => (
              <ExpandableItem key={i} item={x} anim={anim(i + 1)} />
            ))}
          </ul>
        </motion.div>

        <motion.div
          {...anim(0)}
          className={`sm:w-72 md:w-80 ${aspectClass(imageAspect)} rounded-xl border border-muted/25 bg-center bg-cover`}
          style={{ backgroundImage: `url(${image || profile.photo})` }}
          aria-hidden
        />
      </div>
    </Section>
  );
}

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      {/* Intro — сразу */}
      <Section className="grid gap-6 sm:grid-cols-[160px_1fr] items-center">
        <motion.img
          {...enter(0)}
          src={profile.photo}
          alt={profile.fullName}
          className="h-40 w-40 rounded-2xl object-cover border border-muted/30"
          loading="lazy"
        />
        <motion.div {...enter(1)}>
          <Heading as="h1" size="lg">
            {t("about.title")}
          </Heading>
          <p className="mt-2 text-muted">{t("about.short")}</p>
          <p className="mt-3">{profile.longBio}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download
              className="px-4 h-10 inline-flex items-center rounded-xl border border-muted/40 hover:bg-fg/5 transition"
            >
              {t("hero.ctaResume")}
            </a>
          </div>
        </motion.div>
      </Section>

      {/* Два первых ряда — immediate=true (видны сразу при загрузке) */}
      <CardRow
        immediate
        title={t("about.education")}
        items={profile.education}
        image="/images/about/education.JPEG"   // ← привёл к нижнему регистру
        imageAspect="3/4"                      // ← портрет 3:4
      />
      <CardRow
        immediate
        reverse
        title={t("about.awards")}
        items={profile.awards}
        image="/images/about/awards.JPG"
        imageAspect="3/4"
        // imageAspect по умолчанию 3:2
      />

      {/* Остальные — reveal при прокрутке */}
      <CardRow
        title={t("about.positions")}
        items={profile.positions}
        image="/images/about/positions.JPG"
        imageAspect="3/4"
      />
      <CardRow
        reverse
        title={t("about.letters")}
        items={profile.letters}
        image="/images/about/letters.JPG"
        imageAspect="3/4"
      />
      <CardRow
        title={t("about.volunteer")}
        items={profile.volunteer}
        image="/images/about/volunteer.JPG"
        imageAspect="3/4"
      />
      <CardRow
        reverse
        title={t("about.media")}
        items={[
          ...profile.media.tv.map((s) => ({ title: `ТВ: ${s}` })),
          ...(profile.media.reporter ?? []).map((s) => ({ title: `Репортёр: ${s}` })),
          ...profile.media.ads.map((s) => ({ title: `Реклама: ${s}` })),
          ...profile.media.titles.map((s) => ({ title: `Титул: ${s}` })),
        ]}
        image="/images/about/media.JPG"
        imageAspect="3/4"
      />

      {/* Контакты */}
      <Section>
        <Heading as="h2" size="md">
          {t("about.contacts")}
        </Heading>
        <div className="mt-3 grid gap-2 text-sm">
          <div>
            Email:{" "}
            <a className="underline hover:opacity-80" href={`mailto:${profile.contacts.email}`}>
              {profile.contacts.email}
            </a>
          </div>
          <div>
            Telegram:{" "}
            <a
              className="underline hover:opacity-80"
              href={profile.contacts.telegram}
              target="_blank"
              rel="noreferrer noopener"
            >
              t.me/AnastasiaFrantseva1409
            </a>
          </div>
          <div>
            VK:{" "}
            <a
              className="underline hover:opacity-80"
              href={profile.contacts.vk}
              target="_blank"
              rel="noreferrer noopener"
            >
              vk.com/id367472563
            </a>
          </div>
          <div>
            Phone:{" "}
            <a className="underline hover:opacity-80" href="tel:+79164835608">
              +7 916 483-56-08
            </a>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">* Контакты будут видимы только после ввода пароля (Шаг 11).</p>
      </Section>
    </div>
  );
}
