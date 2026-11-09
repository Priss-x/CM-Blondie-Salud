
let pacientes = [];

//get, obt pctes
const obtenerPacientes = (req, res) => {res.json(pacientes);};

//registro pcte
const crearPaciente = (req, res) => {const paciente = req.body;

    if (!paciente.run || !paciente.email) {
        return res.status(400).json({mensaje: "RUN y correo son obligatorios"});
    }
    const existe = pacientes.some((p) => p.run === paciente.run || p.email === paciente.email);
    if (existe) {return res.status(409).json({mensaje: "El RUN o correo ya está registrado"});
    }
    pacientes.push(paciente);
    res.status(201).json({mensaje: "Paciente registrado correctamente",paciente});
};

//act pcte
const actualizarPaciente = (req, res) => {
    const { run } = req.params;
    const indice = pacientes.findIndex((p) => p.run === run);

    if (indice === -1) {return res.status(404).json({mensaje: "Paciente no encontrado"});}

    const datosNuevos = { ...req.body };
    delete datosNuevos.run;

    pacientes[indice] = {
        ...pacientes[indice],
        ...datosNuevos,
        run
    };

    res.json({mensaje: "Paciente actualizado correctamente",paciente: pacientes[indice]});
};

//elim pcte
const eliminarPaciente = (req, res) => {
    const { run } = req.params;
    const indice = pacientes.findIndex((p) => p.run === run);

    if (indice === -1) {return res.status(404).json({mensaje: "Paciente no encontrado"});}

    pacientes.splice(indice, 1);

    res.json({mensaje: "Paciente eliminado correctamente"});
};

module.exports = {
    obtenerPacientes,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
};
