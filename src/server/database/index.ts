import * as mysql from "mysql";
import * as dotenv from 'dotenv';
import blogs from "./blogs";

dotenv.config();

const config = {
    user: "BlogLab",
    password: process.env.BLOG_KEY,
    host: "localhost",
    database: "Blogs", 
    port: 3306
};

const pool = mysql.createPool(config);

// pool.query("select CURRENT_TIMESTAMP", (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// });

export const Query=<T=mysql.OkPacket>(query: string , values?: Array<unknown>) => {
    const formattedSQL = mysql.format(query, values || []);

    return new Promise<T> ((resolve, reject) => {
        pool.query(formattedSQL, (err,results) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })

}

export default {
    blogs
}