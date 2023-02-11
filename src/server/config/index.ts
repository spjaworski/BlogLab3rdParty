import * as dotenv from 'dotenv';
dotenv.config();

export const mysqlConfig = {
    user: process.env.BLOG_USER,
    password: process.env.BLOG_KEY,
    host: process.env.BLOG_HOST,
    database: process.env.BLOG_DATABASE,
    port: Number(process.env.BLOG_PORT) // 3306
}