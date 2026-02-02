import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/** Плавающая кнопка «Назад». Возвращает к предыдущему маршруту. */
export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Button
        onClick={() => navigate(-1)}
        className="rounded-full shadow-lg"
        variant="secondary"
        aria-label="Назад"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Назад
      </Button>
    </div>
  );
}
