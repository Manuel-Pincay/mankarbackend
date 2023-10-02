import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Rutas } from "../Interfaces";

const RutasSchema: mongoose.Schema = new Schema<Rutas>({
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

const Ruta: mongoose.Model<Rutas> = model<Rutas>("Ruta", RutasSchema);

export { Ruta };
