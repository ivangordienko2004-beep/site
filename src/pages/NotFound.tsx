import React from "react";
import Heading from "@/components/Heading";
import { Link } from "react-router-dom";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="text-center">
      <Heading as="h1" size="lg">404 — Страница не найдена</Heading>
      <p className="mt-2 text-muted">Проверьте адрес или вернитесь на главную.</p>
      <div className="mt-6 space-x-4">
        <Link to="/" className="underline text-primary">На главную</Link>
        <Link to="/projects" className="underline text-primary">К проектам</Link>
      </div>
    </Section>
  );
}
