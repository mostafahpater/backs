require('dotenv').config()
const Server = require('./models/server')

const server = new Server() // nuevo server

server.listen()
