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
    console.log("value of colors in add form", colors)
    const checkWood = await Wood.findOne({name:name})
    .populate('durability', "class")
    .populate({ path:'colors', model:'Color', select: "color"})
    .exec();

    
    console.log("value of checkwood", checkWood)

    if(checkWood) {res.render('wood', {exist:"Wood exist in inventory", Wood: checkWood })}
    // then other checking condition such as if durability or color data is available in the 2 models
    
    
})

exports.addForm = asyncHandler(async(req,res,next)=> {
   
    const getColors = await Color.find();
    const getDurability = await Durability.find();


    res.render('add-form', {Colors: getColors, Classes:getDurability})
})

exports.editForm = asyncHandler(async(req,res,next)=> {
    let updatedData;
    const editWood = await Wood.findOne({_id: req.params.id})
    const getColors = await Color.find();
    const getDurability = await Durability.find();
    res.render('edit-form', {Colors: getColors, Classes:getDurability, Wood: editWood})
})

exports.editWoodById = asyncHandler(async(req,res,next) => {
    const {name, type, description, colors, durability, quantity, price, variety} = req.body;
    console.log(colors)
    console.log(price)
    const editWood = await Wood.findOne({_id: req.params.id})
    
     if(editWood) {
        
       /*  editWood.name = name ? name : editWood.name;
        editWood.type = type ? type : editWood.type;
        editWood.description = description ? description : editWood.description
        editWood.colors = colors ? colors : editWood.colors;
        editWood.durability = durability ? durability : editWood.durability;
        editWood.quantity = quantity ? quantity : editWood.quantity;
        editWood.price = price ? price : editWood.price
        editWood.variety = variety ? variety : editWood.variety;

        await editWood.save() */
         updatedData = new Wood({
            _id: req.params.id,
            name: name,
            type: type,
            description: description,
            colors: colors,
            durability: durability,
            quantity: quantity,
            price: price,
            variety: variety ? variety : ''
        })
   

        await Wood.findByIdAndUpdate(req.params.id, updatedData);

    }

    console.log("This is the updated data", updatedData)
    console.log("This is edit",updatedData.url)

    res.redirect(updatedData.url);
})

exports.deleteWoodById = asyncHandler(async(req,res,next)=> {
    res.send("delete wood by id");
})