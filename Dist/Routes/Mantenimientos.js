"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const { BuscarMantenimientos, BuscarMantenimientoPorID, CrearMantenimiento, ActualizarMantenimiento, DesactivarMantenimiento, } = Index_1.Mantenimiento;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', BuscarMantenimientos);
router.get('/:MANTENIMIENTO_ID', BuscarMantenimientoPorID);
router.post('/', [
    (0, express_validator_1.check)('MANTENIMIENTO_KMAC', 'El valor de los kilómetros actuales es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('MANTENIMIENTO_KMPROX', 'El valor de los kilómetros próximos es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('UNIDADES_PLACA', 'La placa de la unidad es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('TIPOSMANTE_ID', 'El ID del tipo de mantenimiento es obligatorio.').not().isEmpty(),
], CrearMantenimiento);
router.put('/:MANTENIMIENTO_ID', ActualizarMantenimiento);
router.delete('/:MANTENIMIENTO_ID', DesactivarMantenimiento);
