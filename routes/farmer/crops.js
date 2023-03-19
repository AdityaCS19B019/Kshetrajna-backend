const express = require('express')
const  mongoose  = require('mongoose')

const router = express.Router()
const Crops = require('../../models/crop')

router.put('/addcrop' , async(req,res) => {
    console.log('request recieved')
    const farmerid = req.body.farmerId
    const cropname = req.body.farm
    const cropseason = req.body.season
    const farmername = req.body.farmername
    const consultantid = req.body.consultantId
    const date = req.body.date
    console.log(date)
    const img = req.body.img
    const soil = req.body.soil
    // console.log(req)
    try{
        const newcrop = Crops({
            farmerid : mongoose.Types.ObjectId(farmerid),
            cropname : cropname,
            cropseason : cropseason,
            farmername : farmername,
            consultantid : mongoose.Types.ObjectId(consultantid),
            startdate : date,
            img : img,
            soil : soil
        })
        newcrop.save()
        res.status(201).json({
            "success" : "true "
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            "success" : "false",
        })
    }
})

router.post('/mycrops' , async (req,res)=> {
    const farmerid = req.body.farmerid
    console.log(req.body)
    try{
        const mycrops = await Crops.find({farmerid : mongoose.Types.ObjectId(farmerid)})
        res.status(200).send(mycrops)
    }catch(e){
        res.status(400).json({
            "success" : "false",
            "error" : e
        })
    }
})

module.exports = router