const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WoodClassesSchema = new Schema({
    
    name: {type: String, enum:["Very Durable", "Durable", "Moderately durable", "Slightly durable", "Not durable"]},
    class: {type: Number, enum:[1,2,3,4,5]}, 
    lifetime: {type: String } 
    
  })


module.exports = mongoose.model("woodDurabilityClasses", WoodClassesSchema)