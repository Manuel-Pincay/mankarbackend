import { Unidades } from "../Interfaces";
import { Request, Response } from "express";
import { Unidad } from "../models";

// Controlador para buscar unidades
const BuscarUnidades = async (req: Request, res: Response) => {
  try {
    const { Limite = 100, Desde = 0 } = req.query;
    const query = { ESTADO: true };

    // Usar Promise.all para realizar ambas consultas de manera concurrente
    const [total, datos]: [number, Unidades[]] = await Promise.all([
      Unidad.countDocuments(query),
      Unidad.find(query).skip(Number(Desde)).limit(Number(Limite)),
    ]);

    // Devolver una respuesta JSON con los datos encontrados
    res.json({
      total,
      datos,
    });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al buscar unidades:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para buscar una unidad por su placa
const BuscarUnidadPorPlaca = async (req: Request, res: Response) => {
  try {
    const { UNIDADES_PLACA } = req.params; // Obtiene la placa de la unidad de los parámetros de la solicitud

    // Realiza la búsqueda de la unidad por su placa excluyendo las unidades con estado FALSE
    const unidadEncontrada: Unidades | null = await Unidad.findOne({
      UNIDADES_PLACA,
      ESTADO: true,
    });

    if (!unidadEncontrada) {
      // Si no se encuentra la unidad, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Unidad no encontrada" });
    }

    // Si se encuentra la unidad, la devuelve en la respuesta JSON
    res.json(unidadEncontrada);
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al buscar la unidad por placa:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para crear una nueva unidad
const CrearUnidad = async (req: Request, res: Response) => {
  try {
    // Obtener los datos de la unidad del cuerpo de la solicitud
    const nuevaUnidad: Unidades = req.body;

    // Verificar si ya existe una unidad con la misma placa
    const unidadExistente: Unidades | null = await Unidad.findOne({
      UNIDADES_PLACA: nuevaUnidad.UNIDADES_PLACA,
    });

    if (unidadExistente) {
      // Si la unidad ya existe, devuelve un mensaje de error
      return res.status(400).json({ error: "La unidad ya existe" });
    }

    // Crear una nueva unidad en la base de datos
    const unidadCreada: Unidades = await Unidad.create(nuevaUnidad);

    // Devolver la unidad creada en la respuesta JSON
    res.status(201).json(unidadCreada);
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al crear una unidad:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para actualizar una unidad existente
const ActualizarUnidad = async (req: Request, res: Response) => {
  try {
    const { UNIDADES_PLACA } = req.params;
    const datosActualizados: Unidades = req.body;

    const unidadExistente: Unidades | null = await Unidad.findOne({
      UNIDADES_PLACA,
    });

    if (!unidadExistente) {
      return res.status(404).json({ mensaje: "Unidad no encontrada" });
    }

    await Unidad.findOneAndUpdate({ UNIDADES_PLACA }, datosActualizados);

    res.status(200).json({ mensaje: "Unidad actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la unidad:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Controlador para desactivar una unidad cambiando su estado a FALSE
const DesactivarUnidad = async (req: Request, res: Response) => {
  try {
    const { UNIDADES_PLACA } = req.params; // Obtiene la placa de la unidad de los parámetros de la solicitud

    // Verificar si la unidad con la placa dada existe
    const unidadExistente = await Unidad.findOne({ UNIDADES_PLACA });

    if (!unidadExistente) {
      // Si la unidad no se encuentra, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Unidad no encontrada" });
    }

    // Cambiar el estado de la unidad a FALSE en lugar de eliminarla
    await Unidad.findOneAndUpdate({ UNIDADES_PLACA }, { ESTADO: false });

    // Devolver un mensaje de éxito
    res.status(200).json({ mensaje: "Unidad desactivada correctamente" });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al desactivar la unidad:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export {
  BuscarUnidades,
  BuscarUnidadPorPlaca,
  CrearUnidad,
  ActualizarUnidad,
  DesactivarUnidad,
};
