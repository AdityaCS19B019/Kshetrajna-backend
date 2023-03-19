const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()

const Model = require('../../models/Models')
const Modelusage = require('../../models/Modelusage')

router.put('/addModel' , async(req,res)=>{
    const modelname = req.body.modelname
    const modelbuilderid = req.body.modelbuilderid
    const modeldesc = req.body.modeldesc
    const githublink = req.body.githublink
    const modelprice = req.body.modelprice
    if(modelname == null || modelbuilderid == null || modeldesc == null || githublink == null)
    {
        res.status(401).json({
            "status" : "failed"
        })
    }
    else
    {
        var newmodel = await Model({
            modelname : modelname,
            modelbuilderid : mongoose.Types.ObjectId(modelbuilderid),
            modeldesc : modeldesc,
            githublink : githublink,
            modelprice : modelprice,
        })
        try{
            newmodel.save()
            res.status(201).json({
                "status" : "success"
            })
        }
        catch(e){
            console.log(e)
            res.status(401).json({
                "status" : "failed"
            })
        }
    }
})


router.get('/mymodelbilling' , async (req,res) => {
    const modelbuilderid = req.body.modelbuilderid
    if(modelbuilderid == null)
    {
        res.status(400).json({
            "error" : "missed parameter"
        })
    }
    else
    {
        try{
            const response = await Modelusage.aggregate([
                {
                    $match : {modelbuilderid : mongoose.Types.ObjectId(modelbuilderid)},
                },
                {
                    $group : {_id : {Modelid : "$modelid"} , total_price : {$sum : "$usageprice"} , usagecount : {$sum : 1}}
                }
            ])
            res.status(200).send(response)
        }catch(e)
        {
            console.log(e)
            res.status(400).json({
                "status" : "failed to retrive"
            })
        }
    }
})

module.exports = router