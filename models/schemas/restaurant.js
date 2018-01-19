const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')


const appointmentSchema = new Schema({
    restId: String,
    userId: {type: Schema.ObjectId, ref: 'User' },
    time: Date
  }, 
  {
    toObject: { getters: true },
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate'
    },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment