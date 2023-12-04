const { Router } = require('express')

const { seePrograms, createProgram, modifyProgram, deleteProgram } = require('../controllers/programs')

const router = Router()

/**
 * #: {{url}}/api/programs
 */

//  Obtener todas las categorias - publico
router.get('/', seePrograms)

router.post('/', [
], createProgram)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
], modifyProgram)

router.delete('/:id', [
], deleteProgram)

module.exports = router
