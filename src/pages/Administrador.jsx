
import { useState } from "react"
import { Link, Navigate } from "react-router"
import {obtenerPacientes,actualizarPaciente,eliminarPaciente} from "../data/pacientes"

function Administrador() {

    const [seccion, setSeccion] = useState("")
    const [pacientes, setPacientes] = useState(obtenerPacientes)
    const [pacienteEditando, setPacienteEditando] = useState(null)
    const [mensaje, setMensaje] = useState("")

    const rolUsuario = localStorage.getItem("rol_usuario")

    const medicos = [
        "Dr. Leorio Paladiknight",
        "Dr. Chanandler Bong",
        "Dra. Louise Ciccone",
        "Dr. Michael Myers",
        "Dr. Thomas Wilis",
        "Dra. Rita Levi-Montalcini"
    ]

    const citas = JSON.parse(localStorage.getItem("horas_agendadas")) || []
    const muestras = JSON.parse(localStorage.getItem("examenes_agendados")) || []

    if (rolUsuario !== "admin") {
        return <Navigate to="/" replace />}

    function editarPaciente(paciente) {setPacienteEditando({ ...paciente })
        setMensaje("")
    }

    function guardarCambios(evento) {
        evento.preventDefault()

        if (!pacienteEditando.nombre.trim() ||!pacienteEditando.apellidos.trim() ||!pacienteEditando.email.trim()
        ) {setMensaje("Complete todos los campos.")
            return
        }

        const email = pacienteEditando.email.trim().toLowerCase()

        const correoExiste = pacientes.some((p) => p.email === email && p.run !== pacienteEditando.run)

        if (correoExiste) {setMensaje("El correo ya pertenece a otro paciente.")
            return
        }

        const guardado = actualizarPaciente(pacienteEditando.run, {
            nombre: pacienteEditando.nombre.trim(),
            apellidos: pacienteEditando.apellidos.trim(),
            email: email,
            comuna: pacienteEditando.comuna.trim()
        })

        if (guardado) {
            setPacientes(obtenerPacientes())
            setPacienteEditando(null)
            setMensaje("Paciente actualizado correctamente.")
        } else {setMensaje("No se encontró al paciente.")}
    }

    function borrarPaciente(run) {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este paciente?")
        if (!confirmar) {return}

        const eliminado = eliminarPaciente(run)
        if (eliminado) {
            setPacientes(obtenerPacientes())
            setPacienteEditando(null)
            setMensaje("Paciente eliminado correctamente.")
        }
    }

    return (
        <main className="container mt-5 mb-5">
            <section className="text-center mb-5">
                <h1>Panel Administrador</h1>
                <p>Bienvenido al sistema administrativo delCentro Médico Blondie-Salud.</p>
            </section>

            <section>
                <h2 className="mb-4">Resumen del sistema</h2>
                <div className="row g-4">
                    <div className="col-md-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Pacientes</h3>
                                <p>Revisa los pacientes registrados en el centro médico.</p>
                                <button className="btn btn-blondie" onClick={() => {
                                        setSeccion("pacientes")
                                        setPacienteEditando(null)
                                        setPacientes(obtenerPacientes())
                                        setMensaje("")}}>
                                    Ver pacientes
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Citas médicas</h3>
                                <p>Consulta las horas médicas registradas en el sistema.</p>
                                <button className="btn btn-blondie" onClick={() => setSeccion("citas")}>
                                    Ver citas
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Médicos</h3>
                                <p>Consulta los profesionales disponibles en Blondie-Salud.</p>
                                <button className="btn btn-blondie" onClick={() => setSeccion("medicos")}>
                                    Ver médicos
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Laboratorio clínico</h3>
                                <p>Consulta las reservas de toma de muestras y su estado.</p>
                                <button className="btn btn-blondie" onClick={() => setSeccion("laboratorio")}>
                                    Ver reservas
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {seccion !== "" && (
                <section className="mt-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            {seccion === "pacientes" && (
                                <>
                                    <h2>Pacientes registrados</h2>
                                    {mensaje !== "" && (
                                        <div className="alert alert-info">
                                            {mensaje}
                                        </div>
                                    )}

                                    {pacientes.length === 0 ? (
                                        <p>No hay pacientes registrados.</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>RUN</th>
                                                        <th>Nombre</th>
                                                        <th>Apellidos</th>
                                                        <th>Correo</th>
                                                        <th>Comuna</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pacientes.map((paciente) => (
                                                        <tr key={paciente.run}>
                                                            <td>{paciente.run}</td>
                                                            <td>{paciente.nombre}</td>
                                                            <td>{paciente.apellidos}</td>
                                                            <td>{paciente.email}</td>
                                                            <td>{paciente.comuna}</td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <button className="btn btn-warning btn-sm" onClick={() => editarPaciente(paciente)}>
                                                                        Editar
                                                                    </button>
                                                                    <button className="btn btn-danger btn-sm" onClick={() => borrarPaciente(paciente.run)}>
                                                                        Eliminar
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {pacienteEditando !== null && (
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <h3>Editar paciente</h3>

                                                <form onSubmit={guardarCambios}>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="form-label">Nombre</label>
                                                            <input
                                                                className="form-control"
                                                                value={pacienteEditando.nombre}
                                                                onChange={(e) => setPacienteEditando({
                                                                    ...pacienteEditando,
                                                                    nombre: e.target.value
                                                                })}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="form-label">Apellidos</label>
                                                            <input
                                                                className="form-control"
                                                                value={pacienteEditando.apellidos}
                                                                onChange={(e) => setPacienteEditando({
                                                                    ...pacienteEditando,
                                                                    apellidos: e.target.value
                                                                })}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="form-label"> Correo</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                value={pacienteEditando.email}
                                                                onChange={(e) => setPacienteEditando({
                                                                    ...pacienteEditando,
                                                                    email: e.target.value
                                                                })}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="form-label">Comuna</label>
                                                            <input
                                                                className="form-control"
                                                                value={pacienteEditando.comuna}
                                                                onChange={(e) => setPacienteEditando({
                                                                    ...pacienteEditando,
                                                                    comuna: e.target.value
                                                                })}
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="d-flex gap-2 mt-3">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-blondie">
                                                            Guardar cambios
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            onClick={() => {
                                                                setPacienteEditando(null)
                                                                setMensaje("")
                                                            }}
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {seccion === "citas" && (
                                <>
                                    <h2>Citas médicas</h2>

                                    {citas.length === 0 ? (
                                        <p>No hay citas registradas.</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Paciente</th>
                                                        <th>Médico</th>
                                                        <th>Fecha</th>
                                                        <th>Hora</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {citas.map((cita, indice) => (
                                                        <tr key={indice}>
                                                            <td>{cita.nombre}</td>
                                                            <td>{cita.medico}</td>
                                                            <td>{cita.fecha}</td>
                                                            <td>{cita.hora}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}

                            {seccion === "medicos" && (
                                <>
                                    <h2>Médicos disponibles</h2>
                                    <ul className="list-group">
                                        {medicos.map((medico) => (
                                            <li key={medico} className="list-group-item">
                                                {medico}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {seccion === "laboratorio" && (
                                <>
                                    <h2>Reservas de laboratorio clínico</h2>
                                    <p>Consulta las horas de toma de muestras y el estado de atención de cada paciente.
                                    </p>

                                    {muestras.length === 0 ? (
                                        <p>No hay reservas registradas.</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>RUN</th>
                                                        <th>Paciente</th>
                                                        <th>Fecha</th>
                                                        <th>Hora</th>
                                                        <th>Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {muestras.map((muestra, indice) => (
                                                        <tr key={indice}>
                                                            <td>{muestra.run}</td>
                                                            <td>{muestra.nombre}</td>
                                                            <td>{muestra.fecha}</td>
                                                            <td>{muestra.hora}</td>
                                                            <td>
                                                                {muestra.estado || "Agendado"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                </section>
            )}

            <section className="mt-5">
                <h2 className="mb-4">Gestión administrativa</h2>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <p>Desde este panel puedes acceder a las principales funciones administrativas del centro médico.
                        </p>

                        <div className="d-flex flex-wrap gap-3">
                            <Link to="/agendar-hora" className="btn btn-blondie">
                                Agendar hora
                            </Link>

                            <Link to="/reagendar-hora" className="btn btn-blondie">
                                Reagendar hora
                            </Link>

                            <Link to="/agendar-examen" className="btn btn-blondie">
                                Agendar toma de muestras
                            </Link>

                            <Link to="/" className="btn btn-outline-dark">
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Administrador
