
import { render, screen, cleanup } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { test, expect, afterEach } from "vitest"
import Navbar from "./Navbar"

afterEach(() => {cleanup()
})

//Test 11: Verificar que Navbar recibe una prop
test("Muestra el nombre de la clínica recibido por props", () => {
    render(
        <MemoryRouter>
            <Navbar nombreClinica="Centro Médico de Prueba" />
        </MemoryRouter>
    )
    expect(screen.getByAltText("Logo Centro Médico de Prueba")).toBeInTheDocument()
})
