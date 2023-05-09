const express = require('express')
const router = express.Router()
const mandi_entry = require('../../models/mandi_entry')
const crops = require('../../models/crop')
const { default: mongoose } = require('mongoose')
router.post('/addentry' , async(req,res) => {
    console.log(req.body)
    const cropid = req.body.cropid
    const quantity = req.body.quantity
    const pitchedprice = req.body.pitchedprice
    
    try{
        const crop = await crops.findOne({_id : mongoose.Types.ObjectId(cropid)})
        const cropname = crop.cropname
        console.log(crop)
        const farmerid = crop.farmerid
        const resp = new mandi_entry({
                                        cropid:cropid , farmerid:mongoose.Types.ObjectId(farmerid) , 
                                        cropid:cropid,cropname:cropname,
                                        quantity:quantity,pitchedprice:pitchedprice , highprice:0 , img : crop.img
                                    })
        const entry = await resp.save()
        res.status(201).json({
            success : true
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            success : false
        })
    }
})

module.exports = router