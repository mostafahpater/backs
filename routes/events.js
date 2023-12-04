const { Router } = require('express')

const { getEvents, createEvent, modifyEvent, deleteEvent } = require('../controllers/events')

const router = Router()

/**
 * #: {{url}}/api/eventos
 */

//  Obtener todas las categorias - publico
router.get('/', getEvents)

router.post('/', [
], createEvent)

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
], modifyEvent)

router.delete('/:id', [
], deleteEvent)

module.exports = router
