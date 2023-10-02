import { Router } from 'express';
import { check } from 'express-validator';
import { Unidad } from '../Controllers/Index';

const {
  BuscarUnidades,
  BuscarUnidadPorPlaca,
  CrearUnidad,
  ActualizarUnidad,
  DesactivarUnidad,
} = Unidad;

const router = Router();

router.get('/', BuscarUnidades);
router.get('/:UNIDADES_PLACA', BuscarUnidadPorPlaca);
router.post(
  '/',
  [
    check('UNIDADES_PLACA', 'La placa del vehículo es obligatoria e irrepetible.').not().isEmpty(),
    check('UNIDADES_NUMERO', 'El número de unidad es obligatorio.').not().isEmpty(),
    check('UNIDADES_COLOR', 'El color es obligatorio.').not().isEmpty(),
    check('UNIDADES_MATRICULA', 'La matrícula es obligatoria.').not().isEmpty(),
    check('UNIDADES_ANO', 'El año es obligatorio.').not().isEmpty(),
    check('ESTABLECIMIENTO_ID', 'El ID del establecimiento es obligatorio.').not().isEmpty(),
    check('USUARIO_DNI', 'El DNI del usuario es obligatorio.').not().isEmpty(),
  ],
  CrearUnidad
);
router.put('/:UNIDADES_PLACA', ActualizarUnidad);
router.delete('/:UNIDADES_PLACA', DesactivarUnidad);

export { router };
