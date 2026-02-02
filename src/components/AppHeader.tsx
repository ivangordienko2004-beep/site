// src/components/AppHeader.tsx
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@/components/Container";
import { useTranslation } from "react-i18next";
import { LangSwitch } from "@/components/LangSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/auth/AuthContext";

export function AppHeader() {
  const { t } = useTranslation();
  const { role, username, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // На логине хедер делаем «минимальным»
  const isAuthPage = location.pathname === "/" || location.pathname === "/login";

  // Куда ведёт логотип
  const brandHref = role === "anon" ? "/" : "/home";

  const nav = [
    { to: "/home", label: t("nav.home") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/about", label: t("nav.about") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/contacts", label: t("nav.contacts") },
  ];

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const roleLabel =
    role === "admin" ? "Admin" :
    role === "member" ? "Member" :
    role === "guest" ? "Guest" : "Anon";

  return (
    <header className="border-b border-muted/30 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-bg/75">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link to="/home" className="font-bold">AF</Link>

        {/* Основная навигация — скрываем на странице логина */}
        {!isAuthPage && (
          <nav className="hidden gap-6 sm:flex">
            {nav.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive }) =>
                  "text-sm hover:opacity-80 transition " +
                  (isActive ? "text-primary" : "text-fg")
                }
              >
                {i.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {/* Бейдж роли (для наглядности) */}
          {role !== "anon" && (
            <span
              className="hidden sm:inline px-2 h-7 rounded-lg border border-muted/30 text-xs inline-flex items-center"
              title={username || roleLabel}
            >
              {roleLabel}
            </span>
          )}

          <LangSwitch />
          <ThemeToggle />

          {/* Кнопка вход/выход справа */}
          {role === "anon" ? (
            <Link
              to="/login"
              className="px-3 h-9 inline-flex items-center rounded-xl border border-muted/40 text-sm hover:bg-fg/5 transition"
            >
              {t("auth.login", { defaultValue: "Войти" })}
            </Link>
          ) : (
            <button
              onClick={onLogout}
              className="px-3 h-9 inline-flex items-center rounded-xl border border-muted/40 text-sm hover:bg-fg/5 transition"
            >
              {t("auth.logout", { defaultValue: "Выйти" })}
            </button>
          )}
        </div>
      </Container>
    </header>
  );
}
