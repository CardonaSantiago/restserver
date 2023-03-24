const { response, request } = require('express');

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

    const body = req.body;

    const usuario = new Usuario(body);

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