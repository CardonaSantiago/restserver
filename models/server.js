const express = require('express');

class Server{

    constructor(){
        //PROPERTIES
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();
        //Rutas de mi app
        this.routes();
    }

    //Middleware
    middlewares(){
        //directorio publico
        this.app.use(express.static('public'));
    }

    //ROUTES

    routes(){
        this.app.get('/api',(req,res)=>{
            res.send('Hello world');
        });
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`app listening at http://localhost:${this.port}`);
        });
    }



}


module.exports = Server;