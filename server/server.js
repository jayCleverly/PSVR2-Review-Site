import express from "express";
import mongoose from "mongoose";

import { authRouter } from "./routes/authenticate.js";

const app = express();
app.use(express.json());

app.use("/authenticate", authRouter);

mongoose.connect(
    "mongodb+srv://jaycleverly:LegoMarvel10!@cluster0.4jcac9j.mongodb.net/reviewsite?retryWrites=true&w=majority"
    );

app.listen(3001, () => {
    console.log("SERVER RUNNING!")
});
