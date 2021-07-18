const nodemailer = require("nodemailer");

const Role = require('../models/role');
const Usuario = require('../models/user');

const rolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error('Este rol no es válido');
    }
}

const correoExiste = async(email = '') => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error("Este correo electrónico ya se encuentra registrado.");
    }
}

const usuarioExisteById = async(id) => {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
        throw new Error("Este usuario no existe en la BD");
    }
}

const enviarCorreo = async(email) => {
    const transporter = nodemailer.createTransport({
        host: process.env.CORREO_HOST,
        port: process.env.CORREO_PORT,
        secure: true,
        auth: {
            user: process.env.CORREO_AUTH_USER,
            pass: process.env.CORREO_AUTH_PWD
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    await transporter.verify((err, success) => {
        if (err) {
            console.log(err);
        } else {
            console.log("El servidor está listo para enviar mensajes.");
        }
    });


    await transporter.sendMail({
        from: process.env.CORREO_AUTH_USER,
        to: process.env.CORREO_COMERCIAL, //email de destino
        subject: 'Nuevo usuario registrado en Sistema',
        text: `El usuario ${ email } ha sido registrado en nuestra base de datos.`
    });
}

module.exports = {
    rolValido,
    correoExiste,
    usuarioExisteById,
    enviarCorreo
}