
import { useState } from "react"

function AgendarHora() {
    const [run, setRun] = useState("")
    const [nombre, setNombre] = useState("")
    const [especialidad, setEspecialidad] = useState("")
    const [medico, setMedico] = useState("")
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [mensaje, setMensaje] = useState("")


    const medicos = {
        "Medicina General": [
            "Dr. Leorio Paladiknight",
            "Dr. Chanandler Bong"],

        "Pediatría": [
            "Dra. Louise Ciccone",
            "Dr. Michael Myers"],

        "Neurología": [
            "Dr. Thomas Wilis",
            "Dra. Rita Levi-Montalcini"]
    }

    const horarios = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "14:00",
        "15:00",
        "16:00"
    ]

    const hoy = new Date()
    const fechaHoy =
        hoy.getFullYear() + "-" +
        String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
        String(hoy.getDate()).padStart(2, "0")

    function agendarHora(evento) {
        evento.preventDefault()
        if (
            run === "" ||
            nombre === "" ||
            especialidad === "" ||
            medico === "" ||
            fecha === "" ||
            hora === ""
        ) {
            setMensaje("Debe completar todos los campos.")
            return
        }

        if (run.length < 8 || run.length > 9 || isNaN(run) ||run.includes("-") ||run.includes(".") ||run.includes(" ")) {
            setMensaje("Ingrese un RUN válido, solo números.")
            return
        }

        if (fecha < fechaHoy) {setMensaje("No puede agendar una fecha pasada.")
            return
        }
        const reservas = JSON.parse(localStorage.getItem("horas_agendadas")) || []
        const ocupada = reservas.some((reserva) =>reserva.medico === medico && reserva.fecha === fecha && reserva.hora === hora)

        if (ocupada) {setMensaje("Esta hora ya está ocupada. Por favor seleccione otra.")
            return
        }
        const nuevaReserva = {run: run,nombre: nombre,especialidad: especialidad,medico: medico,fecha: fecha,hora: hora}

        reservas.push(nuevaReserva)

        localStorage.setItem("horas_agendadas",JSON.stringify(reservas))

        setMensaje("¡Hora agendada correctamente!")
        setRun("")
        setNombre("")
        setEspecialidad("")
        setMedico("")
        setFecha("")
        setHora("")
    }

    return (
        <main className="container my-5">
            <h1 className="text-center mb-3">
                Agendamiento de hora médica 
            </h1>
            <p className="text-center mb-4">
                Complete sus datos para reservar una atención.
            </p>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <form onSubmit={agendarHora}>
                                <div className="mb-3">
                                    <label className="form-label"> RUN </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="123456789"
                                        value={run}
                                        onChange={(e) => setRun(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label"> Nombre completo </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label"> Especialidad </label>
                                    <select
                                        className="form-select"
                                        value={especialidad}
                                        onChange={(e) => {
                                            setEspecialidad(e.target.value)
                                            setMedico("")
                                        }}
                                        required
                                    >
                                        <option value="">Seleccione especialidad</option>
                                        <option value="Medicina General">Medicina General</option>
                                        <option value="Pediatría">Pediatría</option>
                                        <option value="Neurología">Neurología</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Médico</label>
                                    <select
                                        className="form-select"
                                        value={medico}
                                        onChange={(e) => setMedico(e.target.value)}
                                        disabled={especialidad === ""}
                                        required
                                    >
                                        <option value="">Seleccione médico</option>

                                        {especialidad !== "" &&
                                            medicos[especialidad].map((doctor) => (
                                                <option key={doctor} value={doctor}>
                                                    {doctor}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Fecha</label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        min={fechaHoy}
                                        value={fecha}
                                        onChange={(e) => setFecha(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Hora
                                    </label>

                                    <select
                                        className="form-select"
                                        value={hora}
                                        onChange={(e) => setHora(e.target.value)}
                                        required
                                    >
                                        <option value="">
                                            Seleccione hora
                                        </option>

                                        {horarios.map((horario) => (
                                            <option key={horario} value={horario}>
                                                {horario}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-blondie w-100"
                                >
                                    Agendar hora
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

export default AgendarHora
