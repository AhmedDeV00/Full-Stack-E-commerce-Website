import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

// Register a New User

export const RegisterUSer = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json("USer Already exists!");
        }
        let cart = {};
        for (let i = 0; i < 1; i++) {
            cart[i] = 0;
        }
        const salt = await bcrypt.genSalt(10);
        const hachPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hachPassword,
            cartData: cart
        })
        await newUser.save();
        const token = jwt.sign({ id: newUser.id }, "secretkey");
        res.cookie("token", token, {
            httpOnly: true
        },)
        res.status(200).json({ user: newUser, message: "Registration successful!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create Try again." })
    }
}

// Login a User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json("Email or Password Invalid!");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json("Email or Password Invalid!");
        }
        const token = jwt.sign({ id: user.id }, "secretkey");
        res.cookie("token", token, { httpOnly: true, domain: "localhost", path: "/" });

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Login failed. Try again." });
    }
};