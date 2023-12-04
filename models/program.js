const { Schema, model } = require('mongoose')

const ProgramSchema = Schema({
  name: {
    type: String
    // required: [true, 'El nombre es obligatorio'],
    // unique: true
  },
  description: {
    type: String
    // required: [true, 'La descripcion es obligatoria']
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: false
    // required: [true, 'La descripcion es obligatoria']
  },
  img: {
    type: String
  },
  audio: {
    type: String
    // required: true
  },
  date: {
    type: Date
    // required: true
  },
  duration: {
    type: Number
  },
  enabled: { type: Boolean, default: false }
})

ProgramSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Program', ProgramSchema)
