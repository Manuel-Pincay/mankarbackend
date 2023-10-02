import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Mantenimientos } from "../Interfaces";

const MantenimientosSchema: mongoose.Schema = new Schema<Mantenimientos>({
 
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

const Mantenimiento: mongoose.Model<Mantenimientos> = model<Mantenimientos>(
  "Mantenimiento",
  MantenimientosSchema,
);

export { Mantenimiento };
