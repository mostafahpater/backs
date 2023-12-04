const { response } = require('express')
const { Organizer } = require('../models')

const getOrganizers = async (req, res = response) => {
  try {
    console.log('obtener organizadores')
    const query = { enabled: true }

    const [organizers] = await Promise.all([
      Organizer.find(query)
    ])

    res.status(200).json(organizers)
  } catch (error) {
    console.info(error)
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const createOrganizer = async (req, res = response) => {
  try {
    const body = req.body
    console.log('crear organizador')
    console.log({ body })

    const organizer = new Organizer(body)
    console.log({ organizer })

    // Guardar en DB
    const newOrganizer = await organizer.save()
    console.debug({ newOrganizer })

    res.status(200).json(newOrganizer)
  } catch (error) {
    console.info(error)
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const modifyOrganizer = async (req, res = response) => {
  try {
    const { id } = req.params
    const { body } = req

    console.info({ body }, { id })
    await Organizer.findByIdAndUpdate(id,
      {
        name: body.name,
        description: body.description
      },
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err.response)
          res.status(404).send({
            success: false,
            message: 'error interno del servidor, intenta de nuevo mas tarde',
            stack: err.stack
          })
        } else {
          console.log('Updated Organizer : ', docs)
          res.status(200).json(docs)
        }
      }
    )
  } catch (error) {
    console.info(error)
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const deleteOrganizer = async (req, res = response) => {
  try {
    const { id } = req.params
    console.log('delete Organizer')

    const organizer = await Organizer.findByIdAndUpdate(id, { enabled: false })
    console.log({ organizer })

    res.status(200).json(organizer)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

module.exports = {
  getOrganizers,
  createOrganizer,
  modifyOrganizer,
  deleteOrganizer
}
