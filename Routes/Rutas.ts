import { Router } from 'express';
import { check } from 'express-validator';
import { Ruta } from '../Controllers/Index';

const {
  BuscarRutas,
  BuscarRutaPorID,
  CrearRuta,
  ActualizarRuta,
  DesactivarRuta,
} = Ruta;

const router = Router();

router.get('/', BuscarRutas);
router.get('/:RUTAS_ID', BuscarRutaPorID);
router.post(
  '/',
  [
    check('RUTAS_DETALLE', 'El detalle es obligatorio.').not().isEmpty(),
    check('RUTAS_PARTIDA', 'La partida es obligatoria.').not().isEmpty(),
    check('RUTAS_LLEGADA', 'La llegada es obligatoria.').not().isEmpty(),
    check('RUTAS_KMPROM', 'Los kilómetros promedio son obligatorios.').not().isEmpty(),
  ],
  CrearRuta
);
router.put('/:RUTAS_ID', ActualizarRuta);
router.delete('/:RUTAS_ID', DesactivarRuta);

export { router };
