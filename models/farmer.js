const mongoose = require('mongoose')

const farmerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    state:{
        type:String,
        requied:true
    },
    
})

module.exports = mongoose.model('Farmer' , farmerSchema)