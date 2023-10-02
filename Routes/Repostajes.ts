import { Router } from 'express';
import { check } from 'express-validator';
import { Repostaje } from '../Controllers/Index';

const {
  BuscarRepostajes,
  BuscarRepostajePorID,
  CrearRepostaje,
  ActualizarRepostaje,
  DesactivarRepostaje,
} = Repostaje;

const router = Router();

router.get('/', BuscarRepostajes);
router.get('/:_id', BuscarRepostajePorID);
router.post(
  '/',
  [
    check('REPOSTAJE_KMAC', 'El valor de los kilómetros es obligatorio.').not().isEmpty(),
    check('UNIDADES_PLACA', 'La placa de la unidad es obligatoria.').not().isEmpty(),
    check('RUTAS_ID', 'El ID de la ruta es obligatorio.').not().isEmpty(),
  ],
  CrearRepostaje
);
router.put('/:_id', ActualizarRepostaje);
router.delete('/:_id', DesactivarRepostaje);

export { router };
