const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const mongoose = require("mongoose");

const app = express()
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/medicineReview", {useNewUrlParser: true});

const medSchema ={
    medName: String,
    revName: String,
    rating: String,
    remarks: String
};

const Med = mongoose.model("Med", medSchema);



app.post("/",function(req,res){
    const namemed = req.body.medName;
    const namerev = req.body.revName;
    const rat = req.body.rating;
    const re = req.body.remarks;

    const medTemp = new Med({
        medName : namemed,
        revName : namerev,
        rating : rat,
        remarks : re
    })

    medTemp.save();

    res.redirect("/");

})

app.get("/", function(req, res){
    reviewArr=[]
    Med.find({}, function(err, fitems){
        
    
    res.render("review",{foundItems: fitems});



    });

    
});



  app.listen(3000, function(){
    console.log("Server started on port 3000.");
  });
  