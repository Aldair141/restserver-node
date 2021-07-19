const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const dbUser = await Usuario.findOne({ email });

        if (!dbUser) {
            return res.status(401).json({
                message: 'El correo no existe.'
            });
        }

        const validPassword = bcryptjs.compareSync(password, dbUser.password);

        if (!validPassword) {
            return res.status(401).json({
                message: 'La contraseña no es válida.'
            });
        }

        const jwtToken = await generarJWT(dbUser.nombre, dbUser.email);

        return res.status(202).json({
            token: jwtToken
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Comunicarse con el administrador'
        });
    }
}

const revalidarToken = async(req = request, res = response) => {
    try {
        const jwt = await generarJWT(req.name, req.email);

        return res.json({
            message: 'renew',
            token: jwt
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Comunicarse con el administrador.'
        });
    }

}

module.exports = {
    loginUsuario,
    revalidarToken
}