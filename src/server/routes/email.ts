import MailGun from 'mailgun.js';
import * as FormData from 'form-data';
import * as Mailgun from 'mailgun.js';
import * as express from 'express';
import { mailConfig as config } from '../config'

const mailgun = new (<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
    username: 'api',
    key: config.mailgun.apiKey
});



const router = express.Router();
const domain = config.mailgun.domain;

router.post('/', async (req, res) => {
    const newEmail = req.body;
    if (!domain) {
        console.log("Missing Domain From Mailgun Config")
        return;
    }
    try {
        const result = await mailgun.messages.create(domain, {
            to: config.mailgun.toEmail,
            subject: newEmail.subject,
            from: newEmail.from,
            html: newEmail.message
        })
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error accessing email API' })
    }
})

export default router;


