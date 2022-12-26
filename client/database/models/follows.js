'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      follows.belongsTo(models.User,{
        soruceKey:'userId',
        foreignKey:'followerId',
        onDelete:"RESTRICT"
      })
      follows.belongsTo(models.User,{
        sourceKey:'userId',
        foreignKey:'followedById',
        onDelete:"RESTRICT"
      }) 
    }
  }
  follows.init({
    followerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    followedById: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps:true,
    sequelize,
    modelName: 'follows',
  });
  return follows;
};