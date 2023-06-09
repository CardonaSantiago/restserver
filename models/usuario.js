

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
        enum: ['Admin_rol','User_rol','Ventas_rol']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },

});

UsuarioSchema.methods.toJSON = function (params) {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}


module.exports = model('Usuario',UsuarioSchema);