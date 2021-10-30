// import { createPool } from 'mariadb';
import mysql from 'mariadb';

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  connectionLimit: 10,
});

export default connectionPool;
