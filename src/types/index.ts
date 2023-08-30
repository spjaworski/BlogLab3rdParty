import { OkPacket } from "mysql";
import { Request } from 'express';

export interface IBlog {
    id: number;
    title: string;
    content: string;
    authorid: number;
    _created: string | Date;
    authorName?: string;
    tags?: string;
}

// export interface BlogWithUser extends IBlog {
//     title: IBlog["title"];
//     authorID: IBlog["authorid"];
// }

// export interface Payload {
//     id: User['id'];
//     email: User['email'];
//     password?: User['password'];
// }

export interface Payload {
    userid: number;
    email: string;
    role: number;
    password?: string;
}

export interface NewBlog {
    title: string;
    content: string;
}

export interface TagLink {
    blogID: IBlog["id"];
    tagID: number;
}

export interface ITag {
    id: number;
    name: string;
    _created: string | Date;
}

export type sp<T> = [T, OkPacket]

export interface NewUser {
    email: string;
    password?: string;
}

export interface User extends NewUser {
    id: number;
    created_at: string | Date;
}

export interface ReqUser extends Request {
    user?: {
        id?: number;
        email?: string;
        password?: string;
        created_at?: Date;
    }
}

export interface IFetchOptions {
    method: string;
    headers?: HeadersInit;
    body?: string;
}

// userid: 2,
//   email: 'newtest@test.com',
//   role: 'guest',
//   iat: 1684956787,
//   exp: 1684959787
