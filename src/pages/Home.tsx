// src/pages/Home.tsx
import React from "react";
import Heading from "@/components/Heading";
import { Section } from "@/components/Section";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhotoRibbon from "@/components/PhotoRibbon";

export default function Home() {
  const { t } = useTranslation();

  const features = [
    { k: t("home.features.services.title"), d: t("home.features.services.desc") },
    { k: t("home.features.values.title"), d: t("home.features.values.desc") },
    { k: t("home.features.reliability.title"), d: t("home.features.reliability.desc") },
  ];

  const fadeIn = (delay = 0, y = 18) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay },
    viewport: { once: true, margin: "-15% 0px -10% 0px" },
  });

  return (
    <div className="space-y-14">
      {/* HERO */}
      <Section className="relative grid place-items-center text-center overflow-hidden min-h-screen rounded-3xl border border-muted/20">
        <div
          className="absolute inset-0 hero-bg pointer-events-none select-none
                     [mask-image:linear-gradient(to_bottom,rgba(0,0,0,.85),rgba(0,0,0,.4),transparent)]"
          aria-hidden
        />
        <motion.div className="relative z-10 px-6" {...fadeIn(0.0, 12)}>
          <motion.div {...fadeIn(0.0, 10)}>
            <Heading as="h1">{t("hero.name")}</Heading>
          </motion.div>
          <motion.p className="mt-3 text-muted" {...fadeIn(0.06, 12)}>
            {t("hero.role")}
          </motion.p>

          <motion.div
            className="mt-6 inline-flex flex-wrap items-center justify-center gap-3"
            {...fadeIn(0.12, 14)}
          >
            <Link
              to="/about"
              className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition"
            >
              {t("hero.ctaAbout")}
            </Link>
            <Link
              to="/projects"
              className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition"
            >
              {t("hero.ctaProjects")}
            </Link>
            <a
              href="/resume.pdf"
              download
              className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition"
            >
              {t("hero.ctaResume")}
            </a>
          </motion.div>
        </motion.div>
      </Section>

      {/* Инфо-блоки */}
      <Section>
        <motion.div className="mx-auto max-w-3xl text-center" {...fadeIn(0.0, 10)}>
          <Heading as="h2" size="lg">{t("about.title")}</Heading>
          <p className="mt-3 text-muted">{t("about.short")}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {features.map((x, i) => (
              <motion.div
                key={x.k}
                className="rounded-2xl border border-muted/20 p-4 text-sm"
                {...fadeIn(0.05 * (i + 1), 12)}
              >
                <div className="font-semibold">{x.k}</div>
                <div className="mt-1 text-muted">{x.d}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Фотогалерея */}
      <Section>
        <motion.div {...fadeIn(0.0, 10)}>
          <Heading as="h2" size="md">Фото</Heading>
          <p className="text-muted mt-1"></p>
          <div className="mt-4">
            <PhotoRibbon
              itemsPerView={3}    // показываем по 3 фото
              gap={12}            // отступы между ними
              autoplay            // автопрокрутка
              autoSpeed={35}      // скорость
            />
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
