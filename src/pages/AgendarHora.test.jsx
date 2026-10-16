
import { render, screen, cleanup } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { test, expect, afterEach } from "vitest"
import AgendarHora from "./AgendarHora"

afterEach(() => {cleanup()
})

//Test 8: Renderizado de la página
test("Muestra la página para agendar una hora médica", () => {
    render(
        <MemoryRouter>
            <AgendarHora />
        </MemoryRouter>
    )

    expect(screen.getByText(/agendar hora/i)).toBeInTheDocument()
})

//Test 9: Especialidades médicas
test("Muestra la opción de Medicina General", () => {
    render(
        <MemoryRouter>
            <AgendarHora />
        </MemoryRouter>
    )
    expect(screen.getByRole("option", { name: "Medicina General" })).toBeInTheDocument()
})
