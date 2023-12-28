const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, tieneRol, esAdminRol } = require('../middlewares');
const { CrearProducto, ObtenerProductos, ObtenerProducto, ActualizarProducto, BorrarProducto } = require('../controllers/productos.controller');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');


const router = Router();


//TODO: RUTAS DE LOS PRODUCTOS

//Obtener todos los productos - publico

router.get('/',ObtenerProductos)


//Obtener un solo producto - publico
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],ObtenerProducto)

// Crear un producto - privado - token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    check('descripcion','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],CrearProducto)

// Actualizar el producto - privado - token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],ActualizarProducto)

// Borrar el producto - privado - token valido - administrador

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],BorrarProducto)


module.exports = router; 