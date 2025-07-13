import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import AboutPage from "./pages/About.jsx";
import HelpPage from "./pages/Help.jsx";
import LoginPage from "./pages/Login.jsx";
import MenuPage from "./pages/Menu.jsx";
import RegisterPage from "./pages/Register.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/menu" element={<MenuPage />}></Route>
        <Route path="/help" element={<HelpPage />}></Route>
        <Route path="/about-us" element={<AboutPage />}></Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
