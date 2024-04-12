const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');

const isObjectId = mongoose.Types.ObjectId.isValid;

const ValidateData = [
    body("name", "must not be empty").isString().notEmpty().escape(),
    body("type", "must not be empty").isString().notEmpty().toLowerCase().escape(),
    body("description").isString().toLowerCase().escape(),

    body("durability", "Not a valid ObjectId for a class").custom(durability => {  
       
        return isObjectId(durability)      
    }),
    
    body("colors","Not a valid ObjectId for a color").custom(colors => {  
      return isObjectId(colors)
    }),
    
    body("texture","must be a string").isString().escape(),
    body("quantity").isNumeric().escape().withMessage("Must be a number"),
    body("price").isNumeric().escape().withMessage("Must be a number"),
    body('variety',"must be a string").isString().escape()
]


const validate = (req, res, next) => {
    const errors = validationResult(req);   
    if (errors.isEmpty()) {
      return next();
    }
    console.log("Full Error Objects:", errors.array());
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));
    console.log("Validation Errors:", extractedErrors);
    return res.status(422).json({
      errors: extractedErrors,
    });
}

module.exports ={ ValidateData, validate}