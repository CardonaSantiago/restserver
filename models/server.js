const express = require('express');
const cors = require('cors');
const { dbconnection } = require('../database/config.db');

class Server{

    constructor(){
        //PROPERTIES
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //conectar a BD
        this.conectarDB();

        //Middlewares
        this.middlewares();
        //Rutas de mi app
        this.routes();
    }

    //conectar a base de datos

    async conectarDB(){
        await dbconnection();
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
        
        this.app.use(this.authPath,require('../routes/auth.routes'));
        this.app.use(this.usuariosPath,require('../routes/usuarios.routes'));
        
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`app listening at http://localhost:${this.port}`);
        });
    }



}


module.exports = Server;