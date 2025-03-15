import chalk from "chalk";
import sequelize from "./src/config/database.config.js";
import server from "./server.js";
import dotenv from "dotenv";

dotenv.config();

try {
  await sequelize.authenticate();
  console.log(chalk.cyan("Connected to Database successfully"));

  const dbParams = {};
  if (process.env.NODE_ENV === "development") {
    dbParams["alter"] = true;
  }
  if (dbParams.alter) {
    console.log(chalk.greenBright("Database syncing in progress"));
    await sequelize.sync(dbParams);
    console.log(chalk.green("Database synced successfully"));
  }
} catch (err) {
  console.log(err);
}
server.listen(process.env.PORT, () => {
  console.log(
    chalk.yellow(`Server started successfully on port ${process.env.PORT}`)
  );
});
