import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./pages/landing/LandingPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import GamePage from "./pages/game/GamePage.tsx";
import AboutPage from "./pages/about/AboutPage.tsx";
import {ThemeProvider} from "next-themes";
import {GameProvider} from "@/context/GameContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider attribute="class" defaultTheme="dark">
            <GameProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/game" element={<GamePage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </BrowserRouter>
            </GameProvider>
        </ThemeProvider>
    </StrictMode>
);
