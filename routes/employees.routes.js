const express = require("express");
const { EmployeeModel } = require("../models/employee.model");
const { auth } = require("../middlewares/auth.middleware");
const EmployeeRouter = express.Router();
require("dotenv").config();
EmployeeRouter.use(express.json());
EmployeeRouter.use(auth);

EmployeeRouter.post("/employees", async (req, res) => {
    try {
        const newEmployee = new EmployeeModel({...req.body,date:Date()});
        await newEmployee.save();
        res.status(200).json({ msg: "User Added Succesfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

EmployeeRouter.get("/employees", async (req, res) => {

    const { page, department, sort, name } = req.query;
    console.log(req.query,"query");
    let query = {};
    let sortValue = "";
    if (department) { query.department = department }
    if (sort === "asc") { sortValue = 1 }
    else
        if (sort === "asc") { sortValue = -1 }

    if (name) {
        query.firstName = { name :{$regex:name}};
    }
    try {
        const employees = await EmployeeModel.find(query).sort({ salary: sortValue }).skip((page * 5) - 5).limit(5);
        res.status(200).json({ msg: "Succesfull!", employees });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

EmployeeRouter.delete("/employees", async (req, res) => {
    try {
        await EmployeeModel.findByIdAndDelete(re.body._id);
        res.status(200).json({ msg: "Employee details deleted successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})



EmployeeRouter.patch("/employees", async (req, res) => {
    try {
        await EmployeeModel.findByIdAndUpdate(re.body._id, req.body);
        res.status(200).json({ msg: "Employee details Updated successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})




module.exports = {
    EmployeeRouter
}