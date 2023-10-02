"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const Index_2 = require("../Middlewares/Index");
const { BuscarUsuarios, BuscarUsuarioPorDNI, CrearUsuario, ActualizarUsuario, DesactivarUsuario } = Index_1.Usuario;
const { validarCampos, validarRepetidoUsuarios } = Index_2.funciones;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', BuscarUsuarios);
router.get('/:USUARIO_DNI', BuscarUsuarioPorDNI);
router.post('/', [
    (0, express_validator_1.check)('USUARIO_DNI', 'La cédula de usuario es obligatoria e irrepetible.').not().isEmpty(), validarCampos, validarRepetidoUsuarios
], [(0, express_validator_1.check)('USUARIO_EMAIL', 'El email es obligatorio.').not().isEmpty(), validarCampos], [(0, express_validator_1.check)('USUARIO_PASSWORD', 'La contraseña es obligatoria.').not().isEmpty(), validarCampos], [(0, express_validator_1.check)('USUARIO_NOMBRE', 'El nombre es obligatorio.').not().isEmpty(), validarCampos], CrearUsuario);
router.put('/:USUARIO_DNI', ActualizarUsuario);
router.delete('/:USUARIO_DNI', DesactivarUsuario);
