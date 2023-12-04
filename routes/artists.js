const { Router } = require('express')

const { getArtists, createArtist, modifyArtist, deleteArtist } = require('../controllers/artists')

const router = Router()

/**
 * #: {{url}}/api/artists
 */

//  Obtener todas los artists - publico
router.get('/', getArtists)

router.post('/', [
], createArtist)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
], modifyArtist)

router.delete('/:id', [
], deleteArtist)

module.exports = router
