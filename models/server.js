const express = require('express');
const cors = require('cors');
const { dbconnection } = require('../database/config.db');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        //PROPERTIES
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';
        this.buscarPath = '/api/buscar';
        this.uploadsPath = '/api/cargarArchivo';

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


        //fileUploads - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    //ROUTES

    routes(){
        
        this.app.use(this.authPath,require('../routes/auth.routes'));
        this.app.use(this.usuariosPath,require('../routes/usuarios.routes'));
        this.app.use(this.categoriasPath,require('../routes/categorias.routes'));
        this.app.use(this.productosPath,require('../routes/productos.routes.js'));
        this.app.use(this.buscarPath, require('../routes/buscar.routes.js'));
        this.app.use(this.uploadsPath,require('../routes/uploads.routes'));
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`app listening at http://localhost:${this.port}`);
        });
    }



}


module.exports = Server;