"use strict";
import { Model } from "sequelize";

interface CharacterAttributes {
  name: string;
  gender: string;
  price_cents: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class character
    extends Model<CharacterAttributes>
    implements CharacterAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    name!: string;
    gender!: string;
    price_cents!: number;

    static associate(models: any) {
      // define association here
      character.belongsToMany(models.user, {
        through: models.users_character,
        as: "users",
        foreignKey: "character_id",
      });
    }
  }
  character.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      price_cents: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "character",
    }
  );
  return character;
};
