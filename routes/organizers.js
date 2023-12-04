const { Router } = require('express')

// const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const {
  getOrganizers, createOrganizer, modifyOrganizer, deleteOrganizer
} = require('../controllers/organizers')

// const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router()

/**
 * #: {{url}}/api/organizers
 */

//  Obtener todos los organizadores - publico
router.get('/', getOrganizers)

router.post('/', [
], createOrganizer)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
], modifyOrganizer)

router.delete('/:id', [
], deleteOrganizer)

module.exports = router
