const mongoose =require("mongoose")

const tab = new mongoose.Schema({
    title:{type:String,required:true},
    Descraption:{type:String,required:true},
    image:{type:String,required:true}
})

module.exports=mongoose.module("Tab",tab)

//This File Done