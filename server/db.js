

import { createPool } from "mysql2/promise";
import { config } from 'dotenv';

config();

console.log(process.env.DB_HOST); // Debería imprimir 'localhost'
console.log(process.env.DB_USERNAME); // Debería imprimir 'root'

export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 3306,
  database: process.env.DB_DBNAME
});

// export const pool = createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   port: 3306,
//   database: process.env.DB_DBNAME
// });

// export const pool = createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   port: 3306,
//   database: "pablo"
// });

