const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageUrl = new Schema({
    url: {type: String}
})


module.exports = mongoose.model("Image", ImageUrl);