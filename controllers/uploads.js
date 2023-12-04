/* eslint-disable camelcase */
const { response } = require('express')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { Program, Event, Artist, Organizer } = require('../models')

const uploadAudio = async (req, res = response) => {
  console.log('subir audio')

  const { id } = req.params
  console.info({ id })
  console.log(req.files)
  let model
  try {
    model = await Program.findById(id)
    if (!model) {
      return res.status(400).json({
        msg: `No existe un programa con el id ${id}`
      })
    }

    const { tempFilePath } = req.files.audioFile
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath,
      {
        resource_type: 'auto',
        eager: [
          { audio_codec: 'mp3', bit_rate: '64k' }
        ],
        eager_async: true,
        public_id: 'programs/prueba'
      })
    console.info(secure_url)

    model.audio = secure_url
    await model.save()
    res.status(200).json({
      // uri: secure_url,
      msg: 'Subido correctamente'
    })
  } catch (error) {
    console.info(error)
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

const uploadImage = async (req, res = response) => {
  console.log('subir imagen')

  const { id, collection } = req.params
  console.info({ id })
  console.log(req.files)
  let model
  try {
    model = await Program.findById(id)
    switch (collection) {
      case 'programs':
        model = await Program.findById(id)
        break
      case 'events':
        model = await Event.findById(id)
        break
      case 'artists':
        model = await Artist.findById(id)
        break
      case 'organizers':
        model = await Organizer.findById(id)
        break
      // case 'users':
      //   model = await User.findById(id)
      //   break
      default:
        return res.status(400).json({ msg: 'No enviamos una coleccion' })
    }
    if (!model) {
      return res.status(400).json({
        msg: `No existe un el id: ${id}, que buscamos para postear la imagen `
      })
    }

    const { tempFilePath } = req.files.imageFile
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath,
      {
        resource_type: 'auto',
        eager: [
          { audio_codec: 'mp3', bit_rate: '64k' }
        ],
        eager_async: true,
        public_id: `${collection}`
      })
    console.info(secure_url)

    model.img = secure_url
    await model.save()

    res.status(200).json({
      // uri: secure_url,
      msg: 'Subida correctamente'
    })
  } catch (error) {
    console.info(error)
    res.status(404).send({
      success: false,
      message: 'error interno del servidor, intenta de nuevo mas tarde',
      stack: error.stack
    })
  }
}

// const actualizarImagenCloudinary = async (req, res = response) => {
//   console.log('actualizar img')

//   const { id, coleccion } = req.params
//   console.info({ id }, { coleccion })

//   let modelo

//   switch (coleccion) {
//     case 'usuarios':
//       modelo = await Usuario.findById(id)
//       if (!modelo) {
//         return res.status(400).json({
//           msg: `No existe un usuario con el id ${id}`
//         })
//       }
//       break
//     case 'eventos':
//       modelo = await Evento.findById(id)
//       console.info({ modelo })
//       if (!modelo) {
//         return res.status(400).json({
//           msg: `No existe un evento con el id ${id}`
//         })
//       }
//       break
//     default:
//       return res.status(500).json({ msg: 'Se me olvidó validar esto' })
//   }

//   // Limpiar imágenes previas
//   if (modelo.img) {
//     const nombreArr = modelo.img.split('/')
//     const nombre = nombreArr[nombreArr.length - 1]
//     const [public_id] = nombre.split('.')
//     cloudinary.uploader.destroy(public_id)
//   }

//   const { tempFilePath } = req.files.file
//   const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
//   modelo.img = secure_url

//   await modelo.save()

//   res.status(200).json({
//     uri: secure_url,
//     msg: 'Subido correctamente'
//   })
// }

module.exports = {
  uploadAudio,
  uploadImage
}
