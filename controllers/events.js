const { response } = require('express')
const { Event } = require('../models')

const getEvents = async (req, res = response) => {
  try {
    console.log('obtener eventos')

    // const {limite = 10, desde = 0} = req.query;
    const query = { enabled: true }

    const [events] = await Promise.all([
      Event.find(query)
    ])
    console.debug({ events })
    res.status(200).json(events)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const createEvent = async (req, res = response) => {
  try {
    const body = req.body
    console.log('crear evento')
    console.log({ body })

    // Guardar en DB
    const event = new Event(body)
    const newEvent = await event.save()
    console.debug({ newEvent })

    res.status(200).json(newEvent)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const modifyEvent = async (req, res = response) => {
  try {
    const { id } = req.params
    const { body } = req

    console.info({ body }, { id })

    await Event.findByIdAndUpdate(id,
      {
        name: body.name,
        description: body.description,
        organizer: body.organizer
      },
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err.response)
        } else {
          console.log('Updated Event : ', docs)
          res.status(200).json(docs)
        }
      }
    )
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const deleteEvent = async (req, res = response) => {
  try {
    const { id } = req.params
    console.log('delete:', id)

    const event = await Event.findByIdAndUpdate(id, { enabled: false })
    console.debug({ event })
    res.status(200).json(event)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  modifyEvent,
  deleteEvent
}
