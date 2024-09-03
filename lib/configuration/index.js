var nconf = require('nconf');
require('dotenv').config({path: '.env'});

function Config(){
  nconf.argv().env("_");
  // combining dotenv and  nconf
   nconf.file("default", "config/default.json");
   nconf.set("NODE:ENV", process.env.ENV)
  var environment = nconf.get(process.env.ENV) || "development" 
  console.log("The environment", environment)
  nconf.file(environment, "config/" + environment + ".json"); 
  
  
  
}


Config.prototype.get = function(key) {
    return nconf.get(key);
  };
  
  module.exports = new Config();