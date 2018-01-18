const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const appointmentSchema = new Schema({
    restId: String,
    userId: String,
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