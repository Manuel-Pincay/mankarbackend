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
exports.DesactivarRepostaje = exports.ActualizarRepostaje = exports.BuscarRepostajePorID = exports.BuscarRepostajes = exports.CrearRepostaje = void 0;
const models_1 = require("../models");
// Controlador para crear un nuevo repostaje
/* const CrearRepostaje = async (req: Request, res: Response) => {
  try {
    const nuevoRepostaje: Repostajes = req.body;
    
    const repostajeExistente: Repostajes | null = await Repostaje.findOne({
      ID: nuevoRepostaje.REPOSTAJE_ID,
    });

    if (repostajeExistente) {
      return res.status(400).json({ error: "Ya existe un repostaje con este ID" });
    }
    const repostajeCreado: Repostajes = await Repostaje.create(nuevoRepostaje);
    res.status(201).json(repostajeCreado);
  } catch (error) {
    console.error("Error al crear un repostaje:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}; */
const CrearRepostaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoRepostaje = req.body;
        // Función para encontrar un REPOSTAJE_ID no utilizado
        const encontrarREPOSTAJE_IDNoUtilizado = () => __awaiter(void 0, void 0, void 0, function* () {
            let nuevoREPOSTAJE_ID = nuevoRepostaje.REPOSTAJE_ID;
            let repostajeExistente;
            do {
                repostajeExistente = yield models_1.Repostaje.findOne({
                    REPOSTAJE_ID: nuevoREPOSTAJE_ID,
                });
                if (repostajeExistente) {
                    // Si ya existe un repostaje con este REPOSTAJE_ID, suma +1
                    nuevoREPOSTAJE_ID++;
                }
            } while (repostajeExistente);
            return nuevoREPOSTAJE_ID;
        });
        // Encontrar un REPOSTAJE_ID no utilizado
        nuevoRepostaje.REPOSTAJE_ID = yield encontrarREPOSTAJE_IDNoUtilizado();
        // Crear el nuevo repostaje
        const repostajeCreado = yield models_1.Repostaje.create(nuevoRepostaje);
        res.status(201).json(repostajeCreado);
    }
    catch (error) {
        console.error("Error al crear un repostaje:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.CrearRepostaje = CrearRepostaje;
// Controlador para obtener todos los repostajes
const BuscarRepostajes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Limite = 100, Desde = 0 } = req.query;
        const query = { ESTADO: true };
        const [total, datos] = yield Promise.all([
            models_1.Repostaje.countDocuments(query),
            models_1.Repostaje.find(query).skip(Number(Desde)).limit(Number(Limite)),
        ]);
        res.json({
            total,
            datos,
        });
    }
    catch (error) {
        console.error("Error al buscar repostajes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarRepostajes = BuscarRepostajes;
const BuscarRepostajePorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const repostajeEncontrado = yield models_1.Repostaje.findOne({
            _id: id,
            ESTADO: true,
        });
        if (!repostajeEncontrado) {
            return res.status(404).json({ mensaje: "Repostaje no encontrado" });
        }
        res.json(repostajeEncontrado);
    }
    catch (error) {
        console.error("Error al buscar el repostaje por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarRepostajePorID = BuscarRepostajePorID;
// Controlador para actualizar un repostaje por ID
const ActualizarRepostaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const repostajeExistente = yield models_1.Repostaje.findOne({ _id: id });
        if (!repostajeExistente) {
            return res.status(404).json({ mensaje: "Repostaje no encontrado" });
        }
        yield models_1.Repostaje.findOneAndUpdate({ _id: id }, datosActualizados);
        res.status(200).json({ mensaje: "Repostaje actualizado correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar el repostaje:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ActualizarRepostaje = ActualizarRepostaje;
// Controlador para desactivar un repostaje por ID
const DesactivarRepostaje = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const repostajeExistente = yield models_1.Repostaje.findOne({ _id: id });
        if (!repostajeExistente) {
            return res.status(404).json({ mensaje: "Repostaje no encontrado" });
        }
        yield models_1.Repostaje.findOneAndUpdate({ _id: id }, { ESTADO: false });
        res.status(200).json({ mensaje: "Repostaje desactivado correctamente" });
    }
    catch (error) {
        console.error("Error al desactivar el repostaje:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.DesactivarRepostaje = DesactivarRepostaje;
