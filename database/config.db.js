const mongoose = require('mongoose');

const dbconnection = async()=>{
    try {

       await mongoose.connect(process.env.MONGODB_CNN);
       console.log("base de datos online");

        
    } catch (error) {
        throw new Error('Error a la hora de inicializar la base de datos');
    }
}


module.exports={
    dbconnection
}

