const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// WoodSchema

const WoodSchema = new Schema({
   name: {type: String, required:true},
   type: {type: String, enum:["softwood", "hardwood", "engineered"],required: true},
   description: {type: String},
   durability: {type: ObjectId, ref: "woodDurabilityClasses"},
   colors: [{type: ObjectId, ref:"Color"}],
   texture: {type: String},
   quantity: {type: Number}, //set: v => v.trunc()
   price: {type: Number}, //set: v => v.toFixed(2)},
   variety: {type: String},
   
  // application: {},
},
{
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    runSettersOnQuery: true
})

// it's not saved in database but when you use this Wood model 
// eg Wood.find() all instance of Wood will have access to wood.url
WoodSchema.virtual('url').get(function() {
    return `/woods/${this.name}`;   
})


WoodSchema.virtual('id_url').get(function() {
    return `/edit/wood/${this.id}`;   
})


WoodSchema.virtual('del_url').get(function() {
    return `/delete/wood/${this.id}`;   
})
module.exports = mongoose.model("Wood", WoodSchema);