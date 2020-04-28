'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    photoPath: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
    // associations can be defined here
  };
  return Photo;
};