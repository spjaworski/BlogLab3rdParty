import { Query } from "../index";
import { IBlog, NewBlog, TagLink, ITag, sp } from '../../../types';

const allBlogs = async () => Query<IBlog[]>('select * from blog');
const oneBlog = async (id: number) => Query<IBlog[]>('select * from blog where id = ?', [id]);
const editBlog = async (id: number, content: string) => Query('update blog set content = ? where id = ?', [content, id]);
const deleteBlog = async (id: IBlog["id"]) => Query('delete from blog where id = ?; ', [id]);
const addBlog = async (NewBlog: NewBlog) => Query('INSERT INTO blog set ?, authorid=1', [NewBlog]);


const getBlogWithTags = async () => Query<sp<IBlog[]>>('call spBlogTags(null)')
const getSingleBlogWithTags = async (id: IBlog["id"]) => Query<sp<IBlog[]>>('call spBlogTags(?)', [id])


export default {
    allBlogs,
    oneBlog,
    editBlog,
    deleteBlog,
    addBlog,
    getBlogWithTags,
    getSingleBlogWithTags,

}