
import { render, screen, cleanup } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { test, expect, afterEach } from "vitest"
import Registro from "./Registro"

afterEach(() => {cleanup()
})

//Test 5: Formulario de registro
test("Muestra el formulario de registro", () => {
    render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
    )
    expect(screen.getByRole("heading", { name: "Registro de pacientes" })).toBeInTheDocument()
})

//Test 6: Campo RUN
test("Muestra el campo para ingresar el RUN", () => {
    render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
    )
    expect(screen.getByPlaceholderText("Ej: 19011022K")).toBeInTheDocument()
})

//Test 7: Campo contraseña
test("Muestra el campo de contraseña del registro", () => {
    render(
        <MemoryRouter>
            <Registro />
        </MemoryRouter>
    )
    expect(screen.getByPlaceholderText("Ingrese una contraseña")).toBeInTheDocument()
})
