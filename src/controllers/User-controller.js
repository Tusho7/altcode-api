import User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const signUp = async (req,res) => {
    const { email, password, username } = req.body;
    const file = req;

    if(!email || !password || !username) {
        return res.status(400).json({ error: "Enter all required fields." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
    }

    const exist = await User.findOne({ email });
    if(exist) {
        return res.status(400).json({ error: "An account with this email already exists." });
    }

    if(password.length < 8) {
        return res.status(400).json({ error: "Password should be at least 8 characters."})
    }

    if(username.length < 5) {
        return res.status(400).json({ error: "Username should be at least 5 characters long."})
    }

    const existingUsername = await User.findOne({ username });
    if(existingUsername) {
        return res.status(400).json({ error: "Username is already taken, please choose another one."})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        username,
        password: hashedPassword,
        avatar: "avatars/" + file.originalname,
        id: uuidv4(),
    })

    const saveUser = await newUser.save();

    res.status(201).send({ user: saveUser });
}