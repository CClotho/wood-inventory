var express = require('express');
var router = express.Router();
const woodControllers = require('../controllers/woodControllers.js')
const Wood = require('../models/Wood')
const {ValidateData, validate} = require('../middlewares/DataValidation.js');
const multer = require('multer');
const path = require('path');
const { constants } = require('os');
//const upload = multer({dest:'/public/images'}) // absolute url to where to store your photo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const upload = multer({storage: storage});


router.get('/', woodControllers.getWoods);

router.get('/woods/:name', woodControllers.getWoodById);


router.get('/woods/category/softwood', woodControllers.getSoftWoods);
router.get('/woods/category/hardwood', woodControllers.getHardWoods);
router.get('/woods/category/engineered', woodControllers.getEngineeredWoods);

router.get('/upload', woodControllers.getPhotoForm)
router.post('/upload',  upload.single('photo_url'),woodControllers.handleUpload);
router.get('/gallery', woodControllers.Gallery)
router.get('/add/wood', woodControllers.addForm);
router.post('/add/wood', ValidateData,validate,woodControllers.addNewWood);
router.get('/edit/wood/:id', woodControllers.editForm);
router.post('/edit/wood/:id',ValidateData,validate,woodControllers.editWoodById);
router.get('/delete/wood/:id', woodControllers.deleteForm);
router.post('/delete/wood/:id',woodControllers.deleteWoodById);

module.exports = router;
