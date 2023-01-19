import { Query } from "./index";
import { IBlog, NewBlog, TagLink, ITag, sp } from '../../types';

const allBlogs = async () => Query<IBlog[]>('select * from blog');
const oneBlog = async (id: number) => Query<IBlog[]>('select * from blog where id = ?', [id]);
const editBlog = async (id: number, content: string) => Query('update blog set content = ? where id = ?', [content, id]);
const deleteBlog = async (id: IBlog["id"]) => Query('delete from blog where id = ?; ', [id]);
const deleteBlogTags = async (id: IBlog["id"]) => Query('delete from blogTags where blogID = ?', [id]);
const addBlog = async (NewBlog: NewBlog) => Query('INSERT INTO blog set ?, authorid=1', [NewBlog]);
const addBlogTags = async (TagLink: TagLink) => Query('INSERT INTO blogTags set ?;', [TagLink])
const getBlogTags = async () => Query<sp<IBlog[]>>('call spBlogTags(null)')
const getSingleBlogTags = async (id: IBlog["id"]) => Query<sp<IBlog[]>>('call spBlogTags(?)', [id])
const getAllTags = async () => Query<ITag[]>('select * from tags');
const addNewTag = async (newTagName: string) => Query('insert into tags (name) values(?)', [newTagName])

export default {
    allBlogs,
    oneBlog,
    editBlog,
    deleteBlog,
    addBlog,
    getBlogTags,
    getSingleBlogTags,
    addBlogTags,
    deleteBlogTags,
    getAllTags,
    addNewTag
}