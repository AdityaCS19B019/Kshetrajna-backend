const express = require('express')
const router = express.Router()
const Modelusage = require('../../models/Modelusage')
const models = require('../../models/Models')
// const Models = require('../../models/')

router.put('/useModel' , async (req,res) => {
    var consultantid = req.body.consultantid
    var modelid =  req.body.modelid
    var consultantname = req.body.consultantname
    var modelprice = req.body.modelprice
    var modelbuilderid = req.body.modelbuilderid
    if(consultantid == null || !modelid == null || consultantname == null || modelbuilderid == null || modelprice == null)
    {
        res.status(400).json({
            "error" : "missed req body"
        })
    }
    else
    {
        var newmodelentry = await Modelusage({
            consultantid : consultantid,
            modelid : modelid,
            consultantname : consultantname,
            usageprice : modelprice,
            modelbuilderid : modelbuilderid
        })
        try{
            newmodelentry.save()
            res.status(201).json({
                "status" : "success",
            })
        }
        catch(e){
            console.log(e)
            res.status(300).json({
                "status" : "failed"
            })
        }
    }
})

router.get('/' , async (req,res) => {
    var response = await models.find()
    res.status(200).send(response)
})

module.exports = router