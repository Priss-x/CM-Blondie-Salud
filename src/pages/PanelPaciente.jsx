
import { Link, Navigate } from "react-router"

function Paciente() {
    const rolUsuario = localStorage.getItem("rol_usuario")
    const runPaciente = localStorage.getItem("paciente_actual")

    const pacientes = JSON.parse(localStorage.getItem("pacientes_registrados")) || []
    const paciente = pacientes.find((persona) => persona.run === runPaciente)
    const citas = JSON.parse(localStorage.getItem("horas_agendadas")) || []
    const muestras = JSON.parse(localStorage.getItem("examenes_agendados")) || []
    const misCitas = citas.filter((cita) => cita.run === runPaciente)

    const misMuestras = muestras.filter((muestra) => muestra.run === runPaciente)

    if (rolUsuario !== "paciente" || !paciente) {return <Navigate to="/" replace />}

    return (
        <main className="container mt-5 mb-5">
            <section className="text-center mb-5">
                <h1>Mi Panel de Paciente</h1>
                <p>¡Bienvenido/a, {paciente.nombre}!</p>
                <p>Desde aquí puedes consultar tus datos y tus reservas en Blondie-Salud.</p>
            </section>

            <section>
                <h2 className="mb-4">Mis servicios</h2>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Horas médicas</h3>
                                <p>Agenda una consulta con nuestros médicos.</p>

                                <Link to="/agendar-hora" className="btn btn-blondie">
                                    Agendar hora
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Laboratorio clínico</h3>
                                <p>Reserva una hora para toma de muestras.</p>
                                <Link to="/agendar-examen" className="btn btn-blondie">
                                    Agendar toma de muestras
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="mt-5">
                <h2 className="mb-4">Mis horas médicas</h2>

                {misCitas.length === 0 ? (
                    <p>No tienes horas médicas registradas.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Médico</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>

                            <tbody>
                                {misCitas.map((cita, indice) => (
                                    <tr key={indice}>
                                        <td>{cita.medico}</td>
                                        <td>{cita.fecha}</td>
                                        <td>{cita.hora}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section className="mt-5">
                <h2 className="mb-4">Mis reservas de laboratorio</h2>

                {misMuestras.length === 0 ? (
                    <p>No tienes reservas de laboratorio.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {misMuestras.map((muestra, indice) => (
                                    <tr key={indice}>
                                        <td>{muestra.fecha}</td>
                                        <td>{muestra.hora}</td>
                                        <td> {muestra.estado || "Agendado"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section className="mt-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="mb-3">Mis datos personales</h2>

                        <p><strong>Nombre:</strong> {paciente.nombre} {paciente.apellidos}</p>
                        <p><strong>RUN:</strong> {paciente.run}</p>
                        <p><strong>Correo:</strong> {paciente.email}</p>
                        <p><strong>Fecha de nacimiento:</strong> {paciente.fecha}</p>
                        <p><strong>Comuna:</strong> {paciente.comuna}</p>

                        <Link to="/" className="btn btn-outline-dark">Volver al inicio </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Paciente
