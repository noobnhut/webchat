'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      member_room.belongsTo(models.room, { foreignKey: 'id_room' });
      member_room.belongsTo(models.user, { foreignKey: 'user_member' });
    }
  }
  member_room.init({
    id_room: DataTypes.INTEGER,
    user_member: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'member_room',
  });
  return member_room;
};