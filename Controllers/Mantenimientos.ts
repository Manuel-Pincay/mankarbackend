import { Mantenimientos } from "../Interfaces";
import { Request, Response } from "express";
import { Mantenimiento } from "../models";
import mongoose, { ClientSession } from 'mongoose'; 
// Controlador para crear un nuevo mantenimientoconst CrearMantenimiento = async (req: Request, res: Response) => {
  const CrearMantenimiento = async (req: Request, res: Response) => {
    try {
      // Obtener los datos del mantenimiento del cuerpo de la solicitud
      const nuevoMantenimiento: Mantenimientos = req.body;
  
      // Función para encontrar un MANTENIMIENTO_ID no utilizado
      const encontrarMANTENIMIENTO_IDNoUtilizado = async () => {
        let nuevoMANTENIMIENTO_ID = nuevoMantenimiento.MANTENIMIENTO_ID;
        let mantenimientoExistente: Mantenimientos | null;
  
        do {
          mantenimientoExistente = await Mantenimiento.findOne({
            MANTENIMIENTO_ID: nuevoMANTENIMIENTO_ID,
          });
  
          if (mantenimientoExistente) {
            // Si ya existe un mantenimiento con este MANTENIMIENTO_ID, suma +1
            nuevoMANTENIMIENTO_ID++;
          }
        } while (mantenimientoExistente);
  
        return nuevoMANTENIMIENTO_ID;
      };
  
      // Encontrar un MANTENIMIENTO_ID no utilizado
      nuevoMantenimiento.MANTENIMIENTO_ID = await encontrarMANTENIMIENTO_IDNoUtilizado();
  
      // Crear un nuevo mantenimiento en la base de datos
      const mantenimientoCreado: Mantenimientos = await Mantenimiento.create(
        nuevoMantenimiento
      );
  
      // Devolver el mantenimiento creado en la respuesta JSON
      res.status(201).json(mantenimientoCreado);
    } catch (error) {
      // En caso de error, manejarlo y devolver una respuesta de error
      console.error("Error al crear un mantenimiento:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  
 
// Controlador para obtener todos los mantenimientos
const BuscarMantenimientos = async (req: Request, res: Response) => {
  try {
    const { Limite = 100, Desde = 0 } = req.query;
    const query = { ESTADO: true };

    // Usar Promise.all para realizar ambas consultas de manera concurrente
    const [total, datos]: [number, Mantenimientos[]] = await Promise.all([
      Mantenimiento.countDocuments(query),
      Mantenimiento.find(query)
        .skip(Number(Desde))
        .limit(Number(Limite)).sort({ MANTENIMIENTO_ID: 1 }),
    ]);

    res.json({
      total,
      datos,
    });
  } catch (error) {
    console.error("Error al buscar mantenimientos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const BuscarMantenimientoPorID = async (req: Request, res: Response) => {
  try {
    // Obtener el MANTENIMIENTO_ID de los parámetros de la solicitud
    const { MANTENIMIENTO_ID } = req.params;

    // Buscar el mantenimiento por MANTENIMIENTO_ID en la base de datos
    const mantenimiento = await Mantenimiento.findOne({
      MANTENIMIENTO_ID: Number(MANTENIMIENTO_ID),
    });

    if (!mantenimiento) {
      // Si no se encuentra el mantenimiento, devuelve un mensaje de error
      return res.status(404).json({ error: 'Mantenimiento no encontrado' });
    }

    // Devolver el mantenimiento encontrado en la respuesta JSON
    res.status(200).json(mantenimiento);
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error('Error al buscar un mantenimiento por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const ActualizarMantenimiento = async (req: Request, res: Response) => {
  try {
    const { MANTENIMIENTO_ID } = req.params; // Obtiene el MANTENIMIENTO_ID del mantenimiento de los parámetros de la solicitud
    const datosActualizados = req.body; // Obtiene los datos actualizados del mantenimiento del cuerpo de la solicitud

    // Verificar si el mantenimiento con el MANTENIMIENTO_ID dado existe
    const mantenimientoExistente = await Mantenimiento.findOne({
      MANTENIMIENTO_ID: Number(MANTENIMIENTO_ID),
    });

    if (!mantenimientoExistente) {
      // Si el mantenimiento no se encuentra, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Mantenimiento no encontrado" });
    }

    // Actualizar los datos del mantenimiento existente con los nuevos datos
    await Mantenimiento.findOneAndUpdate(
      { MANTENIMIENTO_ID: Number(MANTENIMIENTO_ID) },
      datosActualizados
    );

    // Devolver un mensaje de éxito
    res.status(200).json({ mensaje: "Mantenimiento actualizado correctamente" });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al actualizar el mantenimiento por MANTENIMIENTO_ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para desactivar un mantenimiento por MANTENIMIENTO_ID
const DesactivarMantenimiento = async (req: Request, res: Response) => {
  try {
    const { MANTENIMIENTO_ID } = req.params; // Obtiene el MANTENIMIENTO_ID del mantenimiento de los parámetros de la solicitud

    // Verificar si el mantenimiento con el MANTENIMIENTO_ID dado existe
    const mantenimientoExistente = await Mantenimiento.findOne({
      MANTENIMIENTO_ID: Number(MANTENIMIENTO_ID),
    });

    if (!mantenimientoExistente) {
      // Si el mantenimiento no se encuentra, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Mantenimiento no encontrado" });
    }

    // Cambiar el estado del mantenimiento a FALSE en lugar de eliminarlo
    await Mantenimiento.findOneAndUpdate(
      { MANTENIMIENTO_ID: Number(MANTENIMIENTO_ID) },
      { ESTADO: false }
    );

    // Devolver un mensaje de éxito
    res.status(200).json({ mensaje: "Mantenimiento desactivado correctamente" });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al desactivar el mantenimiento por MANTENIMIENTO_ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export {
  CrearMantenimiento,
  BuscarMantenimientos,
  BuscarMantenimientoPorID,
  ActualizarMantenimiento,
  DesactivarMantenimiento,
};
