const Wood = require('../models/Wood')
const Durability = require('../models/WoodDurabilityClasses');
const Color = require('../models/Color');

const asyncHandler = require("express-async-handler");




exports.getWoods = asyncHandler(async(req,res,next) => {
   
    
    const Woods = await Wood.find().
    populate('durability', "class")
    .populate({ path:'colors', model:'Color', select: "color"})
    .exec();
  
   
    
  res.render('index', {title: "Woods Inventory", Woods: Woods});
})


exports.getWoodById = asyncHandler(async(req,res,next) => {
    
    const getWood = await Wood.findOne({name: req.params.name})
    .populate('durability', "class")
    .populate({ path:'colors', model:'Color', select: "color"})
    .exec();

    
    res.render('wood', {Wood: getWood})
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
    
    const {name, type, description, colors, durability, quantity, price, variety} = req.body;
    // add check here convert user's input to lowercase
    const checkWood = await Wood.findOne({name:name})
    .populate('durability', "class")
    .populate({ path:'colors', model:'Color', select: "color"})
    .exec();

    
    console.log("value of checkwood", checkWood)

    if(checkWood) {res.render('wood', {exist:"Wood exist in inventory", Wood: checkWood })}
    // then other checking condition such as if durability or color data is available in the 2 models
    
    
})

exports.addForm = asyncHandler(async(req,res,next)=> {
    // this will just render the form, the condition here is just for experiment
    // if the exist variable works in the pug template
    const checkWood = false;
    if(checkWood) {res.render('add-form', {exist:"Wood exist in inventory"})}
    
    const getColors = await Color.find();
    const getDurability = await Durability.find();


    res.render('add-form', {Colors: getColors, Classes:getDurability})
})

exports.editWoodById = asyncHandler(async(req,res,next)=> {
    res.send("edit wood by id");
})

exports.deleteWoodById = asyncHandler(async(req,res,next)=> {
    res.send("delete wood by id");
})