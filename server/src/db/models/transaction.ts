"use strict";
import { Model } from "sequelize";

interface TransactionAttributes {
  user_id: number;
  character_id: number;
  amount_paid_cents: number;
  payment_type: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class transaction
    extends Model<TransactionAttributes>
    implements TransactionAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    user_id!: number;
    character_id!: number;
    amount_paid_cents!: number;
    payment_type!: string;

    static associate(models: any) {
      // define association here
    }
  }
  transaction.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      character_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "characters",
          key: "id",
        },
      },
      amount_paid_cents: { type: DataTypes.INTEGER, allowNull: false },
      payment_type: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
