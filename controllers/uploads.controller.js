

const { response } = require("express");
const { subirArchivo } = require("../helpers");


const cargarArchivo = async(req, res =  response)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg: 'No archivos que subir'});
    return;
    }

    try {
        const nombre = await subirArchivo(req.files,['txt','md'],'textos');

    res.json({
        msg: nombre
    })    
    } catch (msg) {
      res.status(400).json({msg});
    }

    
     
}



module.exports  ={
    cargarArchivo 
}