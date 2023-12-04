const { Schema, model } = require('mongoose')

const ArtistSchema = Schema({
  name: {
    type: String
    // required: [true, 'El nombre es obligatorio'],
    // unique: true
  },
  description: {
    type: String
    // required: [true, 'La descripcion es obligatoria']
  },
  img: {
    type: String,
    default: ''
  },
  programs: {
    type: [Schema.Types.ObjectId],
    ref: 'Programa',
    required: false,
    default: []
  },
  enabled: { type: Boolean, default: false }
})

ArtistSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Artist', ArtistSchema)
