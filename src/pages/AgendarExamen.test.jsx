
import { render, screen, cleanup } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { test, expect, afterEach } from "vitest"
import AgendarExamen from "./AgendarExamen"

afterEach(() => {cleanup()
})

//Test 10: Renderizado de agendamiento de exámenes
test("Muestra la página para agendar toma de muestras", () => {
    render(
        <MemoryRouter>
            <AgendarExamen />
        </MemoryRouter>
    )

    expect(screen.getByRole("heading", { name: "Laboratorio Clínico" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Reservar hora" })).toBeInTheDocument()
   
})
