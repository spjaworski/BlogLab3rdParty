import * as express from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import donateRouter from './donate';
import emailRouter from './email'
import database from '../database';
import authRouter from './auth';
import apiRouter from './api';


const router = express.Router();

router.use('/api/blogs', blogsRouter);
router.use('/api/tags', tagsRouter);
router.use('/api/donate', donateRouter);
router.use('/api/email', emailRouter);
router.use('/api', apiRouter);
router.use('/auth', authRouter);



export default router;