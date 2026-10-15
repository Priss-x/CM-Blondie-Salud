
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { BrowserRouter, Routes, Route } from "react-router"

import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

import Inicio from "./pages/Inicio.jsx"
import AgendarHora from "./pages/AgendarHora.jsx"
import Registro from "./pages/Registro.jsx"
import InicioSesion from "./pages/InicioSesion.jsx"
import Administrador from "./pages/Administrador.jsx"
import Recepcionista from "./pages/Recepcionista.jsx"
import ReagendarHora from "./pages/ReagendarHora.jsx"
import AgendarExamen from "./pages/AgendarExamen.jsx"
import Paciente from "./pages/PanelPaciente.jsx"

import "../css/style.css"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/agendar-hora" element={<AgendarHora />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/inicio-sesion" element={<InicioSesion />} />
                <Route path="/admin" element={<Administrador />} />
                <Route path="/recepcionista" element={<Recepcionista />} />
                <Route path="/reagendar-hora" element={<ReagendarHora />} />
                <Route path="/agendar-examen" element={<AgendarExamen />} />
                <Route path="/paciente" element={<Paciente />} />
            </Routes>
            <Footer />

        </BrowserRouter>
    </StrictMode>
)
