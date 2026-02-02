import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Хранит позиции скролла по маршрутам и:
 * - при POP (Назад/Вперёд) — восстанавливает;
 * - иначе — скроллит к началу страницы.
 */
export default function ScrollManager() {
  const positions = useRef(new Map<string, number>());
  const lastPath = useRef<string | null>(null);
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType();

  // Сохраняем позицию для предыдущего пути
  useEffect(() => {
    const onScroll = () => {
      if (lastPath.current) positions.current.set(lastPath.current, window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // На изменение локации — восстанавливаем/скроллим вверх
  useEffect(() => {
    const key = pathname + search;
    const isPop = navType === "POP";
    const saved = positions.current.get(key);

    // В случае hash — позволяем нативный прыжок к якорю
    if (hash) return;

    requestAnimationFrame(() => {
      if (isPop && typeof saved === "number") {
        window.scrollTo({ top: saved, behavior: "auto" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });

    lastPath.current = key;
  }, [pathname, search, hash, navType]);

  return null;
}
