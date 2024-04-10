const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ColorSchema = new Schema({
    color: {type: String, required: true},  
})



module.exports = mongoose.model("Color", ColorSchema);