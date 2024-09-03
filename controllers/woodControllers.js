const Wood = require('../models/Wood')
const Durability = require('../models/WoodDurabilityClasses');
const Color = require('../models/Color');
const { uploadImage, getAssetInfo, createImageTag } = require('./cloud');
const asyncHandler = require("express-async-handler");
const Image = require('../models/Image');

exports.Gallery = asyncHandler(async(req, res , next)=> {
    const Images = await Image.find();

    res.render('gallery', {Photos: Images});
})

exports.getPhotoForm = asyncHandler(async(req, res , next)=> {
    res.render('upload-photo')
})

exports.handleUpload = asyncHandler(async(req,res,next)=> {
    console.log("This is the result after getting processed by multer ", req.file);
    const uploaded = await uploadImage(req.file.path);
    console.log("After uploading in cloudinary", uploaded);
/* 
    const Photo = new Image({ // save the url from the cloudinary service database
        url: uploaded.url
    })
    
    await Photo.save(); */
    res.redirect('/gallery')
})

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
    
    const softwood = await Wood.find({type: 'softwood'});

    if(softwood.length > 0) {
        res.render("index", {Woods: softwood});
        return;
    }
   
    res.render("index", {none: "There are no type of softwood woods in the inventory"})

})

exports.getHardWoods = asyncHandler(async(req,res,next) => {
    
    const hardwood = await Wood.find({type: 'hardwood'});

    if(hardwood.length > 0) {
        res.render("index", {Woods: hardwood});
        return;
    }
   
    res.render("index", {none: "There are no type of hardwood woods in the inventory"})
})

exports.getEngineeredWoods = asyncHandler(async(req,res,next) => {
    const engineered = await Wood.find({type: 'engineered'});

    if(engineered.length > 0) {
        res.render("index", {Woods: engineered});
        return;
    }
   
    res.render("index", {none: "There are no type of engineered woods in the inventory"})
})

exports.addNewWood = asyncHandler(async(req, res, next) => {
    
    const {name, type, description, colors, durability, quantity, price, variety, texture} = req.body;
    // add check here convert user's input to lowercase
    console.log("value of colors in add form", colors)
    const checkWood = await Wood.findOne({name:name})
    .populate('durability', "class")
    .populate({ path:'colors', model:'Color', select: "color"})
    .exec();

    
    console.log("value of checkwood", checkWood)

    if(checkWood) {res.render('wood', {exist:"Wood exist in inventory", Wood: checkWood })}
    // then other checking condition such as if durability or color data is available in the 2 models
    
    const newWood = await new Wood({
        name: name,
        type: type,
        description:description ? description : null,
        colors: colors ? colors : null, 
        durability: durability ? durability : null,
        quantity: quantity ? quantity: null,
        price: price ? price : null, 
        texture: texture ? texture: null,
        variety: variety ? variety : null,
    })
    await newWood.save();
    res.redirect("/");
})

exports.addForm = asyncHandler(async(req,res,next)=> {
   
    const getColors = await Color.find();
    const getDurability = await Durability.find();
    console.log(getDurability)

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
    const {name, type, description, colors, durability, quantity, price, variety,texture} = req.body;
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
            description:description ? description : null,
            colors: colors ? colors : null, 
            durability: durability ? durability : null,
            quantity: quantity ? quantity: null,
            price: price ? price : null, 
            texture: texture ? texture: null,
            variety: variety ? variety : null,
        })
   

        await Wood.findByIdAndUpdate(req.params.id, updatedData);

    }

    console.log("This is the updated data", updatedData)
    console.log("This is edit",updatedData.url)

    res.redirect(updatedData.url);
})

exports.deleteForm = asyncHandler(async(req,res,next )=> {
    const findWood = await Wood.findOne({_id: req.params.id})
    
    res.render("wood", {deleteWood: 'Delete', Wood:findWood} )
})


exports.deleteWoodById = asyncHandler(async(req,res,next)=> {
    
    const {password} = req.body;
    const findWood = await Wood.findOne({_id: req.params.id})

    if(password === "Superflous") {

        if(findWood.quantity > 0) {
            res.render("wood", {protected: "Item cannot be deleted if there is still a stock of it", Wood:findWood})
            return;
        }

    const deleteWood = await Wood.findByIdAndDelete(req.params.id);

    
    }
    else {
        res.render("wood", {protected: "Incorrect Password: Item cannot be deleted", Wood:findWood}) 
    }
   
    //res.redirect('/');
   
})