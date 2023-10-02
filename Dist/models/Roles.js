"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
const mongoose_1 = require("mongoose");
const RolesSchema = new mongoose_1.Schema({
    ROL_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    ROL_DESCRIPCION: {
        type: String,
        required: true,
    },
    ESTADO: {
        type: Boolean,
        required: true,
        default: true,
    },
});
const Rol = (0, mongoose_1.model)("Rol", RolesSchema);
exports.Rol = Rol;
