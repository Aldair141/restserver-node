const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');
const { enviarCorreo } = require('../helpers/validation-database');

const usuariosGET = async(req = request, res = response) => {

    //query
    const query = { estado: true };
    const { limite = 2, desde = 0 } = req.query;

    //Si ambas consultas no dependen del otro, no es necesario que se esperen
    //Usar una función que ejecute las promesas en paralelo
    //Desestructuración de arreglos
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPOST = async(req = request, res = response) => {
    //Efectuar registro de usuario
    const { nombre, email, password, img, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        email,
        password,
        img,
        rol
    });

    const salt = bcryptjs.genSaltSync();
    const claveHash = bcryptjs.hashSync(password, salt);
    usuario.password = claveHash;

    usuario.save();

    //Enviar correo
    await enviarCorreo(email).catch((err) => {
        console.log('Error:', err);
    }).then(() => {
        console.log('Correo enviado satisfactoriamente.');
    });

    res.json({
        usuario
    });
}

const usuariosPUT = async(req = request, res = response) => {
    const { id } = req.params;
    const { __v, _id, estado, google, password, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        const claveHASH = bcryptjs.hashSync(password, salt);
        resto.password = claveHASH;
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        usuario
    });
}

const usuariosDELETE = async(req = request, res = response) => {
    const { id } = req.params;

    //Eliminación física
    const usuario = await Usuario.findByIdAndDelete(id);

    res.json({
        message: 'Llamando al método DELETE',
        usuario
    });
}

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosDELETE
}