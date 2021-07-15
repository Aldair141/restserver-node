const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");

const Usuario = require('../models/user');

const usuariosGET = (req = request, res = response) => {
    res.json({
        message: 'Llamando al método GET'
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
    const transporter = nodemailer.createTransport({
        host: 'mail.dbuhos.com',
        name: 'mail.dbuhos.com',
        port: 465,
        secure: true,
        auth: {
            user: 'contacto@dbuhos.com',
            pass: '@@buhos@@'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.verify((err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log("El servidor está listo para enviar mensajes.");
        }
    });

    await transporter.sendMail({
        from: 'contacto@dbuhos.com',
        to: email, //email de destino
        subject: 'Correo enviado desde node js',
        text: 'Ud. ha sido registrado en nuestra base de datos (nuevo mensaje 3).'
    }, (err, response) => {
        let mensaje = "";
        if (err) {
            mensaje = "Error: " + err;
        } else {
            mensaje = "Correo enviado satisfactoriamente.";
        }
        transporter.close();

        console.log(mensaje);

        res.json({
            message: 'Llamando al método POST',
            usuario
        });
    });
}

const usuariosPUT = (req = request, res = response) => {
    res.json({
        message: 'Llamando al método PUT'
    });
}

const usuariosDELETE = (req = request, res = response) => {
    res.json({
        message: 'Llamando al método DELETE'
    });
}

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosDELETE
}