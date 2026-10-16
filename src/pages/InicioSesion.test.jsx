
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"
import { test, expect, beforeEach, afterEach } from "vitest"
import InicioSesion from "./InicioSesion"

beforeEach(() => {
    localStorage.clear()
})

afterEach(() => {
    cleanup()
})

function mostrarFormulario() {
    render(
        <MemoryRouter>
            <InicioSesion />
        </MemoryRouter>
    )
}
//Test 1: Renderizado
test("Muestra el formulario de inicio de sesión", () => {mostrarFormulario()
    expect(screen.getByRole("heading", { name: "Iniciar sesión" })).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Ingrese su correo")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Ingrese su contraseña")).toBeInTheDocument()
})

//Test 2: Estado
test("Permite escribir el correo electrónico", async () => {
    const usuario = userEvent.setup()
    mostrarFormulario()
    const correo = screen.getByPlaceholderText("Ingrese su correo")
    await usuario.type(correo, "paciente@ejemplo.cl")
    expect(correo).toHaveValue("paciente@ejemplo.cl")
})

//Test 3: Validación y evento
test("Muestra error con credenciales incorrectas", async () => {
    const usuario = userEvent.setup()
    mostrarFormulario()

    await usuario.type(screen.getByPlaceholderText("Ingrese su correo"),"incorrecto@ejemplo.cl")
    await usuario.type(screen.getByPlaceholderText("Ingrese su contraseña"),"123456")
    await usuario.click(screen.getByRole("button", { name: "Ingresar" }))
    expect(screen.getByText("Correo o contraseña incorrectos")).toBeInTheDocument()
})

//Test 4: Inicio de sesión correcto
test("Guarda el rol administrador al iniciar sesión", async () => {
    const usuario = userEvent.setup()
    mostrarFormulario()

    await usuario.type(screen.getByPlaceholderText("Ingrese su correo"),"admin@blondiesalud.cl")
    await usuario.type(screen.getByPlaceholderText("Ingrese su contraseña"),"9999")
    await usuario.click(screen.getByRole("button", { name: "Ingresar" }))
    
    expect(localStorage.getItem("rol_usuario")).toBe("admin")
})
