import * as express from "express";
import homeTestRouter from './homeTest'
import authRouter from '../auth'
import * as jwt from 'jsonwebtoken';
// import { authenticate } from 'passport';
import * as passport from 'passport'
import { jwtConfig } from '../../config';

const router = express.Router();

router.use('/homeTest', homeTestRouter);
router.use('/auth', authRouter);

// router.get('/homeTest', passport.authenticate('local', { session: false }), async (req, res) => {
//     try {

//         const bearerToken = (req.headers.authorization?.split(' '))
//         const token = bearerToken && bearerToken[0] === 'Bearer' ? bearerToken[1] : null;
//         if (!bearerToken || !token) {
//             res.status(401).json({ message: 'Error: Unauthorized' });
//             return;
//         }

//         const payload = <{ email: string }>jwt.verify(token, jwtConfig.secret);

//         console.log(payload);

//         res.json({ message: `Home Test Successful for ${payload.email}` })

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal error', error: error.message })
//     }
// });

export default router;
