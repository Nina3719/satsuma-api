const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const restaurantSchema = new Schema({
    id: {type: String, unique: true},
    appointments: [{
        userId: {type: Schema.ObjectId, ref: 'User'},
        time: Date,
    }]
  }, 
  {
    toObject: { getters: true },
    timestamps: {
        createdAt: 'createdDate',
        updatedAt: 'updatedDate'
    },
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant