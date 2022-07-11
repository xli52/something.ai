"use strict";
import { Model } from "sequelize";

interface ConversationAttributes {
  user_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class conversation
    extends Model<ConversationAttributes>
    implements ConversationAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    user_id!: number;

    static associate(models: any) {
      // define association here
      conversation.belongsTo(models.user, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      conversation.hasMany(models.message, {
        foreignKey: "conversation_id",
        onDelete: "CASCADE",
      });
    }
  }
  conversation.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "conversation",
    }
  );
  return conversation;
};
