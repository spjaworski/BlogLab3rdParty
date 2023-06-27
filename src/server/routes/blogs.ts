import * as express from 'express';
import database from '../database';
import * as passport from 'passport';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const blogs = (await database.blogs.getBlogWithTags())[0];
        console.log('Blogs (all) connected')
        res.json(blogs);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.sqlMessage || e.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        console.log('blogs (single) connected')
        const id = parseInt(req.params.id);
        if (!id) return res.status(400).json({ message: "ID must be an integer" })
        const storedProcedureRes = await database.blogs.getSingleBlogWithTags(id)
        const arrayOfBlogs = storedProcedureRes[0];
        const blog = arrayOfBlogs[0];
        console.log({ storedProcedureRes, arrayOfBlogs, blog })
        res.json(blog);
        // res.status(201).json({ message: "Fetched single blog" })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.sqlMessage || e.message })
    }
});

router.put('/:id/edit', passport.authenticate('jwt'), async (req, res) => {
    try {
        console.log('blog connected, put request')
        const id = parseInt(req.params.id);
        const content = req.body.content;
        const userID = parseInt(req.body.user.id);
        if (!id) return res.status(400).json({ message: "ID must be an integer" })
        if (!content) return res.status(400).json({ message: "Must have new text to submit an edit" })

        console.log(req);

        await database.blogs.editBlog(id, content, userID)

        res.status(201).json({ message: "Updated Successfully" })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.sqlMessage || e.message })
    }
});

router.delete('/:id', passport.authenticate('jwt'), async (req, res) => {
    try {
        console.log('blogs connected, delete request')
        const id = parseInt(req.params.id);
        const userID = parseInt(req.body.user.id)
        if (!id) return res.status(400).json({ message: "ID must be an integer" })
        console.log(req);
        await database.blogTags.deleteBlogTags(id);
        await database.blogs.deleteBlog(id, userID);
        res.status(200).json({ message: "Blog Deleted" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.sqlMessage || e.message })
    }
});

router.post('/', passport.authenticate('jwt'), async (req, res) => {
    try {
        const { title, content, tagIDs, createdTags } = req.body;
        if (!title || !content || !tagIDs || !createdTags) {
            res.status(400).json({ message: "Bad Data Input, missing Title or Content" })
            return;
        }

        console.log('blogs connected, create request');
        console.log(req);
        console.log(res);
        const InsertedBlog = (await database.blogs.addBlog({ title, content }, req.body.user!.id));
        for await (const tagName of createdTags) {
            const newTag = await database.tags.addNewTag(tagName)
            await database.blogTags.addBlogTags({ blogID: InsertedBlog.insertId, tagID: newTag.insertId })
        }
        for await (const tagID of tagIDs) {
            await database.blogTags.addBlogTags({ blogID: InsertedBlog.insertId, tagID })
        }
        res.status(201).json({ message: "Blog with tag created", blogID: InsertedBlog.insertId })

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.sqlMessage || e.message })
    }
});

export default router;