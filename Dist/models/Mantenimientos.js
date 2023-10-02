"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mantenimiento = void 0;
const mongoose_1 = require("mongoose");
const MantenimientosSchema = new mongoose_1.Schema({
    MANTENIMIENTO_ID: {
        type: Number,
        required: [true, "ID bligatorio"],
        unique: true,
    },
    MANTENIMIENTO_KMAC: {
        type: Number,
        required: true,
    },
    MANTENIMIENTO_KMPROX: {
        type: Number,
        required: true,
    },
    MANTENIMIENTO_COMENTARIO: {
        type: String,
        required: true,
    },
    MANTENIMIENTO_FECHA: {
        type: Date,
        required: true,
    },
    MANTENIMIENTO_IMAGEN: {
        type: String,
        required: true,
    },
    MANTENIMIENTO_IMAGEN2: {
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
    TIPOSMANTE_ID: {
        type: Number,
        required: true,
    },
});
const Mantenimiento = (0, mongoose_1.model)("Mantenimiento", MantenimientosSchema);
exports.Mantenimiento = Mantenimiento;
