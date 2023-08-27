import express from "express";

import { ReviewModel } from "../models/Reviews.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();


// view all created reviews from all users
router.get("/", async (req, res) => {
    // sorts reviews (if they exist) in whatever order the user chooses
    const reviews = await ReviewModel.find({}).sort("-" + req.body.sortBy);
    
    res.json(reviews);
})


export { router as homeRouter };