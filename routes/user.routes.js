const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { rolValido, correoExiste, usuarioExisteById } = require('../helpers/validation-database');

const {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosDELETE
} = require('../controllers/user.controllers');


const router = Router();

router.get('/', usuariosGET);
router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'Este correo electrónico no es válido.').isEmail(),
    check('password', 'El password debe tener como mínimo 6 caracteres.').isLength({ min: 6 }),
    check('rol').custom(rolValido),
    check('email').custom(correoExiste),
    validarCampos
], usuariosPOST);
router.put('/:id', [
    check('id', 'El id no es válido.').isMongoId(),
    check('id').custom(usuarioExisteById),
    check('rol').custom(rolValido),
    validarCampos
], usuariosPUT);
router.delete('/:id', [
        check('id', 'El id no es válido.').isMongoId(),
        check('id').custom(usuarioExisteById),
        validarCampos
    ],
    usuariosDELETE);

module.exports = router;