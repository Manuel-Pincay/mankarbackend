"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repostaje = void 0;
const mongoose_1 = require("mongoose");
const RepostajesSchema = new mongoose_1.Schema({
    REPOSTAJE_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    REPOSTAJE_KMAC: {
        type: Number,
        required: true,
    },
    REPOSTAJE_COMENTARIO: {
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
    RUTAS_ID: {
        type: Number,
        required: true,
    },
});
const Repostaje = (0, mongoose_1.model)("Repostaje", RepostajesSchema);
exports.Repostaje = Repostaje;
