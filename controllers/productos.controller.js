const Producto =  require("../models/producto");


//TODO: Crear el controlador de los productos


//Obtener todos los productos
const ObtenerProductos =  async(req, res)=>{

    const {limit = 5, desde = 0} = req.query;

    const query = { estado:true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .skip(Number(desde))
        .limit(Number(limit))
        .populate("usuario","nombre")
        .populate("categoria","nombre")
    ])
    res.json({
        total,
        productos
    });
}
//Obtener un producto

const ObtenerProducto = async(req, res)=>{
    const { id }  = req.params;
    const producto = await Producto.findById( id )
                            .populate("usuario", "nombre")
                            .populate("categoria","nombre");

    if(!producto){
        console.log(producto);
        return res.status(400).json({
            msg:`El producto no existe`
        });
    }

    res.json({
        producto
    });
}

//Crear un producto
const CrearProducto = async(req,res)=>{
    const {estado, usuario, ...body} = req.body;

    const nombre =  body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({nombre});

    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${ productoDB.nombre }, ya existe`
        });
    }

    //Genero la data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }

    const producto = new Producto(data);

    // guardar producto

    await producto.save();

    res.status(201).json(producto);
}

//Actualizar un producto

const ActualizarProducto= async(req, res)=>{
    
    const { id }  = req.params;
    const {estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data, {new:true});

    res.json(producto)
     

}

//Borrar un producto

const BorrarProducto = async(req,res)=>{

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg:"producto borrado"
    })
}

//exportar modulos

module.exports = {
    CrearProducto,
    ObtenerProductos,
    ObtenerProducto,
    ActualizarProducto,
    BorrarProducto
}