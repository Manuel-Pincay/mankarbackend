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
exports.DesactivarRol = exports.ActualizarRol = exports.CrearRol = exports.BuscarRolPorID = exports.BuscarRoles = void 0;
const models_1 = require("../models");
const CrearRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoRol = req.body;
        const rolExistente = yield models_1.Rol.findOne({
            ROL_ID: nuevoRol.ROL_ID,
        });
        if (rolExistente) {
            return res.status(400).json({ error: "El rol ya existe" });
        }
        const rolCreado = yield models_1.Rol.create(nuevoRol);
        res.status(201).json(rolCreado);
    }
    catch (error) {
        console.error("Error al crear un rol:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.CrearRol = CrearRol;
const BuscarRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Limite = 100, Desde = 0 } = req.query;
        const query = { ESTADO: true };
        const [total, datos] = yield Promise.all([
            models_1.Rol.countDocuments(query),
            models_1.Rol.find(query).skip(Number(Desde)).limit(Number(Limite)),
        ]);
        res.json({
            total,
            datos,
        });
    }
    catch (error) {
        console.error("Error al buscar roles:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarRoles = BuscarRoles;
const BuscarRolPorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ROL_ID } = req.params;
        const rolEncontrado = yield models_1.Rol.findOne({
            ROL_ID,
            ESTADO: true,
        });
        if (!rolEncontrado) {
            return res.status(404).json({ mensaje: "Rol no encontrado" });
        }
        res.json(rolEncontrado);
    }
    catch (error) {
        console.error("Error al buscar el rol por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarRolPorID = BuscarRolPorID;
const ActualizarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ROL_ID } = req.params;
        const datosActualizados = req.body;
        const rolExistente = yield models_1.Rol.findOne({
            ROL_ID,
        });
        if (!rolExistente) {
            return res.status(404).json({ mensaje: "Rol no encontrado" });
        }
        yield models_1.Rol.findOneAndUpdate({ ROL_ID }, datosActualizados);
        res.status(200).json({ mensaje: "Rol actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar el rol:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ActualizarRol = ActualizarRol;
const DesactivarRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ROL_ID } = req.params;
        const rolExistente = yield models_1.Rol.findOne({
            ROL_ID,
        });
        if (!rolExistente) {
            return res.status(404).json({ mensaje: "Rol no encontrado" });
        }
        yield models_1.Rol.findOneAndUpdate({ ROL_ID }, { ESTADO: false });
        res.status(200).json({ mensaje: "Rol desactivado correctamente" });
    }
    catch (error) {
        console.error("Error al desactivar el rol:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.DesactivarRol = DesactivarRol;
