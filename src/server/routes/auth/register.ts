
import * as express from "express";
import * as bcrypt from 'bcrypt';
import users from "../../database/queries/users";

const router = express.Router();


router.post("/register", async (req, res) => {
    const { email, password } = req.body;



    if (!email || !password) {
        return res.status(400).json({ message: "Must have a valid email and password" });
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

export default router;