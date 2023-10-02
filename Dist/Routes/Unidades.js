"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const { BuscarUnidades, BuscarUnidadPorPlaca, CrearUnidad, ActualizarUnidad, DesactivarUnidad, } = Index_1.Unidad;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', BuscarUnidades);
router.get('/:UNIDADES_PLACA', BuscarUnidadPorPlaca);
router.post('/', [
    (0, express_validator_1.check)('UNIDADES_PLACA', 'La placa del vehículo es obligatoria e irrepetible.').not().isEmpty(),
    (0, express_validator_1.check)('UNIDADES_NUMERO', 'El número de unidad es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('UNIDADES_COLOR', 'El color es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('UNIDADES_MATRICULA', 'La matrícula es obligatoria.').not().isEmpty(),
    (0, express_validator_1.check)('UNIDADES_ANO', 'El año es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('ESTABLECIMIENTO_ID', 'El ID del establecimiento es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)('USUARIO_DNI', 'El DNI del usuario es obligatorio.').not().isEmpty(),
], CrearUnidad);
router.put('/:UNIDADES_PLACA', ActualizarUnidad);
router.delete('/:UNIDADES_PLACA', DesactivarUnidad);
