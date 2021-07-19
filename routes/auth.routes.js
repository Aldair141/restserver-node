const { Router } = require('express');
const { loginUsuario, revalidarToken } = require('../controllers/auth.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/', loginUsuario);
router.get('/renew', [
    validarJWT,
    validarCampos
], revalidarToken);

module.exports = router;