'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Likes.belongsTo(models.User,{
        foreignKey:'userId',
        onDelete:"RESTRICT"
      })
      Likes.belongsTo(models.Document,{
        foreignKey:'docId',
        onDelete:"RESTRICT"
      })
    }  
  }
  Likes.init({
   
    docId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps:true,
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};