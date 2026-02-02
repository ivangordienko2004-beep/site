// src/main.tsx
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@/index.css";
import "@/i18n";
import { applyInitialTheme } from "@/theme";

import RootLayout from "@/layouts/RootLayout";
import { AuthProvider } from "@/auth/AuthContext";

// Страницы
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contacts from "@/pages/Contacts";
import PatrioticConcerts from "@/pages/PatrioticConcerts";

applyInitialTheme();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      errorElement: (
        <div style={{ padding: 24, textAlign: "center" }}>
          <h2>404 — Страница не найдена</h2>
          <p style={{ opacity: 0.7 }}>
            Такой страницы нет или произошла ошибка маршрутизации.
          </p>
          <p><a href="/home">На главную</a></p>
        </div>
      ),
      children: [
        // По умолчанию открываем страницу входа
        { index: true, element: <Login /> },

        // Основные страницы
        { path: "home", element: <Home /> },
        { path: "projects", element: <Projects /> },
        { path: "projects/:slug", element: <ProjectDetails /> },
        { path: "about", element: <About /> },
        { path: "blog", element: <Blog /> },
        { path: "blog/:slug", element: <BlogPost /> },
        { path: "contacts", element: <Contacts /> },
        { path: "patriotic-concerts", element: <PatrioticConcerts /> },

        // Фоллбек
        {
          path: "*",
          element: (
            <div style={{ padding: 24, textAlign: "center" }}>
              404 — Страница не найдена
            </div>
          ),
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

// В dev — без StrictMode (чтобы не было двойного mount и белого экрана из-за анимаций)
const app = (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  import.meta.env.DEV ? app : <StrictMode>{app}</StrictMode>
);
