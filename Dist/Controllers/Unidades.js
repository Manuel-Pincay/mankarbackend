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
exports.DesactivarUnidad = exports.ActualizarUnidad = exports.CrearUnidad = exports.BuscarUnidadPorPlaca = exports.BuscarUnidades = void 0;
const models_1 = require("../models");
// Controlador para buscar unidades
const BuscarUnidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Limite = 100, Desde = 0 } = req.query;
        const query = { ESTADO: true };
        // Usar Promise.all para realizar ambas consultas de manera concurrente
        const [total, datos] = yield Promise.all([
            models_1.Unidad.countDocuments(query),
            models_1.Unidad.find(query).skip(Number(Desde)).limit(Number(Limite)),
        ]);
        // Devolver una respuesta JSON con los datos encontrados
        res.json({
            total,
            datos,
        });
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al buscar unidades:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarUnidades = BuscarUnidades;
// Controlador para buscar una unidad por su placa
const BuscarUnidadPorPlaca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UNIDADES_PLACA } = req.params; // Obtiene la placa de la unidad de los parámetros de la solicitud
        // Realiza la búsqueda de la unidad por su placa excluyendo las unidades con estado FALSE
        const unidadEncontrada = yield models_1.Unidad.findOne({
            UNIDADES_PLACA,
            ESTADO: true,
        });
        if (!unidadEncontrada) {
            // Si no se encuentra la unidad, devuelve un mensaje de error
            return res.status(404).json({ mensaje: "Unidad no encontrada" });
        }
        // Si se encuentra la unidad, la devuelve en la respuesta JSON
        res.json(unidadEncontrada);
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al buscar la unidad por placa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarUnidadPorPlaca = BuscarUnidadPorPlaca;
// Controlador para crear una nueva unidad
const CrearUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos de la unidad del cuerpo de la solicitud
        const nuevaUnidad = req.body;
        // Verificar si ya existe una unidad con la misma placa
        const unidadExistente = yield models_1.Unidad.findOne({
            UNIDADES_PLACA: nuevaUnidad.UNIDADES_PLACA,
        });
        if (unidadExistente) {
            // Si la unidad ya existe, devuelve un mensaje de error
            return res.status(400).json({ error: "La unidad ya existe" });
        }
        // Crear una nueva unidad en la base de datos
        const unidadCreada = yield models_1.Unidad.create(nuevaUnidad);
        // Devolver la unidad creada en la respuesta JSON
        res.status(201).json(unidadCreada);
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al crear una unidad:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.CrearUnidad = CrearUnidad;
// Controlador para actualizar una unidad existente
const ActualizarUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UNIDADES_PLACA } = req.params;
        const datosActualizados = req.body;
        const unidadExistente = yield models_1.Unidad.findOne({
            UNIDADES_PLACA,
        });
        if (!unidadExistente) {
            return res.status(404).json({ mensaje: "Unidad no encontrada" });
        }
        yield models_1.Unidad.findOneAndUpdate({ UNIDADES_PLACA }, datosActualizados);
        res.status(200).json({ mensaje: "Unidad actualizada correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar la unidad:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ActualizarUnidad = ActualizarUnidad;
// Controlador para desactivar una unidad cambiando su estado a FALSE
const DesactivarUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UNIDADES_PLACA } = req.params; // Obtiene la placa de la unidad de los parámetros de la solicitud
        // Verificar si la unidad con la placa dada existe
        const unidadExistente = yield models_1.Unidad.findOne({ UNIDADES_PLACA });
        if (!unidadExistente) {
            // Si la unidad no se encuentra, devuelve un mensaje de error
            return res.status(404).json({ mensaje: "Unidad no encontrada" });
        }
        // Cambiar el estado de la unidad a FALSE en lugar de eliminarla
        yield models_1.Unidad.findOneAndUpdate({ UNIDADES_PLACA }, { ESTADO: false });
        // Devolver un mensaje de éxito
        res.status(200).json({ mensaje: "Unidad desactivada correctamente" });
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al desactivar la unidad:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.DesactivarUnidad = DesactivarUnidad;
