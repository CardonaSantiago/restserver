const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario,Producto } =require('../models');
const { model } = require("mongoose");

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


    //Limpiar imagenes previas

    if(modelo.img){

        //Hay que borrar la imagen del servidor
        
        pathImagen = path.join( __dirname,'../uploads',coleccion, modelo.img); 
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
        
    }

    const nombre = await subirArchivo(req.files,undefined,coleccion);

    modelo.img = nombre;

    await modelo.save();



    res.json({
        modelo
    })
}

const mostrarImagen = async(req,res)=>{

    const {id, coleccion} = req.params;

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


    //Limpiar imagenes previas

    if(modelo.img){

        //Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname,'../uploads',coleccion, modelo.img); 
        if(fs.existsSync(pathImagen)){
            return res.sendFile( pathImagen);
        }
        
    }

    //Si no hay imagen
    const noImage = path.join(__dirname, '../assets/no-image.jpg');

    return res.sendFile(noImage);
}



module.exports  ={
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}