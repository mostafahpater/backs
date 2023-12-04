const { Schema, model } = require('mongoose')

const EventSchema = Schema({
  name: {
    type: String
    // required: [true, 'El nombre es obligatorio'],
    // unique: true
  },
  description: {
    type: String
    // required: [true, 'La descripcion es obligatoria']
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'Organizador'
    // required: true
  },
  img: {
    type: String,
    default: ''
  },
  date: {
    type: Date
    // required: true
  },
  adress: { type: String },
  location: {
    latitude: Number,
    longitude: Number
  },
  habilitado: { type: Boolean, default: false }
})

EventSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Event', EventSchema)
