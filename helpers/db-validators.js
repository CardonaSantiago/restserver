const Categoria = require('../models/categoria');
const producto = require('../models/producto');
const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = '')=>{

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }

}

//verificar si el correo existe

const EmailExiste = async(correo = '')=>{

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        throw new Error (`El correo ${ correo } ya esta registrado`)
    }   
}

const ExisteUsuarioPorId = async(id = '')=>{

    const existeUsuario = await Usuario.findById( id );
    if (!existeUsuario){
        throw new Error (`El id: ${ id } no existe`);
    }   
}


// Validador personalizado de categorias
const existeCategoria = async(id = '')=>{

    const Existecate = await Categoria.findById( id );

    if(!Existecate){
        throw new Error (`El id: ${ id } no existe`);
    }
}


//Validar personalizado de productos

const existeProducto = async(id = '')=>{

    const Existeprod = await producto.findById( id );

    if(!Existeprod){
        throw new Error (`El id: ${ id } no existe`);
    }
}

module.exports = {
    esRoleValido,
    EmailExiste,
    ExisteUsuarioPorId,
    existeCategoria,
    existeProducto
}