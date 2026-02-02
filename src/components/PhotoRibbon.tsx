// src/components/PhotoRibbon.tsx
import React from "react";

// Собираем изображения из папки
const files = import.meta.glob<{ default: string }>(
  "@/assets/ribbon/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" }
);

// Стабильный порядок — по имени
const IMAGES: string[] = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url);

type Props = {
  /** Сколько карточек показывать одновременно (ровно) */
  itemsPerView?: number;       // по умолчанию 3
  /** Отступ между карточками, px */
  gap?: number;                // по умолчанию 12
  /** Скругление карточек (классы Tailwind) */
  rounded?: string;            // "rounded-2xl"
  /** Коэфф. увеличения при hover */
  hoverScale?: number;         // 1.03
  /** Автопрокрутка */
  autoplay?: boolean;          // включена по умолчанию
  /** Скорость автопрокрутки, пикселей в секунду */
  autoSpeed?: number;          // 35
};

export default function PhotoRibbon({
  itemsPerView = 3,
  gap = 12,
  rounded = "rounded-2xl",
  hoverScale = 1.03,
  autoplay = true,
  autoSpeed = 35,
}: Props) {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const oneRef = React.useRef(0);            // ширина одной «копии» (1/3 от общего трека)
  const adjustingRef = React.useRef(false);  // защита от зацикливания
  const rafRef = React.useRef<number | null>(null);

  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const [hovered, setHovered] = React.useState(false);
  const [docHidden, setDocHidden] = React.useState<boolean>(document.hidden);

  // Тройная копия для «бесконечности»
  const pictures = React.useMemo(() => {
    if (!IMAGES.length) return [];
    return [...IMAGES, ...IMAGES, ...IMAGES];
  }, []);

  // Центрируемся в среднюю треть (мгновенно)
  const centerToMiddle = React.useCallback(() => {
    const el = trackRef.current;
    if (!el || pictures.length === 0) return;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    const one = el.scrollWidth / 3;
    oneRef.current = one;
    el.scrollLeft = one;
    el.style.scrollBehavior = prev;
  }, [pictures.length]);

  React.useLayoutEffect(() => {
    centerToMiddle();
    const ro = new ResizeObserver(() => centerToMiddle());
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [centerToMiddle]);

  // Нормализация края (телепорт на эквивалентную позицию в центре)
  const normalizeLoop = React.useCallback(() => {
    if (adjustingRef.current) return;
    const el = trackRef.current;
    const one = oneRef.current;
    if (!el || !one) return;

    const leftBound = one * 0.2;
    const rightBound = one * 1.8;

    if (el.scrollLeft < leftBound) {
      adjustingRef.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft += one;
      el.style.scrollBehavior = "";
      adjustingRef.current = false;
    } else if (el.scrollLeft > one + rightBound) {
      adjustingRef.current = true;
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= one;
      el.style.scrollBehavior = "";
      adjustingRef.current = false;
    }
  }, []);

  // Прокрутка колесом
  const onWheel = (e: React.WheelEvent) => {
    const el = trackRef.current;
    if (!el) return;
    e.preventDefault();
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Кнопки: листаем на ширину видимой области
  const scrollStep = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // Автопрокрутка rAF
  const paused = !autoplay || hovered || openIdx !== null || docHidden || pictures.length === 0;

  React.useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  React.useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }
    let last = performance.now();
    const step = (t: number) => {
      const el = trackRef.current;
      if (!el) return;
      const dt = Math.max(0, Math.min(1, (t - last) / 1000)); // сек
      last = t;
      el.scrollLeft += autoSpeed * dt;
      normalizeLoop(); // подправить край
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [paused, autoSpeed, normalizeLoop]);

  // Ровно N карточек на экран
  const basis = `calc((100% - ${gap}px * ${itemsPerView - 1}) / ${itemsPerView})`;

  if (!IMAGES.length) {
    return (
      <div className="w-full py-10 text-center text-muted">
        В папке <code>src/assets/ribbon</code> пока нет изображений.
      </div>
    );
  }

  return (
    <div
      className="relative"
      aria-label="Фотолента"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Кнопки навигации */}
      <button
        type="button"
        onClick={() => scrollStep(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 grid place-items-center rounded-full bg-black/45 text-white hover:bg-black/60 transition"
        aria-label="Прокрутить влево"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scrollStep(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 grid place-items-center rounded-full bg-black/45 text-white hover:bg-black/60 transition"
        aria-label="Прокрутить вправо"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* мягкие маски по краям (опционально) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent z-[5]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent z-[5]" />

      {/* Трек */}
      <div
        ref={trackRef}
        onScroll={normalizeLoop}
        onWheel={onWheel}
        className="flex overflow-x-auto overscroll-x-contain select-none no-scrollbar"
        style={{ gap: `${gap}px`, padding: "6px 0" }}
      >
        {pictures.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            type="button"
            className={`group shrink-0 ${rounded} overflow-hidden bg-fg/5`}
            style={{ flex: `0 0 ${basis}` }}
            onClick={() => setOpenIdx(idx)}
            aria-label="Открыть изображение"
          >
            <div className="w-full aspect-[3/2]">
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: "scale(1)", willChange: "transform" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = `scale(${hoverScale})`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                }}
                draggable={false}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Модалка с большим изображением */}
      {openIdx !== null && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIdx(null)}
        >
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 p-4 sm:p-8 grid place-items-center">
            <div
              className="relative w-full h-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden bg-black shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(null)}
                className="absolute top-3 right-3 z-10 h-9 px-3 rounded-xl border border-white/30 text-white/90 hover:bg-white/10"
              >
                Закрыть
              </button>
              <img
                src={pictures[openIdx]}
                alt=""
                className="absolute inset-0 m-auto max-w-full max-h-full object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
