"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoMantenimiento = void 0;
const mongoose_1 = require("mongoose");
const TiposMantenimientosSchema = new mongoose_1.Schema({
    TIPOSMANTE_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    TIPOSMANTE_KM: {
        type: Number,
        required: true,
    },
    TIPOMANTE_DESCRIPCION: {
        type: String,
        required: true,
    },
    ESTADO: {
        type: Boolean,
        required: true,
        default: true,
    },
});
const TipoMantenimiento = (0, mongoose_1.model)("TipoMantenimiento", TiposMantenimientosSchema);
exports.TipoMantenimiento = TipoMantenimiento;
