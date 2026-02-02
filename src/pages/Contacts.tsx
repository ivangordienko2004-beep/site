// src/pages/Contacts.tsx
import React from "react";
import { Section } from "@/components/Section";
import Heading from "@/components/Heading";

type FormData = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot (антиспам)
};

type Status = "idle" | "sending" | "success" | "error";

export default function Contacts() {
  const [data, setData] = React.useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  const onChange =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((d) => ({ ...d, [key]: e.target.value }));
    };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    // Honeypot: если поле заполнено — вероятно, бот
    if (data.website && data.website.trim().length > 0) {
      setStatus("error");
      setError("Похоже на спам. Попробуйте ещё раз.");
      return;
    }

    const payload = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    };

    try {
      // Реальный вызов backend-эндпоинта (FastAPI):
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server error ${res.status}: ${txt}`);
      }

      // Можно посмотреть, какие каналы сработали (excel/telegram/email)
      const result = await res.json();
      console.log("[ContactForm] delivered:", result);

      setStatus("success");
      setData({ name: "", email: "", message: "", website: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Не удалось отправить сообщение.");
    }
  }

  return (
    <Section>
      <Heading as="h1" size="lg">Контакты</Heading>
      <p className="mt-2 text-muted max-w-2xl">
        Заполните форму — я отвечу на указанный email. Поля, отмеченные *, обязательны.
      </p>

      <form onSubmit={onSubmit} className="mt-6 max-w-xl space-y-4" noValidate>
        {/* Honeypot (скрытое поле для ботов) */}
        <div className="hidden">
          <label>
            Не заполняйте это поле
            <input
              type="text"
              name="website"
              autoComplete="off"
              value={data.website}
              onChange={onChange("website")}
            />
          </label>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Имя*
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            value={data.name}
            onChange={onChange("name")}
            className="mt-1 w-full rounded-xl border border-muted/40 px-3 py-2 outline-none focus:border-primary"
            placeholder="Ваше имя"
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={data.email}
            onChange={onChange("email")}
            className="mt-1 w-full rounded-xl border border-muted/40 px-3 py-2 outline-none focus:border-primary"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Сообщение*
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={6}
            value={data.message}
            onChange={onChange("message")}
            className="mt-1 w-full rounded-xl border border-muted/40 px-3 py-2 outline-none focus:border-primary"
            placeholder="Кратко опишите вопрос или запрос"
          />
        </div>

        <div className="pt-2 flex items-center gap-3 flex-wrap">
          <button
            type="submit"
            disabled={status === "sending"}
            className={`px-4 h-10 rounded-xl border text-sm transition ${
              status === "sending"
                ? "border-muted/40 opacity-60 cursor-not-allowed"
                : "border-primary text-primary hover:bg-primary/5"
            }`}
          >
            {status === "sending" ? "Отправка..." : "Отправить"}
          </button>

          {status === "success" && (
            <span className="text-green-600 text-sm" role="status" aria-live="polite">
              Сообщение отправлено. Спасибо!
            </span>
          )}

          {status === "error" && (
            <span className="text-red-600 text-sm" role="alert" aria-live="assertive">
              {error ?? "Ошибка отправки. Попробуйте позже."}
            </span>
          )}
        </div>
      </form>

      <div className="mt-8 text-sm text-muted max-w-2xl space-y-2">
        <p>
          Отправляя форму, вы соглашаетесь с обработкой персональных данных и получением обратной связи по указанному email.
        </p>
        <p className="text-xs">
          Поддерживаются интеграции: Excel, Telegram и Email — на сервере через FastAPI.
        </p>
      </div>
    </Section>
  );
}
