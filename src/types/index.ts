import { OkPacket } from "mysql";

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