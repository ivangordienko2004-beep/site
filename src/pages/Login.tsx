// src/pages/Login.tsx
import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Section } from "@/components/Section";
import Heading from "@/components/Heading";

export default function Login() {
  const { login, loginAsGuest, role } = useAuth();
  const nav = useNavigate();
  const location = useLocation() as any;

  // Куда перенаправлять после успешного входа
  const from = (location.state as any)?.from?.pathname || "/home";

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Уже авторизованы? Сразу увести на домашнюю без «мигания» формы
  if (role !== "anon") {
    return <Navigate to="/home" replace />;
  }

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(username.trim(), password);
      nav(from, { replace: true });
    } catch (e: any) {
      setErr(e?.message || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const enterGuest = () => {
    loginAsGuest();
    nav("/home", { replace: true });
  };

  return (
    <Section className="max-w-md mx-auto">
      <Heading as="h1" size="lg">Вход</Heading>
      <p className="mt-2 text-muted text-sm">
        Выберите режим: Admin, Участник («guest_guest»), либо войти как гость.
      </p>

      <form onSubmit={doLogin} className="mt-5 space-y-3 rounded-2xl border border-muted/25 p-4">
        <div>
          <label className="text-sm">Логин</label>
          <input
            className="mt-1 w-full h-10 rounded-xl border border-muted/40 px-3 bg-bg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin_admin или guest_guest"
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label className="text-sm">Пароль</label>
          <div className="mt-1 flex gap-2">
            <input
              className="w-full h-10 rounded-xl border border-muted/40 px-3 bg-bg"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="px-3 rounded-xl border border-muted/40 text-sm hover:bg-fg/5"
            >
              {show ? "Скрыть" : "Показать"}
            </button>
          </div>
        </div>

        {err && <div className="text-danger text-sm">{err}</div>}

        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 h-10 rounded-xl border border-muted/40 hover:bg-fg/5"
          >
            {loading ? "Входим…" : "Войти"}
          </button>

          <button
            type="button"
            onClick={enterGuest}
            className="px-4 h-10 rounded-xl border border-muted/40 hover:bg-fg/5"
            title="Ограничения гостя: нельзя скачивать резюме, телефон скрыт"
          >
            Войти как гость
          </button>
        </div>

        <div className="text-xs text-muted mt-3 leading-6">
          Admin: <code>admin_admin / zaykapatriot</code><br />
          Участник: <code>guest_guest / PatriotRussia</code>
        </div>
      </form>
    </Section>
  );
}
