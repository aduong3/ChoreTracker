import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === 'production';


const pool = new Pool({


  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: isProduction ? { rejectUnauthorized: false} : false,
});

export default pool;