import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";  // Required if you're using a certificate for SSL (optional)

dotenv.config();

// Log the database configuration for debugging purposes


// Creating Sequelize instance with dynamic environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Use the DB_PORT from the .env file
  dialect: process.env.DB_DIALECT, // Use MySQL dialect
  timezone: "+05:30",
  dialectOptions: {
    ssl: {
      required: true, // SSL connection is required for Aiven MySQL
      rejectUnauthorized: false, // Change this based on your security needs
      // ca: fs.readFileSync('path_to_ca_certificate'), // Uncomment if you have a certificate file (optional)
    },
  },
  logging: false, // Disable logging of SQL queries
});

export default sequelize;


// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// import { URL } from "url";

// dotenv.config();

// // Parse the MYSQL_SERVICE_URI
// const dbUrl = new URL(process.env.MYSQL_SERVICE_URI);

// const sequelize = new Sequelize(dbUrl.pathname.slice(1), dbUrl.username, dbUrl.password, {
//   host: dbUrl.hostname,
//   port: dbUrl.port,
//   dialect: "mysql", // This assumes you are using MySQL
//   timezone: "+05:30",
//   dialectOptions: {
//     ssl: {
//       required: true,
//       rejectUnauthorized: false, // Adjust this based on your requirements
//     },
//   },
//   logging: false, // Set to true if you want to see SQL queries
// });

// export default sequelize;
