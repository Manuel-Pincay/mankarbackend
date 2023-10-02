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
exports.DesactivarRuta = exports.ActualizarRuta = exports.CrearRuta = exports.BuscarRutaPorID = exports.BuscarRutas = void 0;
const models_1 = require("../models");
const BuscarRutas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Limite = 100, Desde = 0 } = req.query;
        const query = { ESTADO: true };
        const [total, datos] = yield Promise.all([
            models_1.Ruta.countDocuments(query),
            models_1.Ruta.find(query).skip(Number(Desde)).limit(Number(Limite)),
        ]);
        res.json({
            total,
            datos,
        });
    }
    catch (error) {
        console.error("Error al buscar rutas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarRutas = BuscarRutas;
const BuscarRutaPorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { RUTAS_ID } = req.params;
        const rutaEncontrada = yield models_1.Ruta.findOne({
            RUTAS_ID,
            ESTADO: true,
        });
        if (!rutaEncontrada) {
            return res.status(404).json({ mensaje: "Ruta no encontrada" });
        }
        res.json(rutaEncontrada);
    }
    catch (error) {
        console.error("Error al buscar la ruta por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarRutaPorID = BuscarRutaPorID;
const CrearRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevaRuta = req.body;
        const encontrarRUTAS_IDNoUtilizado = () => __awaiter(void 0, void 0, void 0, function* () {
            let nuevoRUTAS_ID = nuevaRuta.RUTAS_ID;
            let rutaExistente;
            do {
                rutaExistente = yield models_1.Ruta.findOne({
                    RUTAS_ID: nuevoRUTAS_ID,
                });
                if (rutaExistente) {
                    nuevoRUTAS_ID++;
                }
            } while (rutaExistente);
            return nuevoRUTAS_ID;
        });
        nuevaRuta.RUTAS_ID = yield encontrarRUTAS_IDNoUtilizado();
        const rutaCreada = yield models_1.Ruta.create(nuevaRuta);
        res.status(201).json(rutaCreada);
    }
    catch (error) {
        console.error("Error al crear una ruta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.CrearRuta = CrearRuta;
const ActualizarRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { RUTAS_ID } = req.params;
        const datosActualizados = req.body;
        const rutaExistente = yield models_1.Ruta.findOne({
            RUTAS_ID,
        });
        if (!rutaExistente) {
            return res.status(404).json({ mensaje: "Ruta no encontrada" });
        }
        yield models_1.Ruta.findOneAndUpdate({ RUTAS_ID }, datosActualizados);
        res.status(200).json({ mensaje: "Ruta actualizada correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar la ruta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ActualizarRuta = ActualizarRuta;
const DesactivarRuta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { RUTAS_ID } = req.params;
        const rutaExistente = yield models_1.Ruta.findOne({
            RUTAS_ID,
        });
        if (!rutaExistente) {
            return res.status(404).json({ mensaje: "Ruta no encontrada" });
        }
        yield models_1.Ruta.findOneAndUpdate({ RUTAS_ID }, { ESTADO: false });
        res.status(200).json({ mensaje: "Ruta desactivada correctamente" });
    }
    catch (error) {
        console.error("Error al desactivar la ruta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.DesactivarRuta = DesactivarRuta;
