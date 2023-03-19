const mongoose = require('mongoose')

const schema = mongoose.Schema({
    responses : {
        type : mongoose.Schema.Types.Array,
        required : true
    },
    cropid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    submitteddate : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("farmerresponses" , schema)