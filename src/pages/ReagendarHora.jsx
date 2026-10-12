
import { useState } from "react"

function ReagendarHora() {
    const [run, setRun] = useState("")
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")

    const fechaHoy = new Date().toLocaleDateString("en-CA")

    function reagendarHora(e) {
        e.preventDefault()
        if (!run || !fecha || !hora) {
            alert("Completa todos los campos")
            return
        }

        if (fecha < fechaHoy) {
            alert("No puedes seleccionar una fecha pasada")
            return
        }

        const citas = JSON.parse(
            localStorage.getItem("horas_agendadas")
        ) || []

        const indice = citas.findIndex(
            (cita) => cita.run === run
        )

        if (indice === -1) {
            alert("No encontramos una cita con ese RUN")
            return
        }

        const cita = citas[indice]

        const ocupada = citas.some((otraCita, i) =>
            i !== indice &&
            otraCita.medico === cita.medico &&
            otraCita.fecha === fecha &&
            otraCita.hora === hora
        )

        if (ocupada) {
            alert("Esa hora ya está ocupada para ese médico")
            return
        }

        citas[indice].fecha = fecha
        citas[indice].hora = hora

        localStorage.setItem(
            "horas_agendadas",
            JSON.stringify(citas)
        )

        alert("Hora reagendada correctamente")

        setRun("")
        setFecha("")
        setHora("")
    }

    return (
        <main className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-3">
                                Reagendar hora médica
                            </h1>

                            <p className="text-center mb-4">
                                Ingresa los datos de tu cita para seleccionar
                                una nueva fecha y hora.
                            </p>

                            <form onSubmit={reagendarHora}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        RUN del paciente
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese RUN sin puntos ni guion"
                                        value={run}
                                        onChange={(e) => setRun(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Nueva fecha
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        min={fechaHoy}
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label"> Nueva hora </label>
                                    <select
                                        className="form-select"
                                        value={hora}
                                        onChange={(e) => setHora(e.target.value)}
                                    >
                                        <option value="">
                                            Seleccione una hora
                                        </option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="15:00">15:00</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-blondie w-100"
                                >
                                    Reagendar hora
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ReagendarHora
