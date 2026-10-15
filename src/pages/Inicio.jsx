import { Link } from "react-router"

function Inicio() {
    return (
        <>
            <section className="carrusel-contenedor">
                <div
                    id="carouselBlondie"
                    className="carousel slide carrusel-blondie"
                    data-bs-ride="carousel">

                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselBlondie"
                            data-bs-slide-to="0"
                            className="active">
                        </button>

                        <button
                            type="button"
                            data-bs-target="#carouselBlondie"
                            data-bs-slide-to="1">
                        </button>

                        <button
                            type="button"
                            data-bs-target="#carouselBlondie"
                            data-bs-slide-to="2">
                        </button>

                    </div>


                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/img/medico1.png`}
                                className="d-block w-100 imagen-carrusel"
                                alt="Atención médica"
                            />

                            <div className="carousel-caption d-none d-md-block">
                                <h2>Tu salud es nuestra prioridad</h2>

                                <p>
                                    Atención médica cercana y profesional.
                                </p>
                            </div>
                        </div>


                        <div className="carousel-item">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/img/medico2.png`}
                                className="d-block w-100 imagen-carrusel"
                                alt="Atención pediátrica"
                            />

                            <div className="carousel-caption d-none d-md-block">
                                <h2>Profesionales para toda la familia</h2>

                                <p>
                                    Medicina general, pediatría y neurología.
                                </p>
                            </div>
                        </div>


                        <div className="carousel-item">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/img/centro_medico.png`}
                                className="d-block w-100 imagen-carrusel"
                                alt="Centro Médico Blondie-Salud"
                            />

                            <div className="carousel-caption d-none d-md-block">
                                <h2>Blondie-Salud</h2>

                                <p>
                                    Un centro médico pensado para ti y tu familia.
                                </p>
                            </div>
                        </div>
                    </div>


                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselBlondie"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>

                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselBlondie"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>

                    </button>
                </div>
            </section>

            <main>
                <section className="seccion-bienvenida">
                    <div className="container">
                        <h1>Centro Médico Blondie-Salud</h1>

                        <p className="lead">
                            Bienvenido a nuestro centro médico.
                        </p>

                        <p>
                            Aquí podrás consultar nuestras especialidades
                            y agendar tus horas médicas.
                        </p>

                        <Link to="/agendar-hora" className="btn btn-blondie"> Agendar hora
                        </Link>
                    </div>

                </section>


                <section className="seccion-especialidades">
                    <div className="container">
                        <h2>Nuestras especialidades</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body text-center">

                                        <h5>Medicina General</h5>
                                        <p>Atención médica integral para pacientes adultos.</p>
                                        <Link to="/agendar-hora" className="btn btn-outline-blondie">Agendar hora
                                        </Link>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body text-center">
                                        <h5>Pediatría</h5>
                                        <p>Atención especializada para niños y adolescentes.</p>
                                        <Link to="/agendar-hora" className="btn btn-outline-blondie">
                                            Agendar hora
                                        </Link>

                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body text-center">
                                        <h5>Neurología</h5>
                                        <p>Evaluación y atención neurológica especializada.</p>
                                        <Link to="/agendar-hora" className="btn btn-outline-blondie">
                                            Agendar hora
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section
                    id="nosotros"
                    className="seccion-nosotros">
                    <div className="container">
                        <h2>Sobre Blondie-Salud </h2>
                        <p>Somos un centro médico orientado a entregar
                            una atención cercana, accesible y de calidad
                            para nuestros pacientes y sus familias.</p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Inicio