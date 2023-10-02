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
exports.BuscarTipoMantenimientoPorDescripcion = exports.DesactivarTipoMantenimiento = exports.ActualizarTipoMantenimiento = exports.CrearTipoMantenimiento = exports.BuscarTipoMantenimientoPorID = exports.BuscarTiposMantenimiento = void 0;
const models_1 = require("../models");
const BuscarTiposMantenimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Limite = 100, Desde = 0 } = req.query;
        const query = { ESTADO: true };
        const [total, datos] = yield Promise.all([
            models_1.TipoMantenimiento.countDocuments(query),
            models_1.TipoMantenimiento.find(query).skip(Number(Desde)).limit(Number(Limite)),
        ]);
        res.json({
            total,
            datos,
        });
    }
    catch (error) {
        console.error("Error al buscar tipos de mantenimiento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarTiposMantenimiento = BuscarTiposMantenimiento;
const BuscarTipoMantenimientoPorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { TIPOSMANTE_ID } = req.params;
        const tipoMantenimientoEncontrado = yield models_1.TipoMantenimiento.findOne({
            TIPOSMANTE_ID,
            ESTADO: true,
        });
        if (!tipoMantenimientoEncontrado) {
            return res.status(404).json({ mensaje: "Tipo de mantenimiento no encontrado" });
        }
        res.json(tipoMantenimientoEncontrado);
    }
    catch (error) {
        console.error("Error al buscar el tipo de mantenimiento por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarTipoMantenimientoPorID = BuscarTipoMantenimientoPorID;
const CrearTipoMantenimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del tipo de mantenimiento del cuerpo de la solicitud
        const nuevoTipoMantenimiento = req.body;
        // Función para encontrar un TIPOSMANTE_ID no utilizado
        const encontrarTIPOSMANTE_IDNoUtilizado = () => __awaiter(void 0, void 0, void 0, function* () {
            let nuevoTIPOSMANTE_ID = nuevoTipoMantenimiento.TIPOSMANTE_ID;
            let tipoMantenimientoExistente;
            do {
                tipoMantenimientoExistente = yield models_1.TipoMantenimiento.findOne({
                    TIPOSMANTE_ID: nuevoTIPOSMANTE_ID,
                });
                if (tipoMantenimientoExistente) {
                    nuevoTIPOSMANTE_ID++;
                }
            } while (tipoMantenimientoExistente);
            return nuevoTIPOSMANTE_ID;
        });
        nuevoTipoMantenimiento.TIPOSMANTE_ID = yield encontrarTIPOSMANTE_IDNoUtilizado();
        const tipoMantenimientoCreado = yield models_1.TipoMantenimiento.create(nuevoTipoMantenimiento);
        res.status(201).json(tipoMantenimientoCreado);
    }
    catch (error) {
        console.error("Error al crear un tipo de mantenimiento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.CrearTipoMantenimiento = CrearTipoMantenimiento;
const ActualizarTipoMantenimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { TIPOSMANTE_ID } = req.params;
        const datosActualizados = req.body;
        const tipoMantenimientoExistente = yield models_1.TipoMantenimiento.findOne({
            TIPOSMANTE_ID,
        });
        if (!tipoMantenimientoExistente) {
            return res.status(404).json({ mensaje: "Tipo de mantenimiento no encontrado" });
        }
        yield models_1.TipoMantenimiento.findOneAndUpdate({ TIPOSMANTE_ID }, datosActualizados);
        res.status(200).json({ mensaje: "Tipo de mantenimiento actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar el tipo de mantenimiento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ActualizarTipoMantenimiento = ActualizarTipoMantenimiento;
const DesactivarTipoMantenimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { TIPOSMANTE_ID } = req.params;
        const tipoMantenimientoExistente = yield models_1.TipoMantenimiento.findOne({
            TIPOSMANTE_ID,
        });
        if (!tipoMantenimientoExistente) {
            return res.status(404).json({ mensaje: "Tipo de mantenimiento no encontrado" });
        }
        yield models_1.TipoMantenimiento.findOneAndUpdate({ TIPOSMANTE_ID }, { ESTADO: false });
        res.status(200).json({ mensaje: "Tipo de mantenimiento desactivado correctamente" });
    }
    catch (error) {
        console.error("Error al desactivar el tipo de mantenimiento:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.DesactivarTipoMantenimiento = DesactivarTipoMantenimiento;
const BuscarTipoMantenimientoPorDescripcion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { TIPOMANTE_DESCRIPCION } = req.params;
        const tiposMantenimientoEncontrados = yield models_1.TipoMantenimiento.find({
            TIPOMANTE_DESCRIPCION,
            ESTADO: true,
        });
        if (tiposMantenimientoEncontrados.length === 0) {
            return res.status(404).json({ mensaje: "Tipos de mantenimiento no encontrados" });
        }
        res.json(tiposMantenimientoEncontrados);
    }
    catch (error) {
        console.error("Error al buscar tipos de mantenimiento por descripción:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarTipoMantenimientoPorDescripcion = BuscarTipoMantenimientoPorDescripcion;
