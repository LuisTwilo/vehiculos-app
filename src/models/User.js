const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        max:255
    },
    lastName: {
        type: String,
        required: true, 
        max: 255
    },
    email:{
        type: String,
        required: true,
        max:255,
        min: 6
    },
    password: {
        type: String,
        required: true, 
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt)
    return hash;
};

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);