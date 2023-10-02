import { Router } from 'express';
import { check } from 'express-validator';
import { Establecimiento } from '../Controllers/Index';

const {
  BuscarEstablecimientos,
  BuscarEstablecimientoPorID,
  CrearEstablecimiento,
  ActualizarEstablecimiento,
  DesactivarEstablecimiento,
} = Establecimiento;

const router = Router();

router.get('/', BuscarEstablecimientos);
router.get('/:ESTABLECIMIENTO_ID', BuscarEstablecimientoPorID);
router.post(
  '/',
  [
    check('ESTABLECIMIENTO_NOMBRE', 'El nombre del establecimiento es obligatorio.').not().isEmpty(),
    check('ESTABLECIMIENTO_DESCRIPCION', 'La descripción del establecimiento es obligatoria.').not().isEmpty(),
  ],
  CrearEstablecimiento
);
router.put('/:ESTABLECIMIENTO_ID', ActualizarEstablecimiento);
router.delete('/:ESTABLECIMIENTO_ID', DesactivarEstablecimiento);

export { router };
