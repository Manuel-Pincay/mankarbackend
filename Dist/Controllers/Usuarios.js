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
exports.DesactivarUsuario = exports.ActualizarUsuario = exports.CrearUsuario = exports.BuscarUsuarioPorDNI = exports.BuscarUsuarios = void 0;
const models_1 = require("../models");
const BuscarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Limite = 100, Desde = 0 } = req.query;
        const query = { ESTADO: true };
        // Usar Promise.all para realizar ambas consultas de manera concurrente
        const [total, datos] = yield Promise.all([
            models_1.Usuario.countDocuments(query),
            models_1.Usuario.find(query).skip(Number(Desde)).limit(Number(Limite)),
        ]);
        // Devolver una respuesta JSON con los datos encontrados
        res.json({
            total,
            datos,
        });
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al buscar usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarUsuarios = BuscarUsuarios;
const BuscarUsuarioPorDNI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { USUARIO_DNI } = req.params; // Obtiene el DNI del usuario de los parámetros de la solicitud
        // Realiza la búsqueda del usuario por DNI excluyendo los usuarios con estado FALSE
        const usuarioEncontrado = yield models_1.Usuario.findOne({
            USUARIO_DNI,
            ESTADO: true,
        });
        if (!usuarioEncontrado) {
            // Si no se encuentra el usuario, devuelve un mensaje de error
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        // Si se encuentra el usuario, lo devuelve en la respuesta JSON
        res.json(usuarioEncontrado);
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al buscar el usuario por DNI:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.BuscarUsuarioPorDNI = BuscarUsuarioPorDNI;
const CrearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del usuario del cuerpo de la solicitud
        const nuevoUsuario = req.body;
        // Verificar si los datos se están recibiendo correctamente
        console.log("Datos del nuevo usuario:", nuevoUsuario);
        // Verificar si ya existe un usuario con el mismo DNI
        const usuarioExistente = yield models_1.Usuario.findOne({
            USUARIO_DNI: nuevoUsuario.USUARIO_DNI,
        });
        if (usuarioExistente) {
            // Si el usuario ya existe, devuelve un mensaje de error
            console.log("Usuario existente:", usuarioExistente);
            return res.status(400).json({ error: "El usuario ya existe" });
        }
        // Crear un nuevo usuario en la base de datos
        const usuarioCreado = yield models_1.Usuario.create(nuevoUsuario);
        // Verificar si el usuario se creó correctamente
        console.log("Usuario creado:", usuarioCreado);
        // Devolver el usuario creado en la respuesta JSON
        res.status(201).json(usuarioCreado);
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al crear un usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.CrearUsuario = CrearUsuario;
const ActualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { USUARIO_DNI } = req.params; // Obtiene el DNI del usuario de los parámetros de la solicitud
        const datosActualizados = req.body; // Obtiene los datos actualizados del usuario del cuerpo de la solicitud
        // Verificar si el usuario con el DNI dado existe
        const usuarioExistente = yield models_1.Usuario.findOne({
            USUARIO_DNI,
        });
        if (!usuarioExistente) {
            // Si el usuario no se encuentra, devuelve un mensaje de error
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        // Actualizar los datos del usuario existente con los nuevos datos
        yield models_1.Usuario.findOneAndUpdate({ USUARIO_DNI }, datosActualizados);
        // Devolver un mensaje de éxito
        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.ActualizarUsuario = ActualizarUsuario;
const DesactivarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { USUARIO_DNI } = req.params; // Obtiene el DNI del usuario de los parámetros de la solicitud
        // Verificar si el usuario con el DNI dado existe
        const usuarioExistente = yield models_1.Usuario.findOne({ USUARIO_DNI });
        if (!usuarioExistente) {
            // Si el usuario no se encuentra, devuelve un mensaje de error
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        // Cambiar el estado del usuario a FALSE en lugar de eliminarlo
        yield models_1.Usuario.findOneAndUpdate({ USUARIO_DNI }, { ESTADO: false });
        // Devolver un mensaje de éxito
        res.status(200).json({ mensaje: "Usuario desactivado correctamente" });
    }
    catch (error) {
        // En caso de error, manejarlo y devolver una respuesta de error
        console.error("Error al desactivar el usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.DesactivarUsuario = DesactivarUsuario;
