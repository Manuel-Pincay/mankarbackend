import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { TiposMantenimientos } from "../Interfaces";

const TiposMantenimientosSchema: mongoose.Schema =
  new Schema<TiposMantenimientos>({
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

const TipoMantenimiento: mongoose.Model<TiposMantenimientos> =
  model<TiposMantenimientos>("TipoMantenimiento", TiposMantenimientosSchema);

export { TipoMantenimiento };
