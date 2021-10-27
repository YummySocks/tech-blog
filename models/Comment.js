const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}
// table declaration for the comments
Comment.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize
    }
  );


module.exports = Comment;