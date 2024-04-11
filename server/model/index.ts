import sequelize from "../config/db";
import Media from "./Media";

const runDb = async () => {
  try {
    await sequelize.authenticate();
    await Media.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default runDb;
