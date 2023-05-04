import * as express from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as passportMiddleware from '../../middleware/passport'
import { jwtConfig } from "../../config";
import { ReqUser } from '../../../types'
// import { authenticate } from 'passport';
import * as passport from 'passport';
import users from "../../database/queries/users";
import loginRouter from './login';
import registerRouter from './register'
import database from "../../database";
import compareHash from "../../utils/bcrypt";
import sign from '../../utils/tokens'
import verify from '../../utils/tokens'

const router = express.Router();

router.use('/login', loginRouter);

router.use('/register', registerRouter);

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Must have both an email and password" });
    }
    try {
        const hashed = bcrypt.hashSync(password, 12);
        const newUser = await users.register({ email, password: hashed });

        res.status(201).json({ message: "New user registered", id: newUser.insertId });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred when attempting to register new user" });
    }
})

router.post('/login', passport.authenticate('local', { session: false }), async (req: ReqUser, res) => {
    // authenticate('local'),
    const { email, password } = req.body;
    // const email = req.body.email;
    // const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ message: "Invalid Username or Password" });
    }

    try {
        console.log(req.user?.id);
        const [userFound] = await database.users.find('email', email);
        if (userFound && bcrypt.compareSync(password, userFound.password!)) {
            const token = jwt.sign({ userid: userFound.id, email: userFound.email, role: 'guest' },
                jwtConfig.secret,
                { expiresIn: '50m' }
            );
            console.log(userFound);
            res.json({ message: "Logged in", token, userFound });
            return;
        }
        res.status(401).json({ message: 'Invalid Credentials' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error with log in router" })
    }
})

export default router;


// const [userFound] = await database.users.find('email', email);
//         if (!userFound || !bcrypt.compareSync(password, userFound.password!)) {
//             return res.status(401).json({ message: 'Invalid Credentials' })
//         }
//         res.json('login successful');
