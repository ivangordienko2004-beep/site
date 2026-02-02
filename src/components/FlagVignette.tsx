// src/components/FlagVignette.tsx
import React from "react";

/** Фон-виньетка: прожекторы в цветах флага РФ (белый-синий-красный). */
export default function FlagVignette({ className = "" }: { className?: string }) {
  return <div className={`flag-vignette ${className}`} aria-hidden />;
}
