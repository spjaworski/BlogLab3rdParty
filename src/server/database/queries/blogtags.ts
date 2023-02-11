import { Query } from "../index";
import { IBlog, TagLink } from '../../../types';

const deleteBlogTags = async (id: IBlog["id"]) => Query('delete from blogTags where blogID = ?', [id]);
const addBlogTags = async (TagLink: TagLink) => Query('INSERT INTO blogTags set ?;', [TagLink])

export default {
    deleteBlogTags,
    addBlogTags
}