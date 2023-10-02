"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const { BuscarRoles, BuscarRolPorID, CrearRol, ActualizarRol, DesactivarRol, } = Index_1.Rol;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', BuscarRoles);
router.get('/:ROL_ID', BuscarRolPorID);
router.post('/', [
    (0, express_validator_1.check)('ROL_DESCRIPCION', 'La descripción del rol es obligatoria.').not().isEmpty(),
], CrearRol);
router.put('/:ROL_ID', ActualizarRol);
router.delete('/:ROL_ID', DesactivarRol);
