"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Establecimiento = void 0;
const mongoose_1 = require("mongoose");
const EstablecimientosSchema = new mongoose_1.Schema({
    ESTABLECIMIENTO_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    ESTABLECIMIENTO_NOMBRE: {
        type: String,
        required: [true, "Nombre obligatorio"],
    },
    ESTABLECIMIENTO_DESCRIPCION: {
        type: String,
        required: true,
    },
    ESTADO: {
        type: Boolean,
        required: true,
        default: true,
    },
});
const Establecimiento = (0, mongoose_1.model)("Establecimiento", EstablecimientosSchema);
exports.Establecimiento = Establecimiento;
