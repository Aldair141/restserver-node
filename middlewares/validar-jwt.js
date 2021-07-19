const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
    const value = req.header('x-token');

    if (!value) {
        return res.status(401).json({
            message: 'No ha enviado ningun token'
        });
    }

    try {
        const { name, email } = jwt.verify(value, process.env.SECRET_JWT_SEED);
        req.name = name;
        req.email = email;
    } catch (error) {
        return res.status(401).json({
            message: 'Token no válido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}