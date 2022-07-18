"use strict";
import { Model } from "sequelize";

interface UserCharacterAttributes {
  user_id: number;
  character_id: number;
  unlocked: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class users_character
    extends Model<UserCharacterAttributes>
    implements UserCharacterAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    user_id!: number;
    character_id!: number;
    unlocked!: boolean;

    static associate(models: any) {
      // define association here
    }
  }
  users_character.init(
    {
      user_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      character_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
          model: "characters",
          key: "id",
        },
      },
      unlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "users_character",
    }
  );
  return users_character;
};
