const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');


const usuariosGet = async (req,res)=>{
    //const {q, nombre="No name", apikey} = req.query;

    const { limite = 5, desde = 0 } =  req.query;

    const query = { estado: true };
    /*
    const usuarios = await Usuario.find( query )
        .skip(Number(desde))
        .limit(Number(limite));

    const total = await Usuario.countDocuments( query );
    */
    // forma mas rapida ya que ejecuta los 2 de una vez
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req,res)=>{

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

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

const usuariosPut = async (req,res)=>{

    const { id }  = req.params;
    const {_id, password, google, correo, ...resto } = req.body; 

    if ( password ) {

        // encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );


    res.json(usuario);
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