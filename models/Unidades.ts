import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Unidades } from "../Interfaces";

const UnidadesSchema: mongoose.Schema = new Schema<Unidades>({
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

const Unidad: mongoose.Model<Unidades> = model<Unidades>(
  "Unidad",
  UnidadesSchema,
);

export { Unidad };
