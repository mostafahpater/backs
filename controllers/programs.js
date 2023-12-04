const { request, response, NextFuncion } = require('express')
const { Program } = require('../models')

const seePrograms = async (req = request, res = response, next = NextFuncion) => {
  console.log('obtener programas')

  try {
    // const {limite = 10, desde = 0} = req.query;
    const query = { enabled: true }

    const [programs] = await Promise.all([
      Program.find(query)
    ])
    res.status(200).json(programs)

  // console.debug({ programs })
  } catch (err) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: err.stack
    })
  }
}

const createProgram = async (req, res = response) => {
  try {
    const body = req.body
    console.log('crear programa')
    console.log({ body })

    const programa = new Program(body)
    console.log({ programa })

    // Guardar en DB
    const nuevoPrograma = await programa.save()
    console.debug({ nuevoPrograma })

    res.status(200).json(nuevoPrograma)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const modifyProgram = async (req, res = response) => {
  try {
    const { id } = req.params
    const { body } = req

    console.info({ body }, { id })
    await Program.findByIdAndUpdate(id,
      {
        name: body.name,
        description: body.description,
        artist: body.artist
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
          console.log('Updated Program : ', docs)
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

const deleteProgram = async (req, res = response) => {
  try {
    const { id } = req.params
    console.log('delete')

    const program = await Program.findByIdAndUpdate(id, { enabled: false })
    console.log({ program })

    res.status(200).json(program)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

module.exports = {
  seePrograms,
  createProgram,
  modifyProgram,
  deleteProgram
}
