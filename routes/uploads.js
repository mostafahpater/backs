const { Router } = require('express')

// const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { uploadAudio, uploadImage } = require('../controllers/uploads')
// const { coleccionesPermitidas } = require('../helpers');

const router = Router()

router.post('/programs/:id',
  // validarArchivoSubir,
  uploadAudio)

router.post('/img/:collection/:id',
  // validarArchivoSubir,
  uploadImage)

module.exports = router
