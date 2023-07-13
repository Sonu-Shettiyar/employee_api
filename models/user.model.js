const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: String,
    password: String,
}, {
    versionKey:false
})

const UserModel = mongoose.model("user", userSchema);
module.exports = {
    UserModel
}


// {
//     "email":"sonu@gmail.com",
//     "password":"sonu",
//     "confirmPassword":"sonu"
//     }