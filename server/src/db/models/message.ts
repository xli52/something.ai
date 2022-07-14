"use strict";
import { Model } from "sequelize";

interface MessageAttributes {
  conversation_id: number;
  content: string;
  from_bot: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class message extends Model<MessageAttributes> implements MessageAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    conversation_id!: number;
    content!: string;
    from_bot!: boolean;

    static associate(models: any) {
      // define association here
      message.belongsTo(models.conversation, {
        foreignKey: "conversation_id",
        onDelete: "CASCADE",
      });
    }
  }
  message.init(
    {
      conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "conversations", key: "id" },
        onDelete: "CASCADE",
      },
      content: { type: DataTypes.TEXT, allowNull: false },
      from_bot: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "message",
    }
  );
  return message;
};
