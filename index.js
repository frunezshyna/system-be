//Need DOWNLOAD
//npm i dotenv
//npm i mongoose
//npm i express -y
//npm init -y

//npm i bcryptjs

//To Start
//nodemon index.js

//npm i jsonwebtoken

// Server Setup
const express = require("express");

// const port = 4000;
const mongoose = require("mongoose")
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRoutes = require("./routes/User-Routes.js");
const courseRoutes = require("../routes/Course-Routes.js");

//MongoDB Connection
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once("open",() => console.log(`Now connected to MongoDB Atlas`));

//Backend Routes
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

app.listen(process.env.PORT || 3000, () => console.log(`API is now connected on port ${process.env.PORT || 3000}`));
