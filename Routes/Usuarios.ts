import { Router } from 'express';
import { check } from 'express-validator';
import { Usuario } from '../Controllers/Index';
import {funciones } from '../Middlewares/Index'


const { BuscarUsuarios, BuscarUsuarioPorDNI, CrearUsuario, ActualizarUsuario, DesactivarUsuario } = Usuario;

const { validarCampos, validarRepetidoUsuarios} = funciones

const router = Router();

router.get('/', BuscarUsuarios);
router.get('/:USUARIO_DNI', BuscarUsuarioPorDNI);
router.post(
  '/',
  [
    check('USUARIO_DNI', 'La cédula de usuario es obligatoria e irrepetible.').not().isEmpty(),validarCampos,validarRepetidoUsuarios
  ],
  [check('USUARIO_EMAIL', 'El email es obligatorio.').not().isEmpty(),validarCampos],
  [check('USUARIO_PASSWORD', 'La contraseña es obligatoria.').not().isEmpty(),validarCampos],
  [check('USUARIO_NOMBRE', 'El nombre es obligatorio.').not().isEmpty(),validarCampos],
  CrearUsuario
);
router.put('/:USUARIO_DNI', ActualizarUsuario);
router.delete('/:USUARIO_DNI', DesactivarUsuario);

export { router };
