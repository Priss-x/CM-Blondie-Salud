
import { useState } from "react"

function Registro() {
    const [run, setRun] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [region, setRegion] = useState("")
    const [comuna, setComuna] = useState("")
    const [direccion, setDireccion] = useState("")
    const [password, setPassword] = useState("")
    const [mensaje, setMensaje] = useState("")
    const hoy = new Date()

    const fechaHoy =
    hoy.getFullYear() + "-" +
    String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
    String(hoy.getDate()).padStart(2, "0")


    const comunasPorRegion = {
        metropolitana: [
            "Santiago",
            "Providencia",
            "Maipu",
            "Pudahuel",
            "Ñuñoa"],
        valparaiso: [
            "Valparaiso",
            "Viña del Mar",
            "Quilpue"]
    }

    function registrarPaciente(evento) {

        evento.preventDefault()
        setMensaje("")
        if (run === "") {
            setMensaje("El RUN es obligatorio")
            return
        }

        if (run.includes(".") || run.includes("-")) {
            setMensaje("Ingrese el RUN sin puntos ni guion")
            return
        }

        if (run.length < 7 || run.length > 9) {
            setMensaje("El RUN debe tener entre 7 y 9 caracteres")
            return
        }

        if (nombre.trim() === "") {
            setMensaje("El nombre es obligatorio")
            return
        }

        if (nombre.length > 50) {
            setMensaje("El nombre no puede superar los 50 caracteres")
            return
        }
        if (apellidos.trim() === "") {
            setMensaje("Los apellidos son obligatorios")
            return
        }

        if (apellidos.length > 100) {
            setMensaje("Los apellidos no pueden superar los 100 caracteres")
            return
        }
        if (email === "") {
            setMensaje("El correo es obligatorio")
            return
        }

        if (
            !email.includes("@") ||
            !email.includes(".") ||
            email.includes(" ")
        ) {
            setMensaje("Ingrese un correo válido")
            return
        }

        if (email.length > 100) {
            setMensaje("El correo no puede superar los 100 caracteres")
            return
        }
        if (fecha === "") {
            setMensaje("La fecha de nacimiento es obligatoria")
            return
        }
        if (fecha > fechaHoy) {
            setMensaje("La fecha de nacimiento no puede ser futura")
            return
}
        const hoy = new Date()
        const fechaHoy =
            hoy.getFullYear() + "-" +
            String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
            String(hoy.getDate()).padStart(2, "0")

        if (fecha > fechaHoy) {
            setMensaje("La fecha de nacimiento no puede ser futura")
            return
        }
        if (region === "") {
            setMensaje("La región es obligatoria")
            return
        }

        if (comuna === "") {
            setMensaje("La comuna es obligatoria")
            return
        }
        if (direccion.trim() === "") {
            setMensaje("La dirección es obligatoria")
            return
        }

        if (direccion.length > 300) {
            setMensaje("La dirección no puede superar los 300 caracteres")
            return
        }
        if (password === "") {
            setMensaje("La contraseña es obligatoria")
            return
        }

        if (password.length < 4 || password.length > 10) {
            setMensaje("La contraseña debe tener entre 4 y 10 caracteres")
            return
        }

        setMensaje("¡Paciente registrado con éxito!")
        setRun("")
        setNombre("")
        setApellidos("")
        setEmail("")
        setFecha("")
        setRegion("")
        setComuna("")
        setDireccion("")
        setPassword("")
    }

    return (
        <main className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4">
                                Registro de pacientes
                            </h1>

                            <form onSubmit={registrarPaciente}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        RUN
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ej: 19011022K"
                                        value={run}
                                        onChange={(e) => setRun(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese su nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Apellidos
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese sus apellidos"
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Correo
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ingrese su correo"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Fecha de nacimiento
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        max={fechaHoy}
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Región
                                    </label>

                                    <select
                                        className="form-select"
                                        value={region}
                                        onChange={(e) => {
                                            setRegion(e.target.value)
                                            setComuna("")
                                        }}
                                    >
                                        <option value="">
                                            Seleccione una región
                                        </option>

                                        <option value="metropolitana">
                                            Región Metropolitana
                                        </option>

                                        <option value="valparaiso">
                                            Región de Valparaíso
                                        </option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Comuna
                                    </label>

                                    <select
                                        className="form-select"
                                        value={comuna}
                                        onChange={(e) => setComuna(e.target.value)}
                                        disabled={region === ""}
                                    >
                                        <option value="">
                                            Seleccione una comuna
                                        </option>

                                        {region !== "" &&
                                            comunasPorRegion[region].map((comunaActual) => (
                                                <option
                                                    key={comunaActual}
                                                    value={comunaActual}
                                                >
                                                    {comunaActual}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Dirección
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese su dirección"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Ingrese una contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-blondie w-100"
                                >
                                    Registrarse
                                </button>

                                {mensaje !== "" && (
                                    <div className="alert alert-info mt-3">
                                        {mensaje}
                                    </div>
                                )}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Registro
