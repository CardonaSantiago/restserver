

const { response } = require("express");
const { subirArchivo } = require("../helpers");


const cargarArchivo = async(req, res =  response)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg: 'No archivos que subir'});
    return;
    }

    const nombre = await subirArchivo(req.files);

    res.json({
        msg: nombre
    })
     
}



module.exports  ={
    cargarArchivo 
}