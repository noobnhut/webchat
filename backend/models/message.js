'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      message.belongsTo(models.user, { foreignKey: 'user_receive' });
      message.belongsTo(models.user, { foreignKey: 'user_send' });

      message.hasMany(models.room, { foreignKey: 'id_mess' });
      


    }
  }
  message.init({
    message_content: DataTypes.STRING,
    user_send: DataTypes.INTEGER,
    user_receive: DataTypes.INTEGER,
    status_seen: DataTypes.BOOLEAN,
    status_message: DataTypes.BOOLEAN,
    reply_mess: DataTypes.INTEGER,
    deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};