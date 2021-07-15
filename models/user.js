//nombre, email, password, img (UNA RUTA POR DEFECTO), estado, google, rol (ADMIN_ROLE, USER_ROLE)
const { model, Schema } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.']
    },
    img: {
        type: String,
        default: 'no-image.jpg'
    },
    rol: {
        type: String,
        //enum: ['ADMIN_ROLE', 'USER_ROLE'],
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);