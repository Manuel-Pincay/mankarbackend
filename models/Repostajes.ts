import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Repostajes } from "../Interfaces";

const RepostajesSchema: mongoose.Schema = new Schema<Repostajes>({
  REPOSTAJE_ID:  {
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

const Repostaje: mongoose.Model<Repostajes> = model<Repostajes>(
  "Repostaje",
  RepostajesSchema,
);

export { Repostaje };
