import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();  // Load environment variables from .env file

// Ensure all necessary environment variables are present
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_DIALECT) {
  console.error('Missing required environment variables for database connection.');
  process.exit(1); // Exit the application if any variable is missing
}

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,  // Default MySQL port if not provided
  dialect: process.env.DB_DIALECT, // 'mysql' as specified in .env
  timezone: "+05:30",  // Adjust to your timezone
  dialectOptions: {
    ssl: {
      required: true, // SSL connection required for certain cloud providers like Aiven
      rejectUnauthorized: false, // Adjust based on your security needs
      // ca: fs.readFileSync('path_to_ca_certificate'), // Optional if you're using SSL certificates
    },
  },
  logging: false, // Disable logging of SQL queries for production
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
