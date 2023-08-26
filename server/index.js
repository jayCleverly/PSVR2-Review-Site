const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(
    "mongodb+srv://jaycleverly:LegoMarvel10!@cluster0.4jcac9j.mongodb.net/reviewsite?retryWrites=true&w=majority"
    );

app.listen(3001, () => {
    console.log("SERVER RUNNING!")
});

require("./routes")(app);