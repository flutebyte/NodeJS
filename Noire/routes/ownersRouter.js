const express = require('express');
const router = express();
const ownerModel = require('../models/owners-model');

if(process.env.NODE_ENV === 'development'){
    router.post("/create",async (req,res)=>{
        let owners = await ownerModel.find();
        if(owners.length >0 ){
            return res.status(503).send("You dont have permission to create more than one owner");
        }

        let {fullname, email, password} = req.body;
        let createdOwner= await ownerModel.create({
            fullname,
            email,
            password
        });

        res.status(201).send(createdOwner);    
    })
}

console.log("Environment:", process.env.NODE_ENV);

router.get("/", (req, res) => {
    res.send("Hii");
});

module.exports = router;