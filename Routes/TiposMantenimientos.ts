import { Router } from 'express';
import { check } from 'express-validator';
import { TipoMantenimiento } from '../Controllers/Index';

const {
  BuscarTiposMantenimiento,
  BuscarTipoMantenimientoPorID,
  CrearTipoMantenimiento,
  ActualizarTipoMantenimiento,
  DesactivarTipoMantenimiento,
  BuscarTipoMantenimientoPorDescripcion,
} = TipoMantenimiento;

const router = Router();

router.get('/', BuscarTiposMantenimiento);
router.get('/:TIPOSMANTE_ID', BuscarTipoMantenimientoPorID);
router.get('/descripcion/:TIPOMANTE_DESCRIPCION', BuscarTipoMantenimientoPorDescripcion);
router.post(
  '/',
  [
    check('TIPOSMANTE_KM', 'Los kilómetros son obligatorios.').not().isEmpty(),
    check('TIPOMANTE_DESCRIPCION', 'La descripción es obligatoria.').not().isEmpty(),
  ],
  CrearTipoMantenimiento
);
router.put('/:TIPOSMANTE_ID', ActualizarTipoMantenimiento);
router.delete('/:TIPOSMANTE_ID', DesactivarTipoMantenimiento);

export { router };
