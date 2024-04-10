const Wood = require('../models/Wood')

const asyncHandler = require("express-async-handler");


exports.getWoods = asyncHandler(async(req,res,next) => {
   
    
    const Woods = await Wood.find().
    populate('durability', "class")
    .populate({ path:'colors', model:'Color', select: "color"})
    .exec();

    
  res.render('index', {title: "Woods Inventory", Woods: Woods});
})


exports.getWoodById = asyncHandler(async(req,res,next) => {
    
    const Woods = await Wood.find().
    populate('durability', "class")
    .populate({ path:'colors', model:'Color', select: "color"})
    .exec();

    
    res.send("get wood by id");
})


exports.getSoftWoods = asyncHandler(async(req,res,next) => {
   
   
    res.send("get all softwoods");
})

exports.getHardWoods = asyncHandler(async(req,res,next) => {
    res.send("get all hardwoods");
})

exports.getEngineeredWoods = asyncHandler(async(req,res,next) => {
    res.send("get all engineered woods");
})

exports.addNewWood = asyncHandler(async(req, res, next) => {
    res.send("add new wood");
})

exports.editWoodById = asyncHandler(async(req,res,next)=> {
    res.send("edit wood by id");
})

exports.deleteWoodById = asyncHandler(async(req,res,next)=> {
    res.send("delete wood by id");
})