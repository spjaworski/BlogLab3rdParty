import { Query } from "../index";
import { ITag } from '../../../types';


const getAllTags = async () => Query<ITag[]>('select * from tags');
const addNewTag = async (newTagName: string) => Query('insert into tags (name) values(?)', [newTagName])

export default {
    getAllTags,
    addNewTag
}