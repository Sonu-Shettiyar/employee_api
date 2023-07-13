const express = require("express");
const { connection } = require("./db");
const { UserRouter } = require("./routes/users.routes");
const { EmployeeRouter } = require("./routes/employees.routes");
const app = express();
const cors = require("cors")
app.use(express.json());
require("dotenv").config()
app.use(cors());
app.use("/users", UserRouter);
app.use("/", EmployeeRouter);


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("DB connected")
        console.log(`Successfully runnig on Port ${process.env.port}`)
    } catch (error) {
        console.log(error.message)
    }
})