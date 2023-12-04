const { response } = require('express')
const { Artist } = require('../models')

const getArtists = async (req, res = response) => {
  try {
    console.log('obtener artistas')
    // console.log(req)

    const query = { enabled: true }
    const [artists] = await Promise.all([
      Artist.find(query)
    ])
    console.debug(artists)
    res.status(200).json(artists)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const createArtist = async (req, res = response) => {
  try {
    const body = req.body
    console.log('crear artista')

    const artist = new Artist(body)

    // Guardar en DB
    const newArtist = await artist.save()
    console.debug({ newArtist })

    res.status(200).json(newArtist)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const modifyArtist = async (req, res = response) => {
  try {
    const { id } = req.params
    const { body } = req

    console.info({ body }, { id })
    await Artist.findByIdAndUpdate(id,
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
          console.log('Updated Artist : ', docs)
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

const deleteArtist = async (req, res = response) => {
  try {
    const { id } = req.params
    console.log('delete artist')

    const artist = await Artist.findByIdAndUpdate(id, { enabled: false })
    console.log({ artist })

    res.status(200).json(artist)
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

module.exports = {
  getArtists, createArtist, modifyArtist, deleteArtist

}
