
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { BrowserRouter, Routes, Route } from "react-router"

import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

import Inicio from "./pages/Inicio.jsx"
import AgendarHora from "./pages/AgendarHora.jsx"
import Registro from "./pages/Registro.jsx"
import InicioSesion from "./pages/InicioSesion.jsx"

import "../css/style.css"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/agendar-hora" element={<AgendarHora />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/inicio-sesion" element={<InicioSesion />} />
            </Routes>
            <Footer />

        </BrowserRouter>
    </StrictMode>
)
