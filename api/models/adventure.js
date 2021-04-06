const mongoose =require('mongoose');
// const User = require('../models/user')
const autoIncrement = require('mongoose-auto-increment');
//autoIncrement
let connection = mongoose.createConnection("mongodb+srv://airbnb:airbnb@cluster0.qr2xc.mongodb.net/airbnb1",{useUnifiedTopology: true,useNewUrlParser: true});
autoIncrement.initialize(connection);

let adventureSchema= new mongoose.Schema({
    adventureID:{
        type:Number
    },
    place:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{type:mongoose.SchemaTypes.ObjectId ,ref:'User'
    },
    adventureStatus:{
        type:String,
        enum : ['Approve','Decline','Pending'],
        default: 'Pending'
    },
    hostName:{
        type:String
    },
    hostEmail:{
        type:String
    },
    placeImage:{
        type:String
    }

});
adventureSchema.plugin(autoIncrement.plugin,{
    model:'Adventure',
    field:'adventureID',
    startAt:0,
    incrementBy:1
});
module.exports=mongoose.model('Adventure', adventureSchema)