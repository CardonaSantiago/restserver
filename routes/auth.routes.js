const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar.campos');
const { esRoleValido, EmailExiste, ExisteUsuarioPorId } = require('../helpers/db-validators');

const { login, googleSignIn } = require('../controllers/auth.controller');


const router = Router();


router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').notEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','el id_token es necesario').notEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;