"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ruta = void 0;
const mongoose_1 = require("mongoose");
const RutasSchema = new mongoose_1.Schema({
    RUTAS_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    RUTAS_DETALLE: {
        type: String,
        required: true,
    },
    RUTAS_PARTIDA: {
        type: String,
        required: true,
    },
    RUTAS_LLEGADA: {
        type: String,
        required: true,
    },
    RUTAS_KMPROM: {
        type: Number,
        required: true,
    },
    ESTADO: {
        type: Boolean,
        required: true,
        default: true,
    },
});
const Ruta = (0, mongoose_1.model)("Ruta", RutasSchema);
exports.Ruta = Ruta;
