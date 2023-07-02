'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     room.belongsTo(models.message, { foreignKey: 'id_mess' });
     room.belongsTo(models.user, { foreignKey: 'user_created' });

     room.hasMany(models.member_room, { foreignKey: 'id_room' });

    }
  }
  room.init({
    id_mess: DataTypes.INTEGER,
    user_created: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};