import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import { cookieJwtAuth } from "./middleware/cookieJwtAuth.js";
import { homeRouter } from "./routes/home.js";
import { authRouter } from "./routes/authenticate.js";
import { profileRouter } from "./routes/profile.js";


// initialises express
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

// sets up routes to use
app.use("/", homeRouter);
app.use("/authenticate", cookieJwtAuth, authRouter);
app.use("/profile", cookieJwtAuth, profileRouter);

// connects to database
mongoose.connect(
    "mongodb+srv://<mongodbconnectionlinkhere>"
    );

// starts server
app.listen(3001, () => {
    console.log("SERVER RUNNING!")
});
