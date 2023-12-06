const { response } = require("express");
const Categoria = require("../models/categoria");

//ObtenerCategorias - paginado - total - populate

const ObtenerCategorias = async(req, res)=>{

    const { limite = 5, desde = 0 } =  req.query;

    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("usuario", "nombre")
    ])
    res.json({
        total,
        categorias
    });
    
}

//ObtenerCategoria - populate

const ObtenerCategoria = async(req, res)=>{
    const { id }  = req.params;
    const categoria = await Categoria.findById( id ).populate("usuario", "nombre");

    if(!categoria){
        console.log(categoria);
        return res.status(400).json({
            msg:`La  categoria no existe`
        });
    }

    res.json({
        categoria
    });
}
//crearCategoria

const crearCategoria = async(req,res =response)=>{
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre })
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    //Guardar categoria
    await categoria.save();

    res.status(201).json(categoria);
}

// actualizarCategoria

const actualizarCategoria= async(req, res)=>{
    
    const { id }  = req.params;
    const {estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data, {new:true});

    res.json(categoria)
     

}

//borrarCategoria -  estado: false

const borrarCategoria = async(req,res)=>{

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg:"categoria borrada"
    })
}

module.exports = {
    ObtenerCategorias,
    ObtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}