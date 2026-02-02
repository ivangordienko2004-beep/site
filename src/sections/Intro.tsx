import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { Link } from "react-router-dom";

export function Intro() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="intro">
      <Container className="py-12 sm:py-16">
        <Reveal>
          <Heading as="h2" id="intro" className="mb-4">
            {t("about.title")}
          </Heading>
          <p className="text-muted max-w-3xl">
            {t("about.short")}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Reveal><Card title="Концерты" desc="Официальные и благотворительные выступления." /></Reveal>

          {/* Делаем карточку кликабельной на /patriotic-concerts */}
          <Reveal>
            <Card
              title="Патриотические проекты"
              desc="Участие в общественных и военных мероприятиях."
              to="/patriotic-concerts"
            />
          </Reveal>

          <Reveal><Card title="Гуманитарная миссия" desc="Поездки в зону СВО с поддержкой бойцов." /></Reveal>
        </div>
      </Container>
    </section>
  );
}

function Card({ title, desc, to }: { title: string; desc: string; to?: string }) {
  const inner = (
    <div className="rounded-2xl border border-muted/30 p-5 hover:shadow-sm transition">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-muted mt-1">{desc}</div>
    </div>
  );
  return to ? <Link to={to} className="block">{inner}</Link> : inner;
}
