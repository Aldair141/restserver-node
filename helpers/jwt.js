const jwt = require('jsonwebtoken');

const generarJWT = (name, email) => {
    const payload = { name, email };
    const firma = process.env.SECRET_JWT_SEED;

    return new Promise((resolve, reject) => {
        jwt.sign(payload, firma, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}