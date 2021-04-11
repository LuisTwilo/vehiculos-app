const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        max:255
    },
    plate : {
        type: String,
        required: true, 
        max: 6,
        unique: true
    },
    station:{
        type: String,
        required: true,
        max:255,
    },
    _state: {
        type: String,
        required: true, 
        max: 255,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Vehicle', vehicleSchema);