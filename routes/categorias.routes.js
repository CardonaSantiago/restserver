const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRol, esAdminRol } = require('../middlewares');
const { crearCategoria, ObtenerCategorias, ObtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();


//Obtener todas las categorias - publico
router.get('/',ObtenerCategorias);

//Obtener una categoria por id- publico
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],ObtenerCategoria);

//Crear categoria -  privada - Cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],crearCategoria);

//Actualizar categoria -  privada - Cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

//Borrar categoria -  Admin
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],borrarCategoria);
module.exports = router;