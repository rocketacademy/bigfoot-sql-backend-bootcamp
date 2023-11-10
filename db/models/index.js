'use strict';
// importing everything we need && initilizing variables we will ultimately pass out (db)
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = require('../../config/database')[env];
const db = {};

// Develops the connection into the DB
let sequelize;
if (config.use_env_variable) { //currently NA
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Going through the current directory and finding all the models
fs.readdirSync(__dirname) //read current dir
  .filter((file) => { //filter out all the files that are models
    return ( //all the files which fit the below conditions
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // importing and initializing each model in our "models" directory
    const model = require(path.join(__dirname, file))( // first bracket retrieves exported func from model file; second initializes
      sequelize, // as written in model file, module.exports = (sequelize, DataTypes) => { class Sighting extends Model etc etc }
      Sequelize.DataTypes
    );
    db[model.name] = model; //insert model into db obj
  });

  // taking each model in the db obj, and creating the associations
Object.keys(db).forEach((modelName) => { //for each model
  if (db[modelName].associate) { //if associate exists
    db[modelName].associate(db); //call the associate method with arg db
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
