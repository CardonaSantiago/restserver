const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');


const usuariosGet = (req,res)=>{
    const {q, nombre, apikey} = req.query;
    res.json({
        msg:'get api -controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = async(req,res)=>{


    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg:'El correo ya esta registrado'
        })
    }

    // encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    // guardar en bd
    await usuario.save();

    res.json({
        msg:'post api -controlador',
        usuario
    });
}

const usuariosPut = (req,res)=>{

    const { id }  = req.params;
    res.json({
        msg:'put api -controlador',
        id
    });
}

const usuariosPatch = (req,res)=>{
    res.json({
        msg:'patch api -controlador'
    });
}

const usuariosDelete = (req,res)=>{
    res.json({
        msg:'Delete api -controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}