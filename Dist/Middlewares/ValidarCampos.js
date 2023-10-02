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
exports.validarRepetidoUsuarios = exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const models_1 = require("../models"); // Asegúrate de importar los modelos correctos.
const validarRepetidoUsuarios = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { USUARIO_DNI } = req.body;
        // Verificar si ya existe un usuario con el mismo DNI
        const usuarioExistente = yield models_1.Usuario.findOne({ USUARIO_DNI });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        // Si no existe, continúa con la creación
        next();
    }
    catch (error) {
        console.error('Error al validar usuario duplicado:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.validarRepetidoUsuarios = validarRepetidoUsuarios;
const validarCampos = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validarCampos = validarCampos;
