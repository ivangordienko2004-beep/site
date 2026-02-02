// src/pages/Home.tsx
import React from "react";
import Heading from "@/components/Heading";
import { Section } from "@/components/Section";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function useTheme(): "light" | "dark" {
  const read = () => {
    const el = document.documentElement;
    const ds = el.dataset.theme;
    if (ds === "light" || ds === "dark") return ds;
    return el.classList.contains("dark") ? "dark" : "light";
  };

  const [theme, setTheme] = React.useState<"light" | "dark">(read());

  React.useEffect(() => {
    const el = document.documentElement;
    const mo = new MutationObserver(() => setTheme(read()));
    mo.observe(el, { attributes: true, attributeFilter: ["data-theme", "class"] });
    const onStorage = () => setTheme(read());
    window.addEventListener("storage", onStorage);
    return () => {
      mo.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return theme;
}

export default function Home() {
  const { t } = useTranslation();
  const theme = useTheme();

  const heroSrc = theme === "dark" ? "/images/hero-dark.jpg" : "/images/hero-light.jpg";
  const opacityClass = theme === "dark" ? "opacity-10" : "opacity-25";

  return (
    <Section className="relative grid place-items-center text-center overflow-hidden min-h-[60vh] sm:min-h-[70vh]">
      {/* Фоновое изображение (декоративное) */}
      <img
        key={theme} // форсируем замену элемента при смене темы
        src={heroSrc}
        alt=""
        loading="eager"
        aria-hidden="true"
        onError={(e) => {
          // Фолбэк, если какого-то из файлов нет
          (e.currentTarget as HTMLImageElement).src = "/images/hero.jpg";
        }}
        className={`pointer-events-none select-none absolute inset-0 h-full w-full object-cover ${opacityClass}
                    [mask-image:linear-gradient(to_bottom,black,rgba(0,0,0,.65),transparent)]`}
      />

      <div className="relative z-10">
        <Heading as="h1">{t("hero.name")}</Heading>
        <p className="mt-3 text-muted">{t("hero.role")}</p>

        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3">
          <Link to="/about" className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition">
            {t("hero.ctaAbout")}
          </Link>
          <Link to="/projects" className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition">
            {t("hero.ctaProjects")}
          </Link>
          <a href="/resume.pdf" className="px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition" download>
            {t("hero.ctaResume")}
          </a>
        </div>
      </div>
    </Section>
  );
}
