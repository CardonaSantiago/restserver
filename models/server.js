const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        //PROPERTIES
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();
        //Rutas de mi app
        this.routes();
    }

    //Middleware
    middlewares(){
        //CORS
        this.app.use(cors());
        //Parseo y lectura del body

        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }

    //ROUTES

    routes(){
        
        this.app.use(this.usuariosPath,require('../routes/usuarios.routes'))
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`app listening at http://localhost:${this.port}`);
        });
    }



}


module.exports = Server;
