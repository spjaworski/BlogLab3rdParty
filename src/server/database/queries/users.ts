import { Query } from "..";
import { NewUser, User } from "../../../types";

const register = (newUser: NewUser) => Query('INSERT INTO users SET ?', [newUser]);
const find = (column: string, value: string) => Query<User[]>("SELECT * FROM users WHERE ??=?", [column, value]);

// (email: string) ?? indicates to mysql that the expected value will be a column name

export default {
    register,
    find
}