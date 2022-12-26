'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User,{
        foreignKey:'userId',
        onDelete:"RESTRICT"
      })
      Comment.belongsTo(models.Document,{
        foreignKey:'docId',
        onDelete:"RESTRICT"
      })
    }
  }
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    docId: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentText:{
    type:DataTypes.STRING,
    allowNull:false
    },

  }, {
    timestamps:true,
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};