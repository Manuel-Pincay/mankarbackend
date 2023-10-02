import { Establecimientos } from "../Interfaces";
import { Request, Response } from "express";
import { Establecimiento } from "../models";

// Controlador para crear un nuevo establecimiento
const CrearEstablecimiento = async (req: Request, res: Response) => {
  try {
    // Obtener los datos del establecimiento del cuerpo de la solicitud
    const nuevoEstablecimiento: Establecimientos = req.body;

    // Crear un nuevo establecimiento en la base de datos
    const establecimientoCreado: Establecimientos =
      await Establecimiento.create(nuevoEstablecimiento);

    // Devolver el establecimiento creado en la respuesta JSON
    res.status(201).json(establecimientoCreado);
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al crear un establecimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para obtener todos los establecimientos
const BuscarEstablecimientos = async (req: Request, res: Response) => {
  try {
    const { Limite = 100, Desde = 0 } = req.query;
    const query = { ESTADO: true };

    // Usar Promise.all para realizar ambas consultas de manera concurrente
    const [total, datos]: [number, Establecimientos[]] = await Promise.all([
      Establecimiento.countDocuments(query),
      Establecimiento.find(query)
        .skip(Number(Desde))
        .limit(Number(Limite)),
    ]);

    // Devolver una respuesta JSON con los datos encontrados
    res.json({
      total,
      datos,
    });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al buscar establecimientos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para obtener un establecimiento específico por ID

const BuscarEstablecimientoPorID = async (req: Request, res: Response) => {
  try {
    const { ESTABLECIMIENTO_ID } = req.params; // Obtiene el ID del establecimiento de los parámetros de la solicitud

    // Realiza la búsqueda del establecimiento por ID excluyendo los establecimientos con estado FALSE
    const establecimientoEncontrado = await Establecimiento.findOne({
      ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID),
      ESTADO: true,
    });

    if (!establecimientoEncontrado) {
      // Si no se encuentra el establecimiento, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Establecimiento no encontrado" });
    }

    // Si se encuentra el establecimiento, lo devuelve en la respuesta JSON
    res.json(establecimientoEncontrado);
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al buscar el establecimiento por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Controlador para actualizar un establecimiento por ID
const ActualizarEstablecimiento = async (req: Request, res: Response) => {
  try {
    const { ESTABLECIMIENTO_ID } = req.params; // Obtiene el ID del establecimiento de los parámetros de la solicitud
    const datosActualizados: Partial<Establecimientos> = req.body; // Obtiene los datos actualizados del establecimiento del cuerpo de la solicitud

    // Verificar si el establecimiento con el ID dado existe
    const establecimientoExistente = await Establecimiento.findOne({
      ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID),
    });

    if (!establecimientoExistente) {
      // Si el establecimiento no se encuentra, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Establecimiento no encontrado" });
    }

    // Actualizar los datos del establecimiento existente con los nuevos datos
    await Establecimiento.findOneAndUpdate(
      { ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID) },
      datosActualizados
    );

    // Devolver un mensaje de éxito
    res.status(200).json({ mensaje: "Establecimiento actualizado correctamente" });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al actualizar el establecimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
// Controlador para desactivar un establecimiento por ID

const DesactivarEstablecimiento = async (req: Request, res: Response) => {
  try {
    const { ESTABLECIMIENTO_ID } = req.params; // Obtiene el ID del establecimiento de los parámetros de la solicitud

    // Verificar si el establecimiento con el ID dado existe
    const establecimientoExistente = await Establecimiento.findOne({
      ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID),
    });

    if (!establecimientoExistente) {
      // Si el establecimiento no se encuentra, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Establecimiento no encontrado" });
    }

    // Cambiar el estado del establecimiento a FALSE en lugar de eliminarlo
    await Establecimiento.findOneAndUpdate(
      { ESTABLECIMIENTO_ID: Number(ESTABLECIMIENTO_ID) },
      { ESTADO: false }
    );

    // Devolver un mensaje de éxito
    res.status(200).json({ mensaje: "Establecimiento desactivado correctamente" });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al desactivar el establecimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


export {
  CrearEstablecimiento,
  BuscarEstablecimientos,
  BuscarEstablecimientoPorID,
  ActualizarEstablecimiento,
  DesactivarEstablecimiento,
};
