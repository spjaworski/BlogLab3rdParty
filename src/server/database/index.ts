import * as mysql from "mysql";
import blogs from "./queries/blogs";
import tags from "./queries/tags"
import blogTags from "./queries/blogtags"
import users from "./queries/users";
import { mysqlConfig as config } from "../config"


const pool = mysql.createPool(config);

// pool.query("select CURRENT_TIMESTAMP", (err, results) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(results);
//     }
// });

export const Query = <T = mysql.OkPacket>(query: string, values?: Array<unknown>) => {
    const formattedSQL = mysql.format(query, values || []);

    return new Promise<T>((resolve, reject) => {
        pool.query(formattedSQL, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })

}

export default {
    blogs,
    tags,
    blogTags,
    users
}