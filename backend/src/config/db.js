// src/config/db.js
import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || '3306',
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_LIMIT || 5,
});

export default pool;
