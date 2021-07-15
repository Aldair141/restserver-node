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

module.exports = {
    rolValido,
    correoExiste
}