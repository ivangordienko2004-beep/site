// src/components/ResumeButton.tsx
import React from "react";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResumeButton({ className = "" }: { className?: string }) {
  const { canDownloadResume } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  if (canDownloadResume) {
    return (
      <a
        href="/resume.pdf"
        download
        className={`px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition ${className}`}
      >
        Скачать резюме
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => nav("/login", { state: { from: location } })}
      className={`px-3 py-1 rounded-2xl border border-muted/40 text-sm hover:bg-fg/5 transition ${className}`}
      title="Доступно после входа"
    >
      Войти, чтобы скачать резюме
    </button>
  );
}
