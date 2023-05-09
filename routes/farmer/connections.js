const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Consultant = require('../../models/consultant')
const user = require('../../models/user')
const Requests = require('../../models/requests')
const connections = require('../../models/connections')
router.post('/' , async (req,res) => {
    try{
        let consultants = await user.find({role : "Consultant"})
        res.status(200).json({
            consultants : consultants,
            success: "true"
        })
    }catch(e){
        console.log(e)
        res.status(300).json({
            success:"false"
        })
    }
    // console.log('Ji')
    // res.render('farmerconnect' , {consultants:consultants});  
})

router.post('/connect' , async (req,res) => {

    var sender = req.body.sender
    var receiver =  req.body.receiver
    console.log(req.body)
    var connectiontype= 1
    if(sender == null || receiver == null)
    {
        res.status(400).json({
            error : "expeceted request body"
        })
    }
    else
    {
        let request = new Requests({
            sender : sender,
            receiver : receiver,
            connectiontype : connectiontype
        })
    
        try{
            let req = await request.save()
            // console.log('connection sent')
            res.status(201).json({
                data: req,
                success:"true"
            })
            // res.redirect('/connections')
        }catch(e)
        {
            console.log(e)
            res.status(400).json({
                error : "failed inserting"
            })
        }
    }
    // res.send('Sender ' + req.params.sender + ' , Reciever : ' + req.params.reciever)
})

router.post('/getconsultant' , async(req,res) => {
    let farmerid = req.body.farmerid
    if(farmerid == null)
    {
        res.status(400).json({
            "error" : "missed parameters",
            "success" : false
        })
    }
    else
    {
        let consultants = await connections.aggregate([
            {
                $match : {user1 : mongoose.Types.ObjectId(req.body.farmerid)},
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user2",    // field in the orders collection
                    foreignField: "_id",  // field in the items collection
                    as: "consultants"
                 }
            }
        ])
        let consultantname = []
        let consultantid = []
        for(let i = 0 ; i < consultants.length ; i++)
        {
            consultantname.push(consultants[i].consultants[0].firstName)
            consultantid.push(consultants[i].consultants[0]._id.toString())
        }
        // console.log(consultants[0].consultants[0]._id)
        console.log(consultantid)
        console.log(consultantname)
        res.status(200).json({
            "names" : consultantname,
            "ids"   : consultantid,
            "success" : true
        })
    }
})

module.exports = router