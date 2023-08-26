import express from "express";
import mongoose from "mongoose";

import { authRouter } from "./routes/authenticate.js";

// initialises express
const app = express();
app.use(express.json());

// sets up routes to use
app.use("/authenticate", authRouter);

// connects to database
mongoose.connect(
    "mongodb+srv://jaycleverly:LegoMarvel10!@cluster0.4jcac9j.mongodb.net/reviewsite?retryWrites=true&w=majority"
    );

// starts server
app.listen(3001, () => {
    console.log("SERVER RUNNING!")
});
