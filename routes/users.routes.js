const express = require("express");
const { UserModel } = require("../models/user.model");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
UserRouter.use(express.json());

UserRouter.post("/signup", async (req, res) => {
    const { password, confirmPassword } = req.body;
    try {
        if (confirmPassword === password) {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(200).json({ msg: err.message })
                } else {
                    const user = new UserModel({ ...req.body, password: hash });
                    await user.save();
                    res.status(200).json({ msg: "Succesfully Registered", user })
                }
            })
        } else {
            res.status(200).json({ msg: "Invalid Credentials" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })

    try {
        if (user.email) {

            bcrypt.compare(password, user.password, async (err, result) => {
                if (err) {
                    res.status(200).json({ msg: err.message })
                } else {
                    const token = jwt.sign({ userID: user._id, userEmail: user.email }, process.env.secretKey);
                    res.status(200).json({ msg: `Login Successful`, token });
                }
            })

        } else {
            res.status(200).json({ msg: "Email not registered" })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


module.exports = {
    UserRouter
}