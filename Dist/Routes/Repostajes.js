"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const { BuscarRepostajes, BuscarRepostajePorID, CrearRepostaje, ActualizarRepostaje, DesactivarRepostaje, } = Index_1.Repostaje;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', BuscarRepostajes);
router.get('/:_id', BuscarRepostajePorID);
router.post('/', [
    (0, express_validator_1.check)('REPOSTAJE_KMAC', 'El valor de los kilómetros es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('UNIDADES_PLACA', 'La placa de la unidad es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('RUTAS_ID', 'El ID de la ruta es obligatorio.').not().isEmpty(),
], CrearRepostaje);
router.put('/:_id', ActualizarRepostaje);
router.delete('/:_id', DesactivarRepostaje);
