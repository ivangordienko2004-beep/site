import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Download, Info, PlayCircle } from "lucide-react";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      {/* фон */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% -20%, hsla(var(--primary)/0.18), transparent 60%), radial-gradient(800px 400px at -10% 0%, hsla(var(--danger)/0.14), transparent 60%), linear-gradient(hsl(var(--bg)), hsl(var(--bg)))",
        }}
      />

      <Container className="py-16 sm:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                {t("hero.name")}
              </h1>
              <p className="text-muted text-base sm:text-lg">
                {t("hero.role")}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <Button asChild>
                  <Link to="/projects">
                    <PlayCircle className="mr-2 size-4" />
                    {t("hero.ctaProjects")}
                  </Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link to="/about">
                    <Info className="mr-2 size-4" />
                    {t("hero.ctaAbout")}
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 size-4" />
                    {t("hero.ctaResume")}
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Фото героя */}
          <Reveal>
            <div className="mx-auto md:ml-auto rounded-full border border-muted/40 p-1">
              <img
                src="/images/hero.jpg" // файл лежит в public/images
                alt={t("hero.name") ?? "Hero photo"}
                className="block size-48 sm:size-56 md:size-64 rounded-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
