//SameSite Attribute---express-session
//This limits the scope of the cookie such that it will only be attached to requests
//if those requests are same-site
//If same-site attribute is strict (as below) cookie will only be sent with same-site requests
//Alternatively, if same-site attribute is "lax" cookie will be sent with same-site and with
//cross-site top-level navigations
//That said, if same-site attribute is "none" cookie will be sent with same- and cross-site requests
//If samesite attribute's value is something else, it will be treated as "none"
'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];
const db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
