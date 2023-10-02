"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unidad = void 0;
const mongoose_1 = require("mongoose");
const UnidadesSchema = new mongoose_1.Schema({
    UNIDADES_PLACA: {
        type: String,
        required: [true, "La placa del vehiculo es obligatira"],
        unique: true,
    },
    UNIDADES_NUMERO: {
        type: Number,
        required: true,
        unique: true,
    },
    UNIDADES_COLOR: {
        type: String,
        required: true,
    },
    UNIDADES_MATRICULA: {
        type: String,
        required: true,
    },
    UNIDADES_ANO: {
        type: Number,
        required: true,
    },
    ESTADO: {
        type: Boolean,
        required: true,
        default: true,
    },
    ESTABLECIMIENTO_ID: {
        type: Number,
        required: true,
    },
    USUARIO_DNI: {
        type: Number,
        required: true,
    },
});
const Unidad = (0, mongoose_1.model)("Unidad", UnidadesSchema);
exports.Unidad = Unidad;
