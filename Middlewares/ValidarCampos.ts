import{ NextFunction, Request, Response } from 'express'
import{validationResult, } from 'express-validator'
import { Usuarios } from '../Interfaces'; // Asegúrate de importar las interfaces correctas.
import { Usuario } from '../models'; // Asegúrate de importar los modelos correctos.


const validarRepetidoUsuarios = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { USUARIO_DNI } = req.body as Usuarios;
  
      // Verificar si ya existe un usuario con el mismo DNI
      const usuarioExistente = await Usuario.findOne({ USUARIO_DNI });
  
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
  
      // Si no existe, continúa con la creación
      next();
    } catch (error) {
      console.error('Error al validar usuario duplicado:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
}
    
const validarCampos = (req: Request, res: Response, next: NextFunction)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
    next()
}


export{validarCampos, validarRepetidoUsuarios}