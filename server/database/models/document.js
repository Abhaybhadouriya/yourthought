'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.User,{
        foreignKey:'userId',
        sourceKey:'id',
        onDelete:"RESTRICT"
      })
    } 
  }
  Document.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published:{
      type:DataTypes.BOOLEAN,
      defaultValue:true,
    },
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },tags:{
      type: DataTypes.STRING,
      allowNull:true
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
    sequelize,
    modelName: 'Document',
  });
  return Document;
};