const jwt = require("jsonwebtoken");
const express = require("express");


const auth = async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(req.headers, "req headers");
    try {

        if (token) {
            const decoded = jwt.verify(token, process.env.secretKey);
            if (decoded) {
                req.body.userId = decoded.userID;
                req.body.userEmail = decoded.userEmail;
                next();
            } else {
                res.status(200).json({ msg: "Invalid token!" })
            }

        } else {
            res.status(200).json({ msg: "Not Authorized!" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
module.exports = {
    auth
}