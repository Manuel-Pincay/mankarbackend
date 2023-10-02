"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesactivarEstablecimiento = exports.ActualizarEstablecimiento = exports.BuscarEstablecimientoPorID = exports.BuscarEstablecimientos = exports.CrearEstablecimiento = void 0;
const models_1 = require("../models");
// Controlador para crear un nuevo establecimiento
const CrearEstablecimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del establecimiento del cuerpo de la solicitud
        const nuevoEstablecimiento = req.body;
        // Crear un nuevo establecimiento en la base de datos
        const establecimientoCreado = yield models_1.Establecimiento.create(nuevoEstablecimiento);
        // Devolver el establecimiento creado en la respuesta JSON
        res.status(201).json(establecimientoCreado);
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al crear un establecimiento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.CrearEstablecimiento = CrearEstablecimiento;
// Controlador para obtener todos los establecimientos
const BuscarEstablecimientos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Limite = 100, Desde = 0 } = req.query;
        const query = { ESTADO: true };
        // Usar Promise.all para realizar ambas consultas de manera concurrente
        const [total, datos] = yield Promise.all([
            models_1.Establecimiento.countDocuments(query),
            models_1.Establecimiento.find(query)
                .skip(Number(Desde))
                .limit(Number(Limite)),
        ]);
        // Devolver una respuesta JSON con los datos encontrados
        res.json({
            total,
            datos,
        });
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al buscar establecimientos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarEstablecimientos = BuscarEstablecimientos;
// Controlador para obtener un establecimiento específico por ID
const BuscarEstablecimientoPorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ESTABLECIMIENTO_ID } = req.params; // Obtiene el ID del establecimiento de los parámetros de la solicitud
        // Realiza la búsqueda del establecimiento por ID excluyendo los establecimientos con estado FALSE
        const establecimientoEncontrado = yield models_1.Establecimiento.findOne({
            ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID),
            ESTADO: true,
        });
        if (!establecimientoEncontrado) {
            // Si no se encuentra el establecimiento, devuelve un mensaje de error
            return res.status(404).json({ mensaje: "Establecimiento no encontrado" });
        }
        // Si se encuentra el establecimiento, lo devuelve en la respuesta JSON
        res.json(establecimientoEncontrado);
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al buscar el establecimiento por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarEstablecimientoPorID = BuscarEstablecimientoPorID;
// Controlador para actualizar un establecimiento por ID
const ActualizarEstablecimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ESTABLECIMIENTO_ID } = req.params; // Obtiene el ID del establecimiento de los parámetros de la solicitud
        const datosActualizados = req.body; // Obtiene los datos actualizados del establecimiento del cuerpo de la solicitud
        // Verificar si el establecimiento con el ID dado existe
        const establecimientoExistente = yield models_1.Establecimiento.findOne({
            ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID),
        });
        if (!establecimientoExistente) {
            // Si el establecimiento no se encuentra, devuelve un mensaje de error
            return res.status(404).json({ mensaje: "Establecimiento no encontrado" });
        }
        // Actualizar los datos del establecimiento existente con los nuevos datos
        yield models_1.Establecimiento.findOneAndUpdate({ ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID) }, datosActualizados);
        // Devolver un mensaje de éxito
        res.status(200).json({ mensaje: "Establecimiento actualizado correctamente" });
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al actualizar el establecimiento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ActualizarEstablecimiento = ActualizarEstablecimiento;
// Controlador para desactivar un establecimiento por ID
const DesactivarEstablecimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ESTABLECIMIENTO_ID } = req.params; // Obtiene el ID del establecimiento de los parámetros de la solicitud
        // Verificar si el establecimiento con el ID dado existe
        const establecimientoExistente = yield models_1.Establecimiento.findOne({
            ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID),
        });
        if (!establecimientoExistente) {
            // Si el establecimiento no se encuentra, devuelve un mensaje de error
            return res.status(404).json({ mensaje: "Establecimiento no encontrado" });
        }
        // Cambiar el estado del establecimiento a FALSE en lugar de eliminarlo
        yield models_1.Establecimiento.findOneAndUpdate({ ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID) }, { ESTADO: false });
        // Devolver un mensaje de éxito
        res.status(200).json({ mensaje: "Establecimiento desactivado correctamente" });
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al desactivar el establecimiento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.DesactivarEstablecimiento = DesactivarEstablecimiento;
