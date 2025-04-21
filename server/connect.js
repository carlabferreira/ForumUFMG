import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createPool({ 
    host: "localhost",
    user: process.env.db_user,
    password: process.env.db_pass, 
    database: process.env.db_schema,
});