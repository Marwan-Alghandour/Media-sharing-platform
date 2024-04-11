import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_URL || "mysql://root:root@localhost:3306/media_sharing"
);

export default sequelize;
