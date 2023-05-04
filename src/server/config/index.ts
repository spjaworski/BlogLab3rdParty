import * as dotenv from 'dotenv';
import * as mysql from "mysql"
dotenv.config();

export const mysqlConfig: mysql.PoolConfig = {
    user: process.env.BLOG_USER,
    password: process.env.BLOG_KEY,
    host: process.env.BLOG_HOST,
    database: process.env.BLOG_DATABASE,
    port: Number(process.env.BLOG_PORT) // 3306
}
export const mailConfig = {
    mailgun: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
        toEmail: process.env.MAILGUN_TO_EMAIL
    }
}

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

if (!secret || !expiration) throw new Error("Missing JWT Signing Key or has no Expiration Defined");

export const jwtConfig = {
    secret,
    expiration
}


