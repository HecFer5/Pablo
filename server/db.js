

import { createPool } from "mysql2/promise";
import { config } from 'dotenv';

config();



export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 3306,
  database: process.env.DB_DBNAME
});

