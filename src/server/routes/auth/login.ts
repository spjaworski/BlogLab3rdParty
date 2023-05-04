import * as express from 'express';
import { hash, compare } from 'bcrypt';
// import { sign, verify } from '../../utils/tokens'
import token_utils from '../../utils/tokens'

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "Home Test Successful" })
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        res.json({ email, password })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error with log in router" })
    }
})

export default router;