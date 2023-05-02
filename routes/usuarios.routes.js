const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar.campos');
// const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');
// const { validarJWT } = require('../middlewares/validar-jwt');

const {validarCampos,validarJWT,esAdminRol,tieneRol} = require('../middlewares/index')

const { esRoleValido, EmailExiste, ExisteUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');


const router = Router();

router.get('/',usuariosGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut);

router.post('/',[
    check('nombre','el nombre es obligatorio').notEmpty(),
    check('password','el password es obligatorio y mas de 6 letras').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( EmailExiste ),
    //check('rol','No es un rol permitido').isIn(['Admin_Rol','User_Rol']),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    validarJWT,
    // esAdminRol, // middleware que fuerza al usuario a ser admin
    tieneRol('Admin_rol', 'Ventas_rol'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(ExisteUsuarioPorId),
    validarCampos
],usuariosDelete);

router.patch('/',usuariosPatch);

module.exports = router;