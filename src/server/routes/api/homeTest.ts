import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as config from '../../config';
import { authenticate } from 'passport';
import { jwtConfig } from '../../config';
import { Router } from 'express';
import { ReqUser } from '../../../types';

const router = Router();

router.get('/', async (req: ReqUser, res) => {

    // passport.authenticate('jwt')

    try {

        const bearerToken = (req.headers.authorization?.split(' '))
        const token = bearerToken && bearerToken[0] === 'Bearer' ? bearerToken[1] : null;
        if (!bearerToken || !token) {
            res.status(401).json({ message: 'Error: Unauthorized' });
            return;
        }

        const payload = <{ email: string }>jwt.verify(token, jwtConfig.secret);

        console.log(payload);

        res.json({ message: `Revised Home Test Successful for ${payload.email}` })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal error', error: error.message })
    }
});

// router.get('/', authenticate('local'), async (req, res) => {
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

