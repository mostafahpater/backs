const { Schema, model } = require('mongoose')

const OrganizerSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
    // unique: true
  },
  description: {
    type: String,
    required: [true, 'La descripcion es obligatoria']
  },
  img: { type: String, required: false },
  events: {
    type: [Schema.Types.ObjectId],
    ref: 'Event',
    required: false
  },
  enabled: { type: Boolean, default: false }
})

OrganizerSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject()
  return data
}

module.exports = model('Organizer', OrganizerSchema)
