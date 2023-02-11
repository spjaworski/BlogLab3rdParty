import * as express from 'express';
import blogsRouter from './blogs'
import tagsRouter from './tags'
import database from '../database'


const router = express.Router();

router.use('/api/blogs', blogsRouter);
router.use('/api/tags', tagsRouter);



// router.get('/api/status', (req, res, next) => {
//     res.json('Connected');
// });

// router.get('/api/tags', async (req, res) => {
//     try {
//         res.json(await database.tags.getAllTags())
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: e.sqlMessage || e.message })
//     }
// })

// router.get('/api/blogs', async (req, res) => {
//     try {
//         console.log('Blogs (all) connected')
//         const blogs = (await database.blogs.getBlogWithTags())[0];
//         res.json(blogs);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: e.sqlMessage || e.message })
//     }
// });

// router.get('/api/blogs/:id', async (req, res) => {
//     try {
//         console.log('blogs (single) connected')
//         res.json((await database.blogs.getSingleBlogWithTags(parseInt(req.params.id)))[0][0])
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: e.sqlMessage || e.message })
//     }
// });

// router.put('/api/blogs/:id/edit', async (req, res) => {
//     try {
//         console.log('blog connected, put request')
//         console.log(req);
//         res.json((await database.blogs.editBlog(parseInt(req.params.id), req.body.content)))
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: e.sqlMessage || e.message })
//     }
// });

// router.delete('/api/blogs/:id', async (req, res) => {
//     try {
//         console.log('blogs connected, delete request')
//         console.log(req);
//         await database.blogTags.deleteBlogTags(parseInt(req.params.id))
//         res.json((await database.blogs.deleteBlog(parseInt(req.params.id))))
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: e.sqlMessage || e.message })
//     }
// });

// router.post('/api/blogs', async (req, res) => {
//     try {
//         const { title, content, tagIDs, createdTags } = req.body;
//         if (!title || !content) {
//             res.status(400).json({ message: "Bad Data Input, missing Title or Content" })
//             return;
//         }

//         console.log('blogs connected, create request');
//         console.log(req);
//         console.log(res);
//         const InsertedBlog = (await database.blogs.addBlog({ title, content }));
//         for await (const tagName of createdTags) {
//             const newTag = await database.tags.addNewTag(tagName)
//             await database.blogTags.addBlogTags({ blogID: InsertedBlog.insertId, tagID: newTag.insertId })
//         }
//         for await (const tagID of tagIDs) {
//             await database.blogTags.addBlogTags({ blogID: InsertedBlog.insertId, tagID })
//         }
//         res.status(201).json({ message: "Blog with tag created", blogID: InsertedBlog.insertId })

//     } catch (e) {
//         console.log(e);
//         res.status(500).json({ message: e.sqlMessage || e.message })
//     }
// });




export default router;