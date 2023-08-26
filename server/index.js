const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(
    "mongodb+srv://jaycleverly:LegoMarvel10!@cluster0.4jcac9j.mongodb.net/reviewsite?retryWrites=true&w=majority"
    );

app.listen(3001, () => {
    console.log("SERVER RUNNING!")
});