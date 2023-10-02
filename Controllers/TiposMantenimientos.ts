import { TiposMantenimientos } from "../Interfaces";
import { Request, Response } from "express";
import { TipoMantenimiento } from "../models";

const BuscarTiposMantenimiento = async (req: Request, res: Response) => {
  try {
    const { Limite = 100, Desde = 0 } = req.query;
    const query = { ESTADO: true };

    const [total, datos]: [number, TiposMantenimientos[]] = await Promise.all([
      TipoMantenimiento.countDocuments(query),
      TipoMantenimiento.find(query).skip(Number(Desde)).limit(Number(Limite)),
    ]);

    res.json({
      total,
      datos,
    });
  } catch (error) {
    console.error("Error al buscar tipos de mantenimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const BuscarTipoMantenimientoPorID = async (req: Request, res: Response) => {
  try {
    const { TIPOSMANTE_ID } = req.params;
    const tipoMantenimientoEncontrado: TiposMantenimientos | null = await TipoMantenimiento.findOne({
      TIPOSMANTE_ID,
      ESTADO: true,
    });

    if (!tipoMantenimientoEncontrado) {
      return res.status(404).json({ mensaje: "Tipo de mantenimiento no encontrado" });
    }

    res.json(tipoMantenimientoEncontrado);
  } catch (error) {
    console.error("Error al buscar el tipo de mantenimiento por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const CrearTipoMantenimiento = async (req: Request, res: Response) => {
  try {
    // Obtener los datos del tipo de mantenimiento del cuerpo de la solicitud
    const nuevoTipoMantenimiento: TiposMantenimientos = req.body;

    // Función para encontrar un TIPOSMANTE_ID no utilizado
    const encontrarTIPOSMANTE_IDNoUtilizado = async () => {
      let nuevoTIPOSMANTE_ID = nuevoTipoMantenimiento.TIPOSMANTE_ID;
      let tipoMantenimientoExistente: TiposMantenimientos | null;

      do {
        tipoMantenimientoExistente = await TipoMantenimiento.findOne({
          TIPOSMANTE_ID: nuevoTIPOSMANTE_ID,
        });
        if (tipoMantenimientoExistente) {
          nuevoTIPOSMANTE_ID++;
        }
      } while (tipoMantenimientoExistente);

      return nuevoTIPOSMANTE_ID;
    };
    nuevoTipoMantenimiento.TIPOSMANTE_ID = await encontrarTIPOSMANTE_IDNoUtilizado();
    const tipoMantenimientoCreado: TiposMantenimientos = await TipoMantenimiento.create(
      nuevoTipoMantenimiento
    );

    res.status(201).json(tipoMantenimientoCreado);
  } catch (error) {
    console.error("Error al crear un tipo de mantenimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const ActualizarTipoMantenimiento = async (req: Request, res: Response) => {
  try {
    const { TIPOSMANTE_ID } = req.params;
    const datosActualizados: TiposMantenimientos = req.body;

    const tipoMantenimientoExistente: TiposMantenimientos | null = await TipoMantenimiento.findOne({
      TIPOSMANTE_ID,
    });

    if (!tipoMantenimientoExistente) {
      return res.status(404).json({ mensaje: "Tipo de mantenimiento no encontrado" });
    }

    await TipoMantenimiento.findOneAndUpdate({ TIPOSMANTE_ID }, datosActualizados);
    res.status(200).json({ mensaje: "Tipo de mantenimiento actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el tipo de mantenimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const DesactivarTipoMantenimiento = async (req: Request, res: Response) => {
  try {
    const { TIPOSMANTE_ID } = req.params;

    const tipoMantenimientoExistente: TiposMantenimientos | null = await TipoMantenimiento.findOne({
      TIPOSMANTE_ID,
    });

    if (!tipoMantenimientoExistente) {
      return res.status(404).json({ mensaje: "Tipo de mantenimiento no encontrado" });
    }

    await TipoMantenimiento.findOneAndUpdate({ TIPOSMANTE_ID }, { ESTADO: false });
    res.status(200).json({ mensaje: "Tipo de mantenimiento desactivado correctamente" });
  } catch (error) {
    console.error("Error al desactivar el tipo de mantenimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const BuscarTipoMantenimientoPorDescripcion = async (req: Request, res: Response) => {
  try {
    const { TIPOMANTE_DESCRIPCION } = req.params;

    const tiposMantenimientoEncontrados: TiposMantenimientos[] = await TipoMantenimiento.find({
      TIPOMANTE_DESCRIPCION,
      ESTADO: true,
    });

    if (tiposMantenimientoEncontrados.length === 0) {
      return res.status(404).json({ mensaje: "Tipos de mantenimiento no encontrados" });
    }

    res.json(tiposMantenimientoEncontrados);
  } catch (error) {
    console.error("Error al buscar tipos de mantenimiento por descripción:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export {
  BuscarTiposMantenimiento,
  BuscarTipoMantenimientoPorID,
  CrearTipoMantenimiento,
  ActualizarTipoMantenimiento,
  DesactivarTipoMantenimiento,
  BuscarTipoMantenimientoPorDescripcion,
};
