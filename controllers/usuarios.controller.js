const { response } = require('express');


const usuariosGet = (req,res)=>{
    res.json({
        msg:'get api -controlador'
    });
}

const usuariosPost = (req,res)=>{
    res.json({
        msg:'post api -controlador'
    });
}

const usuariosPut = (req,res)=>{
    res.json({
        msg:'put api -controlador'
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