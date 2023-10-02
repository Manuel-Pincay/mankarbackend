"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const { BuscarEstablecimientos, BuscarEstablecimientoPorID, CrearEstablecimiento, ActualizarEstablecimiento, DesactivarEstablecimiento, } = Index_1.Establecimiento;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', BuscarEstablecimientos);
router.get('/:ESTABLECIMIENTO_ID', BuscarEstablecimientoPorID);
router.post('/', [
    (0, express_validator_1.check)('ESTABLECIMIENTO_NOMBRE', 'El nombre del establecimiento es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('ESTABLECIMIENTO_DESCRIPCION', 'La descripción del establecimiento es obligatoria.').not().isEmpty(),
], CrearEstablecimiento);
router.put('/:ESTABLECIMIENTO_ID', ActualizarEstablecimiento);
router.delete('/:ESTABLECIMIENTO_ID', DesactivarEstablecimiento);
