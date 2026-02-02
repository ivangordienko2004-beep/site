// src/layouts/RootLayout.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Container } from "@/components/Container";
import FlagVignette from "@/components/FlagVignette";
import ScrollManager from "@/components/ScrollManager";
import BackButton from "@/components/BackButton";

export default function RootLayout() {
  const { pathname } = useLocation();
  const showBack = pathname !== "/";

  // Мягкий скролл вверх при смене маршрута
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <ScrollManager />
      <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
        <AppHeader />

        <main id="content" className="relative isolate py-6">
          {/* Фон-обои всегда позади всего */}
          <FlagVignette />

          {/* Контент поверх виньетки */}
          <div className="relative z-10">
            <Container>
              {/* Только вход-анимация без exit — исключает белый экран */}
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </Container>
          </div>
        </main>

        <AppFooter />
      </div>

      {showBack && <BackButton />}
    </>
  );
}
