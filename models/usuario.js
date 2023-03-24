

const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String       
    },
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['Admin_Role','User_Rol']
    },
    estado:{
        type: boolean,
        default: true
    },
    google:{
        type: boolean,
        default: false
    },

})


module.exports = model('Usuario',UsuarioSchema);