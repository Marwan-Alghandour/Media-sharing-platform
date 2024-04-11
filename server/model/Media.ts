import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Media extends Model {
  declare id: number;
  declare type: string;
  declare name: string;
  declare path: string;
  declare liked: boolean;
}

Media.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize, tableName: "media" }
);

export default Media;
