'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    media.belongsTo(models.message, { foreignKey: 'id_mess' });
    }
  }
  media.init({
    url: DataTypes.STRING,
    id_mess: DataTypes.STRING,
    name_media: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'media',
  });
  return media;
};