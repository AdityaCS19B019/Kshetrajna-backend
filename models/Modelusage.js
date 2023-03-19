const mongoose = require('mongoose')

const schema = mongoose.Schema({
     consultantid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
     },
     modelid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
     },
     consultantname : {
        type : String,
        required : true,
     },
     usageprice : {
        type : mongoose.Schema.Types.Number,
        reuqired : true,
     },
     dateofusage : {
        type : mongoose.Schema.Types.Date,
        default : Date.now(),
     } ,
     modelbuilderid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
     }
})

module.exports = mongoose.model("Modelusage" , schema)