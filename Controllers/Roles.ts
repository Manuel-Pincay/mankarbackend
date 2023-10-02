import { Roles } from "../Interfaces";
import { Request, Response } from "express";
import { Rol } from "../models";



const CrearRol = async (req: Request, res: Response) => {
  try {
    const nuevoRol: Roles = req.body;
    const rolExistente: Roles | null = await Rol.findOne({
      ROL_ID: nuevoRol.ROL_ID,
    });

    if (rolExistente) {
      return res.status(400).json({ error: "El rol ya existe" });
    }

    const rolCreado: Roles = await Rol.create(nuevoRol);
    res.status(201).json(rolCreado);
  } catch (error) {
    console.error("Error al crear un rol:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const BuscarRoles = async (req: Request, res: Response) => {
  try {
    const { Limite = 100, Desde = 0 } = req.query;
    const query = { ESTADO: true };

    const [total, datos]: [number, Roles[]] = await Promise.all([
      Rol.countDocuments(query),
      Rol.find(query).skip(Number(Desde)).limit(Number(Limite)),
    ]);

    res.json({
      total,
      datos,
    });
  } catch (error) {
    console.error("Error al buscar roles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const BuscarRolPorID = async (req: Request, res: Response) => {
  try {
    const { ROL_ID } = req.params;
    const rolEncontrado: Roles | null = await Rol.findOne({
      ROL_ID,
      ESTADO: true,
    });

    if (!rolEncontrado) {
      return res.status(404).json({ mensaje: "Rol no encontrado" });
    }

    res.json(rolEncontrado);
  } catch (error) {
    console.error("Error al buscar el rol por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const ActualizarRol = async (req: Request, res: Response) => {
  try {
    const { ROL_ID } = req.params;
    const datosActualizados: Roles = req.body;

    const rolExistente: Roles | null = await Rol.findOne({
      ROL_ID,
    });

    if (!rolExistente) {
      return res.status(404).json({ mensaje: "Rol no encontrado" });
    }

    await Rol.findOneAndUpdate({ ROL_ID }, datosActualizados);
    res.status(200).json({ mensaje: "Rol actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const DesactivarRol = async (req: Request, res: Response) => {
  try {
    const { ROL_ID } = req.params;

    const rolExistente: Roles | null = await Rol.findOne({
      ROL_ID,
    });

    if (!rolExistente) {
      return res.status(404).json({ mensaje: "Rol no encontrado" });
    }

    await Rol.findOneAndUpdate({ ROL_ID }, { ESTADO: false });
    res.status(200).json({ mensaje: "Rol desactivado correctamente" });
  } catch (error) {
    console.error("Error al desactivar el rol:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export {
  BuscarRoles,
  BuscarRolPorID,
  CrearRol,
  ActualizarRol,
  DesactivarRol,
};
