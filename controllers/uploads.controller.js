

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario,Producto } =require('../models');

const cargarArchivo = async(req, res =  response)=>{

    try {
        const nombre = await subirArchivo(req.files,['txt','md'],'textos');

    res.json({
        msg: nombre
    })    
    } catch (msg) {
      res.status(400).json({msg});
    }

    
     
}


const actualizarImagen = async (req,res)=>{
    
    const{id,coleccion}=req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un usuario con el id ${id}`
                })
            }

            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if(!modelo){
                return res.status(400).json({
                    msg:`no existe un producto con el id ${id}`
                })
            }

            break;
    
        default:
            return res.status(500).json({msg: 'se me olvido validar esto'});
            break;
    }

    const nombre = await subirArchivo(req.files,undefined,coleccion);

    modelo.img = nombre;

    await modelo.save();



    res.json({
        modelo
    })
} 



module.exports  ={
    cargarArchivo,
    actualizarImagen
}