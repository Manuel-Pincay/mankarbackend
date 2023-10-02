import { Rutas } from "../Interfaces";
import { Request, Response } from "express";
import { Ruta } from "../models";

const BuscarRutas = async (req: Request, res: Response) => {
  try {
    const { Limite = 100, Desde = 0 } = req.query;
    const query = { ESTADO: true };

    const [total, datos]: [number, Rutas[]] = await Promise.all([
      Ruta.countDocuments(query),
      Ruta.find(query).skip(Number(Desde)).limit(Number(Limite)),
    ]);

    res.json({
      total,
      datos,
    });
  } catch (error) {
    console.error("Error al buscar rutas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const BuscarRutaPorID = async (req: Request, res: Response) => {
  try {
    const { RUTAS_ID } = req.params;
    const rutaEncontrada: Rutas | null = await Ruta.findOne({
      RUTAS_ID,
      ESTADO: true,
    });

    if (!rutaEncontrada) {
      return res.status(404).json({ mensaje: "Ruta no encontrada" });
    }

    res.json(rutaEncontrada);
  } catch (error) {
    console.error("Error al buscar la ruta por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
const CrearRuta = async (req: Request, res: Response) => {
  try {
    const nuevaRuta: Rutas = req.body;

    const encontrarRUTAS_IDNoUtilizado = async () => {
      let nuevoRUTAS_ID = nuevaRuta.RUTAS_ID;
      let rutaExistente: Rutas | null;

      do {
        rutaExistente = await Ruta.findOne({
          RUTAS_ID: nuevoRUTAS_ID,
        });

        if (rutaExistente) {
          nuevoRUTAS_ID++;
        }
      } while (rutaExistente);

      return nuevoRUTAS_ID;
    };

    nuevaRuta.RUTAS_ID = await encontrarRUTAS_IDNoUtilizado();

    const rutaCreada: Rutas = await Ruta.create(nuevaRuta);
    res.status(201).json(rutaCreada);
  } catch (error) {
    console.error("Error al crear una ruta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const ActualizarRuta = async (req: Request, res: Response) => {
  try {
    const { RUTAS_ID } = req.params;
    const datosActualizados: Rutas = req.body;

    const rutaExistente: Rutas | null = await Ruta.findOne({
      RUTAS_ID,
    });

    if (!rutaExistente) {
      return res.status(404).json({ mensaje: "Ruta no encontrada" });
    }

    await Ruta.findOneAndUpdate({ RUTAS_ID }, datosActualizados);
    res.status(200).json({ mensaje: "Ruta actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la ruta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const DesactivarRuta = async (req: Request, res: Response) => {
  try {
    const { RUTAS_ID } = req.params;

    const rutaExistente: Rutas | null = await Ruta.findOne({
      RUTAS_ID,
    });

    if (!rutaExistente) {
      return res.status(404).json({ mensaje: "Ruta no encontrada" });
    }

    await Ruta.findOneAndUpdate({ RUTAS_ID }, { ESTADO: false });
    res.status(200).json({ mensaje: "Ruta desactivada correctamente" });
  } catch (error) {
    console.error("Error al desactivar la ruta:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export {
  BuscarRutas,
  BuscarRutaPorID,
  CrearRuta,
  ActualizarRuta,
  DesactivarRuta,
};
