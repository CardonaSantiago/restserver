const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { DefaultTransporter } = require('google-auth-library');


const login = async(req, res)=>{

    const {correo, password} =  req.body;


    try {

        //TODO
        //Verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Password no existe - correo'
            });
        }
        //verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Password no existe - estado: false'
            });
        }
        // verificar la constraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Password no existe - password'
            });
        }

        // Generar JWT
        const token =  await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    
}


const googleSignIn = async(req, res) =>{

    const { id_token } = req.body;

    try {

        const {nombre,img,correo} =  await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //Tengo que crear usuario
            const data = {

                nombre,
                correo,
                password: ':p',
                img,
                rol: 'User_rol',
                google: true

            };

            usuario = new Usuario(data);
            await usuario.save();
        }
        // si el usuario en DB tiene estado en false

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar JWT
        const token =  await generarJWT( usuario.id);

        res.json({
            msg:'todo bien!',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {

    login,
    googleSignIn
}