const { response, request } = require('express');


const usuariosGet = (req,res)=>{
    const {q, nombre, apikey} = req.query;
    res.json({
        msg:'get api -controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req,res)=>{

    const {nombre, edad} = req.body;

    res.json({
        msg:'post api -controlador',
        nombre,
        edad
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