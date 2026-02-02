// src/pages/PatrioticConcerts.tsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PatrioticConcerts() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <header className="space-y-3">
        <p className="text-sm text-muted-foreground">
          <Link to="/" className="underline hover:no-underline">Главная</Link> / Материалы
        </p>
        <h1 className="text-3xl font-bold leading-tight">
          Военно-патриотические концерты: организация и ценности
        </h1>
        <p className="text-muted-foreground">
          Краткое практическое руководство: цели, сценарная архитектура, логистика и этика.
        </p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">1. Смысл и ценностная рамка</h2>
        <p>
          Военно-патриотический концерт — это культурная форма, где художественное воздействие
          сочетается с воспитательной задачей: сохранение исторической памяти, уважение к подвигу
          защитников, гражданская ответственность и единство поколений.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><b>Память о прошлом:</b> точность фактов, имён и дат.</li>
          <li><b>Гордость и сопричастность:</b> акцент на служении Родине и общественному долгу.</li>
          <li><b>Единство поколений:</b> совместные номера ветеранов, военнослужащих и молодёжи.</li>
          <li><b>Моральная стойкость:</b> уважение, достоинство, такт.</li>
        </ul>
      </motion.section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2. Сценарная архитектура</h2>
        <p>Дуга: «память → служение → надежда».</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><b>Открытие:</b> вступление + инструментальная прелюдия.</li>
          <li><b>Память:</b> песни/стихи о ключевых событиях; чтение писем.</li>
          <li><b>Диалог поколений:</b> короткие живые истории гостей (3–5 мин).</li>
          <li><b>Служение и поддержка:</b> современные авторы, волонтёрские кейсы.</li>
          <li><b>Надежда:</b> финальный совместный номер.</li>
        </ol>
        <p className="text-sm text-muted-foreground">
          Темп: 4–6 мин на номер; блоки по 15–18 мин; чередуйте крупные и камерные формы.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3. Организация и логистика</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><b>Репертуар:</b> права, тональности, хронометраж.</li>
          <li><b>Состав:</b> вокал/чтецы/ансамбль/ведущий, сетка репетиций.</li>
          <li><b>Техника:</b> радиомики/петлички, световые сцены, видеопроекция, резерв носителей.</li>
          <li><b>Сцена:</b> сдержанная символика, безопасные проходы.</li>
          <li><b>Коммуникации:</b> согласования площадки, рассадка почётных гостей.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">4. Этика и безопасность</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Корректность формулировок и дат.</li>
          <li>Уважение к личным историям; избегать сенсационности.</li>
          <li>Бриф ведущего по чувствительным темам.</li>
          <li>План эвакуации, аптечка, ответственный по безопасности.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Чек-лист подготовки</h2>
        <div className="rounded-2xl border p-5">
          <ul className="list-disc pl-5 space-y-2">
            <li>Сценарий с таймингом и ролями.</li>
            <li>Техрайдер: микрофоны, свет, экран/проектор.</li>
            <li>Плейбеки + резерв.</li>
            <li>План рассадки, бейджи, волонтёры у входа.</li>
            <li>Генеральная репетиция c проверкой переходов.</li>
            <li>Фото/видео с релизами (согласиями), если нужно.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">6. Итог</h2>
        <p>
          Это не просто набор номеров, а диалог о памяти, долге и надежде. Сочетая художественное
          качество и этическую аккуратность, вы получаете событие, которое объединяет людей и усиливает
          смысл общих ценностей.
        </p>
      </section>
    </div>
  );
}
