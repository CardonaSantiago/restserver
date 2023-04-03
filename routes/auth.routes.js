const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar.campos');
const { esRoleValido, EmailExiste, ExisteUsuarioPorId } = require('../helpers/db-validators');

const { login } = require('../controllers/auth.controller');


const router = Router();


router.post('/',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').notEmpty(),
    validarCampos
], login);


module.exports = router;