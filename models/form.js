const mongoose = require('mongoose')

const schema = mongoose.Schema({
    questions : {
        type : mongoose.Schema.Types.Array,
        required : true
    },
    createdat : {
        type : Date,
        default : Date.now()
    }
    // responses : {
    //     type : mongoose.Schema.Types.Array,
    //     required : true
    // }
})

module.exports = mongoose.model("forms" , schema)