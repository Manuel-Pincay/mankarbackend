"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const UsuariosSchema = new mongoose_1.Schema({
    USUARIO_DNI: {
        type: Number,
        required: [true, "DNI bligatorio"],
        unique: true,
    },
    USUARIO_EMAIL: {
        type: String,
        required: true,
        unique: true,
    },
    USUARIO_PASSWORD: {
        type: String,
        required: true,
    },
    USUARIO_NOMBRE: {
        type: String,
        required: true,
    },
    ESTADO: {
        type: Boolean,
        required: true,
        default: true,
    },
    UNIDADES_PLACA: {
        type: String,
        required: true,
    },
    ROL_ID: {
        type: Number,
        required: true,
    },
});
const Usuario = (0, mongoose_1.model)("Usuario", UsuariosSchema);
exports.Usuario = Usuario;
