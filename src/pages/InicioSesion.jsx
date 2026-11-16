
import { useState } from "react"
import { Link, useNavigate } from "react-router"

function InicioSesion() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mensaje, setMensaje] = useState("")

    
async function iniciarSesion(evento) {evento.preventDefault()
    setMensaje("")

    if (email.trim() === "" || password === "") {
        setMensaje("Debe completar todos los campos")
        return
    }

    try {
        const respuesta = await fetch("http://localhost:3000/api/auth/login",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: email.trim().toLowerCase(),password: password})
            }
        )

        if (!respuesta.ok){setMensaje("Correo o contraseña incorrectos")
            return
        }

        const datos = await respuesta.json()

        sessionStorage.setItem("token", datos.token)
        localStorage.setItem("rol_usuario", datos.rol)

        if (datos.rol === "admin") {navigate("/admin")
        } else if (datos.rol === "recepcionista") {navigate("/recepcionista")
        } else if (datos.rol === "paciente") {localStorage.setItem("paciente_actual", datos.run)
            navigate("/paciente")
        } else {
            setMensaje("No se pudo identificar el rol del usuario")
        }

    } catch (error) {setMensaje("No se pudo conectar con el servidor")
    }
}


    return (
        <main className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-3">Iniciar sesión </h1>
                            <p className="text-center mb-4">
                                Ingresa tus datos para acceder a Blondie-Salud.
                            </p>

                            <form onSubmit={iniciarSesion}>
                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ingrese su correo"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Ingrese su contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-blondie w-100">
                                    Ingresar
                                </button>

                                {mensaje !== "" && (
                                    <div className="alert alert-danger mt-3">
                                        {mensaje}
                                    </div>
                                )}
                            </form>

                            <hr className="my-4" />
                            <p className="text-center mb-0">
                                ¿No posee una cuenta?{" "}
                                <Link to="/registro">
                                    Regístrate aquí
                                </Link>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default InicioSesion
