const mongoose = require('mongoose')

const schema = mongoose.Schema({
    modelname : {
        type: String,
        requried : true
    },
    modeldesc : {
        type: mongoose.Schema.Types.String,
        required : true
    },
    githublink : {
        type : String,
        required : true
    },
    uploadeddate : {
        type : Date,
        default : Date.now(),
    },
    modelprice : {
        type : Number,
        default : 0,
    },
    modelbuilderid: {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model("Models" , schema)