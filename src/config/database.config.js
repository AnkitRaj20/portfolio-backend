import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from 'mysql2';

// Load environment variables from .env file (for local development)
dotenv.config();

// Create configuration based on environment
const getDbConfig = () => {
  // Check for required environment variables
  const requiredVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_DIALECT'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }

  // Base configuration
  const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  dialectModule: mysql2,
    timezone: "+05:30",
    logging: process.env.NODE_ENV === 'development',
    dialectOptions: {}
  };

  // Add SSL configuration for production environments
  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'dev2') {
    config.dialectOptions.ssl = {
      require: true,
      rejectUnauthorized: false
    };
  }

  return config;
};

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  getDbConfig()
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call test connection in non-production environments
if (process.env.NODE_ENV !== 'production') {
  testConnection();
}

export default sequelize;