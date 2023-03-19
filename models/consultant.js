const mongoose = require('mongoose')

const ConsultantSChema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        default:0
    },

})

module.exports = mongoose.model('Consultant' , ConsultantSChema)