
import { Usuarios } from "../Interfaces";
import { Request, Response } from "express";
import { Usuario } from "../models";

const BuscarUsuarios = async (req: Request, res: Response) => {
  try {
    const { Limite = 100, Desde = 0 } = req.query;
    const query = { ESTADO: true };

    // Usar Promise.all para realizar ambas consultas de manera concurrente
    const [total, datos]: [number, Usuarios[]] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query).skip(Number(Desde)).limit(Number(Limite)),
    ]);

    // Devolver una respuesta JSON con los datos encontrados
    res.json({
      total,
      datos,
    });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al buscar usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const BuscarUsuarioPorDNI = async (req: Request, res: Response) => {
  try {
    const { USUARIO_DNI } = req.params; // Obtiene el DNI del usuario de los parámetros de la solicitud

    // Realiza la búsqueda del usuario por DNI excluyendo los usuarios con estado FALSE
    const usuarioEncontrado: Usuarios | null = await Usuario.findOne({
      USUARIO_DNI,
      ESTADO: true,
    });

    if (!usuarioEncontrado) {
      // Si no se encuentra el usuario, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Si se encuentra el usuario, lo devuelve en la respuesta JSON
    res.json(usuarioEncontrado);
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al buscar el usuario por DNI:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
const CrearUsuario = async (req: Request, res: Response) => {
  try {
    // Obtener los datos del usuario del cuerpo de la solicitud
    const nuevoUsuario: Usuarios = req.body;

    // Verificar si los datos se están recibiendo correctamente
    console.log("Datos del nuevo usuario:", nuevoUsuario);

    // Verificar si ya existe un usuario con el mismo DNI
    const usuarioExistente: Usuarios | null = await Usuario.findOne({
      USUARIO_DNI: nuevoUsuario.USUARIO_DNI,
    });

    if (usuarioExistente) {
      // Si el usuario ya existe, devuelve un mensaje de error
      console.log("Usuario existente:", usuarioExistente);
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Crear un nuevo usuario en la base de datos
    const usuarioCreado: Usuarios = await Usuario.create(nuevoUsuario);

    // Verificar si el usuario se creó correctamente
    console.log("Usuario creado:", usuarioCreado);

    // Devolver el usuario creado en la respuesta JSON
    res.status(201).json(usuarioCreado);
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al crear un usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const ActualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { USUARIO_DNI } = req.params; // Obtiene el DNI del usuario de los parámetros de la solicitud
    const datosActualizados: Usuarios = req.body; // Obtiene los datos actualizados del usuario del cuerpo de la solicitud

    // Verificar si el usuario con el DNI dado existe
    const usuarioExistente: Usuarios | null = await Usuario.findOne({
      USUARIO_DNI,
    });

    if (!usuarioExistente) {
      // Si el usuario no se encuentra, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualizar los datos del usuario existente con los nuevos datos
    await Usuario.findOneAndUpdate({ USUARIO_DNI }, datosActualizados);

    // Devolver un mensaje de éxito
    res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const DesactivarUsuario = async (req: Request, res: Response) => {
  try {
    const { USUARIO_DNI } = req.params; // Obtiene el DNI del usuario de los parámetros de la solicitud

    // Verificar si el usuario con el DNI dado existe
    const usuarioExistente = await Usuario.findOne({ USUARIO_DNI });

    if (!usuarioExistente) {
      // Si el usuario no se encuentra, devuelve un mensaje de error
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Cambiar el estado del usuario a FALSE en lugar de eliminarlo
    await Usuario.findOneAndUpdate({ USUARIO_DNI }, { ESTADO: false });

    // Devolver un mensaje de éxito
    res.status(200).json({ mensaje: "Usuario desactivado correctamente" });
  } catch (error) {
    // En caso de error, manejarlo y devolver una respuesta de error
    console.error("Error al desactivar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export {
  BuscarUsuarios,
  BuscarUsuarioPorDNI,
  CrearUsuario,
  ActualizarUsuario,
  DesactivarUsuario,
};
