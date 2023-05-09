const express = require('express')
const Requests = require('../../models/requests')
const connection = require('../../models/connections')
const { findOneAndUpdate } = require('../../models/consultant')
const { default: mongoose } = require('mongoose')
const router = express.Router()

router.post('/requests' , async (req , res) => {
    let reciever = req.body.receiver
    if(reciever == null)
    {
        res.status(400).json({
            "error" : "missed paramters",
            "success" : "false"
        })
    }
    else
    {
        try{
            // let requests = await Requests.find({receiver : mongoose.Types.ObjectId(req.body.receiver)})
            const requests = await Requests.aggregate([
                {
                    $match : {receiver : mongoose.Types.ObjectId(req.body.receiver) , status : "pending"},
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "sender",    // field in the orders collection
                        foreignField: "_id",  // field in the items collection
                        as: "farmers"
                     }
                }
            ])
            res.status(200).json({requests :requests,success:"true"})
        }catch(e)
        {
            console.log(e)
            res.send("Error while fetching")
            // res.send(requests)
        }
    }
})

router.post('/acceptrequest' , async(req,res)=>{
    if(req.body.myid == null || req.body.requesterid == null || req.body.connectiontype == null)
    {
        res.status(400).json({
            "error" : "missed parameters"
        })
    }
    else
    {
        let receiver = mongoose.Types.ObjectId(req.body.myid)
        let sender = mongoose.Types.ObjectId(req.body.requesterid)
        let connectiontype = req.body.connectiontype
        let secondconnectiontype
        let con1 = new connection({
            user1 : receiver,
            user2 : sender,
            connectiontype : connectiontype,
        })
        if(connectiontype === 1)
            secondconnectiontype = 3
        else if(connectiontype === 7)
            secondconnectiontype = 4
        else if(connectiontype === 8)
            secondconnectiontype = 5
        let con2 = new connection({
            user1 : sender,
            user2 : receiver,
            connectiontype : secondconnectiontype
        })
        try{
            let newcon = await con1.save()
            let newcon2 = await con2.save()
            let oldreq = await Requests.findOneAndUpdate({
                                                            receiver : receiver ,
                                                            sender : sender
                                                        } , 
                                                        { 
                                                            status : "accepted",
                                                        },
                                                        {
                                                            new : true,
                                                        })
            res.status(200).json({success:"true"})
        }catch(e){
            console.log(e)
            res.status(400).json({success:"false",error:"failed inserting"})
        }
    }
})

router.post('/modelbuilderrequests' , async(req,res) => {
    let reciever = req.body.reciever
    let requests = await modelbuilderrequests.find({reciever : reciever})
    res.send(requests)
})


module.exports = router