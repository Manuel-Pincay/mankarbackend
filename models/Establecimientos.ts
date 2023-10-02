import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Establecimientos } from "../Interfaces";

const EstablecimientosSchema: mongoose.Schema = new Schema<Establecimientos>({
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

const Establecimiento: mongoose.Model<Establecimientos> =
  model<Establecimientos>("Establecimiento", EstablecimientosSchema);

export { Establecimiento };
