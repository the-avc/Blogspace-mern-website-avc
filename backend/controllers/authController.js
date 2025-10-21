import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { formatDatatoSend, generateUsername } from '../utils/auth.js';

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    
    bcrypt.hash(password, 10, async (err, hashed_password) => {
        let username = await generateUsername(email);
        let user = new User({
            personal_info: {
                fullname,
                email,
                password: hashed_password,
                username
            }
        });
        
        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u));
        })
        .catch(err => {
            if (err.code == 11000) {
                return res.status(500).json({ error: "Email already exists" });
            }
            return res.status(500).json({ error: err.message });
        });
    });
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ "personal_info.email": email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ error: "email not found" });
            }

            bcrypt.compare(password, user.personal_info.password, (err, result) => {
                if (err) {
                    return res.status(403).json({ error: "error occured while login please try again" });
                }
                if (!result) {
                    return res.status(403).json({ error: "Incorrect Password" });
                } else {
                    return res.status(200).json(formatDatatoSend(user));
                }
            });
        })
        .catch(err => {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        });
};

