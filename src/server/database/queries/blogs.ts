import { Query } from "../index";
import { IBlog, NewBlog, TagLink, ITag, sp } from '../../../types';




const allBlogs = async () => Query<IBlog[]>('select * from blog');
const oneBlog = async (id: number) => Query<IBlog[]>('select * from blog where id = ?', [id]);
const editBlog = async (id: number, content: string, userID: number) => Query('update blog set content = ? where id = ? AND userid = ?', [content, id, userID]);
const deleteBlog = async (id: IBlog["id"], userID: number) => Query('delete from blog where id = ? AND userid= ?', [id, userID]);
const addBlog = async (NewBlog: NewBlog, userID: number) => Query('INSERT INTO blog set ?, authorid=?', [NewBlog, userID]);
// const addBlog = async (NewBlog: NewBlog, userID: number) => Query('INSERT INTO blog set ?, authorid=?', [NewBlog, userID]);


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

// , userID: number in delete params