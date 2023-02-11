import * as express from 'express';
import database from '../database'


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const tags = await database.tags.getAllTags();
        res.json(tags)
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.sqlMessage || e.message })
    }
})

export default router;