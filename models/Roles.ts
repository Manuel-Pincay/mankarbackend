import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Roles } from "../Interfaces";

const RolesSchema: mongoose.Schema = new Schema<Roles>({
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

const Rol: mongoose.Model<Roles> = model<Roles>("Rol", RolesSchema);

export { Rol };
