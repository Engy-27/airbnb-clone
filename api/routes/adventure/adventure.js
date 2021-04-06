const express = require('express');
const router = express.Router();
const adventure=require('../../models/adventure');
const multer  = require('multer');
const { json } = require('body-parser');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'_'+file.originalname)
    }
});
const upload=multer({storage:storage});

//upload photo
router.put('/photo/:id',upload.single('placeImage'),(req,res)=>{
    let id =req.params.id
    console.log(id)
    let fileUrl = req.file.path.replace(/\\/g, "").substring(`uploads`.length).split('_')[1]
    console.log(fileUrl)
    adventure.findOneAndUpdate({adventureID:id},{placeImage:fileUrl},{new:true},(err,adventure)=>{
        if(err){
            res.json({
                data:null,
                authorized:false,
                message:"Can't update your image",
                success:false,

            })
        }else{
            res.json({
                data:adventure,
                authorized:true,
                message:"successfully updated your image",
                success:true
            })
        }
    })
});

//make adventure
router.post('/',(req,res)=>{
    adventure.create({
        place:req.body.place,
        description:req.body.description,
        createdBy:req.user.id,
        hostName:req.user.firstName,
        hostEmail:req.user.email,
        adventureStatus:"Pending",
    },(err,adventure)=>{
        if(err){
            res.json({
                data:null,
                authorized:false,
                message:"Can't add adventure",
                success:false
            })
        }else{
            res.json({
                data:adventure,
                authorized:true,
                message:'Successfully added adventure',
                success:true
            })
        }
    })
});

//get all user adventures
router.get("/userAdventure",(req,res)=>{
    adventure.find({createdBy:req.user.id},(err,adventure)=>{
        if(err)
        {
            res.json({
                data:null,
                authorized:false,
                message:"Can't get any adventure",
                success:false

            })
        }
        else 
        {
            res.json({
                data:adventure,
                authorized:true,
                message:"we got your adventures",
                success:true
            })        
        }
    
    })

})


//get all adventures
router.get('/allAdventures',(req,res)=>{
    adventure.find({},(err,adventures)=>{
        if(err){
            res.json({
                data:null,
                authorized:false,
                message:"can't get any adventures",
                success:false
            })
        }else{
            res.json({
                data:adventures,
                authorized:true,
                message:"Successfully get adventures",
                success:true
            })
        }
    })
});


//edit specific adventure
router.put("/:id",(req,res)=>{
    let id=req.params.id;
    adventure.findOneAndUpdate({adventureID:id},req.body,{new:true},
        (err,adventure)=>{
            if(err)
            {
                res.json({
                    data:null,
                    authorized:false,
                    message:"can't update your adventure",
                    success:false
                })
            }
            else
            {
            res.json({
                data:adventure,
                authorized:true,
                message:"we updated your adventure",
                success:true
            })}


        })
})

//get specific adventure
router.get("/:id",(req,res)=>{
    let id=req.params.id;
    adventure.findOne({adventureID:id},(err,adventure)=>{
        if(err)
            {
                res.json({
                    data:null,
                    authorized:false,
                    message:"can't get your adventure",
                    success:false
                })
            }
            else
            {
            res.json({
                data:adventure,
                authorized:true,
                message:"we got your adventure",
                success:true
            })}
    })
})

//delete specific adventure
router.delete("/:id",(req,res)=>{
    let id=req.params.id;
    adventure.findOneAndDelete({adventureID:id},(err,adventure)=>{
        if(err)
            {
                res.json({
                    data:null,
                    authorized:false,
                    message:"can't delete  your adventure",
                    success:false
                })
            }
            else
            {
            res.json({
                data:adventure,
                authorized:true,
                message:"we deleted your adventure",
                success:true
            })}
    })


})

module.exports=router;