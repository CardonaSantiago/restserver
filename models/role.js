const { Schema, model } = require('mongoose'); 

const RoleSchema = Schema({
    rol:{
        type: String,
        default: 'User_rol',
        enum: ['Admin_rol', 'User_rol'],
        required: [true, 'El rol es obligatorio'],
    }
})


module.exports = model( 'Role', RoleSchema);