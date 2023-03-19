const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors');
const Consultant = require('./models/consultant')

const farmerconnectionsrouter = require('./routes/farmer/connections')
const farmerworkflowrouter = require('./routes/farmer/workflow')
const farmercropsrouter = require('./routes/farmer/crops')
const consultantconnectionsrouter = require('./routes/consultant/connections')
const consultantmodelrouter = require('./routes/consultant/Models')
const consultantworkflowrouter = require('./routes/consultant/workflow')
const consultantcropsrouter = require('./routes/consultant/crops')
const modelbuilderconnectionsrouter = require('./routes/modelbuilder/connections')
const modelbuildermodelsrouter = require('./routes/modelbuilder/models')
const app = express()
app.use(cors())
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/dev2')
app.listen(5000)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/farmer/connections' , farmerconnectionsrouter)
app.use('/api/farmer/workflow' , farmerworkflowrouter)
app.use('/api/farmer/crops' , farmercropsrouter)
app.use('/api/consultant/connections' , consultantconnectionsrouter)
app.use('/api/consultant/model' , consultantmodelrouter)
app.use('/api/consultant/workflow' , consultantworkflowrouter)
app.use('/api/consultant/crops' , consultantcropsrouter)
app.use('/api/modelbuilder/connections' , modelbuilderconnectionsrouter)
app.use('/api/modelbuilder/models' , modelbuildermodelsrouter)
app.set('view engine' , 'ejs')

app.get('/' , (req ,res) => {
    res.render('add_consultant')
})

app.post('/add' , async (req,res) => {
    let consultant = new Consultant({
        name: req.body.name,
        state: req.body.state,
        rating: req.body.rating
    })

    try{
        let consultant_id = await consultant.save()
        res.redirect('/')
    }catch(e)
    {
        console.log(e)
        res.redirect('/')
    }
})