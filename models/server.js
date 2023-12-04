const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const handleErrors = require('../middlewares/errors')

// dbConnection => conexion con el server Moongose
const { dbConnection } = require('../database/config')

class Server {
  constructor () {
    // console.log("construccion del server")

    this.app = express()
    this.port = process.env.PORT

    this.paths = {
      // auth: '/api/auth',
      // admin: '/api/admin',
      // usuarios: '/api/usuarios',
      programs: '/api/programs',
      events: '/api/events',
      artists: '/api/artists',
      organizers: '/api/organizers',
      uploads: '/api/uploads'
    }

    // Conectar a base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi aplicación
    this.routes()

    // manejo de errores
    this.app.use(handleErrors)
  }

  async conectarDB () {
    await dbConnection()
  }

  // middleware se refiere a un sistema de software que ofrece servicios y funciones comunes
  // en general se encarga de las tareas de gestión de datos, servicios de aplicaciones,
  // mensajería, autenticación y gestión de API.
  middlewares () {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio Público
    this.app.use(express.static('public'))

    // Fileupload - Carga de archivos
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }))
  }

  routes () {
    // cuando viene el path:'/api/eventos' / vamos al route/eventos
    // this.app.use(this.paths.admin, require('../routes/admin'))
    // this.app.use(this.paths.auth, require('../routes/auth'))
    this.app.use(this.paths.programs, require('../routes/programs'))
    this.app.use(this.paths.events, require('../routes/events'))
    this.app.use(this.paths.artists, require('../routes/artists'))
    this.app.use(this.paths.organizers, require('../routes/organizers'))
    this.app.use(this.paths.uploads, require('../routes/uploads'))
    // this.app.use(this.paths.usuarios, require('../routes/usuarios'))

    // Rutas no encontradas
    this.app.use('*', (req, res) => {
      const err = Error(`Requested path ${req.path} not found`)
      res.status(404).send({
        success: false,
        message: `Requested path ${req.path} not found`,
        stack: err.stack
      })
    })
  }

  // listen global
  listen () {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
