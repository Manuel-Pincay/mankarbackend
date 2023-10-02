"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const { BuscarTiposMantenimiento, BuscarTipoMantenimientoPorID, CrearTipoMantenimiento, ActualizarTipoMantenimiento, DesactivarTipoMantenimiento, BuscarTipoMantenimientoPorDescripcion, } = Index_1.TipoMantenimiento;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', BuscarTiposMantenimiento);
router.get('/:TIPOSMANTE_ID', BuscarTipoMantenimientoPorID);
router.get('/descripcion/:TIPOMANTE_DESCRIPCION', BuscarTipoMantenimientoPorDescripcion);
router.post('/', [
    (0, express_validator_1.check)('TIPOSMANTE_KM', 'Los kilómetros son obligatorios.').not().isEmpty(),
    (0, express_validator_1.check)('TIPOMANTE_DESCRIPCION', 'La descripción es obligatoria.').not().isEmpty(),
], CrearTipoMantenimiento);
router.put('/:TIPOSMANTE_ID', ActualizarTipoMantenimiento);
router.delete('/:TIPOSMANTE_ID', DesactivarTipoMantenimiento);
