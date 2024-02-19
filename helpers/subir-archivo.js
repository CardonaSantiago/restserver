const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = (files, extensionesPermitidas = ['png','jpg','jpeg','gif'],carpeta = '')=>{

    return new Promise((resolve, reject)=>{
        const { archivo } = files;

        const nombreCortado =  archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1]


        // validar extension

        if(!extensionesPermitidas.includes(extension)){

            return reject(`La extension ${ extension } no esta permitida, ${extensionesPermitidas}`)
        }

        const nombreTemporal =  uuidv4()+'.'+extension;

        
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemporal);

        archivo.mv(uploadPath, function(err) {
        if (err) {
            reject(err);
        }

        resolve(nombreTemporal);
        });    
    })

    
    
}


module.exports = {
    subirArchivo
}