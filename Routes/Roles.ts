import { Router } from 'express';
import { check } from 'express-validator';
import { Rol } from '../Controllers/Index';

const {
  BuscarRoles,
  BuscarRolPorID,
  CrearRol,
  ActualizarRol,
  DesactivarRol,
} = Rol;

const router = Router();

router.get('/', BuscarRoles);
router.get('/:ROL_ID', BuscarRolPorID);
router.post(
  '/',
  [
    check('ROL_DESCRIPCION', 'La descripción del rol es obligatoria.').not().isEmpty(),
  ],
  CrearRol
);
router.put('/:ROL_ID', ActualizarRol);
router.delete('/:ROL_ID', DesactivarRol);

export { router };
