var express = require('express');
var router = express.Router();
const woodControllers = require('../controllers/woodControllers.js')
const Wood = require('../models/Wood')


/* GET home page. */
/* router.get('/', function(req, res, next) {
  
}); */

router.get('/', woodControllers.getWoods);

router.get('/woods/:name', woodControllers.getWoodById);


router.get('/woods/category/softwood', woodControllers.getSoftWoods);

router.get('/woods/category/hardwood', woodControllers.getHardWoods);

router.get('/woods/category/engineered', woodControllers.getEngineeredWoods);

router.get('/add/wood', woodControllers.addForm);
router.post('/add/wood', woodControllers.addNewWood);
router.get('/edit/wood/:id', woodControllers.editForm);
router.post('/edit/wood/:id',woodControllers.editWoodById);
router.delete('/delete/wood/:id');

module.exports = router;
