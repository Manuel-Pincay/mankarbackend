"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const { BuscarRutas, BuscarRutaPorID, CrearRuta, ActualizarRuta, DesactivarRuta, } = Index_1.Ruta;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', BuscarRutas);
router.get('/:RUTAS_ID', BuscarRutaPorID);
router.post('/', [
    (0, express_validator_1.check)('RUTAS_DETALLE', 'El detalle es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('RUTAS_PARTIDA', 'La partida es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('RUTAS_LLEGADA', 'La llegada es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('RUTAS_KMPROM', 'Los kilómetros promedio son obligatorios.').not().isEmpty(),
], CrearRuta);
router.put('/:RUTAS_ID', ActualizarRuta);
router.delete('/:RUTAS_ID', DesactivarRuta);
