
const express = require("express");
const router = express.Router();

const {obtenerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente} = require("../controllers/pacientes.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       required:
 *         - run
 *         - email
 *       properties:
 *         run:
 *           type: string
 *           example: "12345678-9"
 *         nombre:
 *           type: string
 *           example: "Paciente"
 *         apellido:
 *           type: string
 *           example: "Prueba"
 *         email:
 *           type: string
 *           format: email
 *           example: "prueba@ejemplo.com"
 */

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Obtener todos los pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 *
 *   post:
 *     summary: Registrar un paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       201:
 *         description: Paciente registrado correctamente
 *       400:
 *         description: RUN o correo faltante
 *       409:
 *         description: RUN o correo duplicado
 */

/**
 * @swagger
 * /api/pacientes/{run}:
 *   put:
 *     summary: Actualizar un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: run
 *         required: true
 *         schema:
 *           type: string
 *         description: RUN del paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *     responses:
 *       200:
 *         description: Paciente actualizado correctamente
 *       404:
 *         description: Paciente no encontrado
 *
 *   delete:
 *     summary: Eliminar un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: run
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente eliminado correctamente
 *       404:
 *         description: Paciente no encontrado
 */

router.get("/", obtenerPacientes);
router.post("/", crearPaciente);
router.put("/:run", actualizarPaciente);
router.delete("/:run", eliminarPaciente);

module.exports = router;
