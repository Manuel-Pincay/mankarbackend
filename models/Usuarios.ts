import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Usuarios } from "../Interfaces";

const UsuariosSchema: mongoose.Schema = new Schema<Usuarios>({
  USUARIO_DNI: {
    type: Number,
    required: [true, "DNI bligatorio"],
    unique: true,
  },
  USUARIO_EMAIL: {
    type: String,
    required: true,
    unique: true,
  },
  USUARIO_PASSWORD: {
    type: String,
    required: true,
  },
  USUARIO_NOMBRE: {
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
  ROL_ID: {
    type: Number,
    required: true,
  },
});

const Usuario: mongoose.Model<Usuarios> = model<Usuarios>(
  "Usuario",
  UsuariosSchema,
);

export { Usuario };
