const { response } = require('express');

const esAdminRol = (req, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token primero'
        });
    }
    const {rol, nombre} = req.usuario;

    if(rol!== 'Admin_rol'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - NO PUEDE HACER ESTO`
        });
    }

    next();
}

module.exports = {
    esAdminRol
}