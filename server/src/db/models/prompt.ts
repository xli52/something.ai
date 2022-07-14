"use strict";
import { Model } from "sequelize";

interface PromptAttributes {
  prompt: string;
  user_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class prompt extends Model<PromptAttributes> implements PromptAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    prompt!: string;
    user_id!: number;

    static associate(models: any) {
      // define association here
      prompt.belongsTo(models.user);
    }
  }
  prompt.init(
    {
      prompt: { type: DataTypes.TEXT, allowNull: false },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "prompt",
    }
  );
  return prompt;
};
