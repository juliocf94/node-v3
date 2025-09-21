import pool from "@config/db.js";

// Use prepared queries to avoid SQL injection
export const findAllActive = async () => {
    const conn = await pool.getConnection();
    try {
        const rows = await conn.query("SELECT * FROM users WHERE state = 1");
        return rows;
    } finally {
        if (conn) conn.release();
    }
};