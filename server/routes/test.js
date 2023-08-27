import express from "express";

import { ReviewModel } from "../models/Reviews.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();


// login to account
router.get("/create-review", async (req, res) => {
    // gets data entered by user
    const { title, game, rating, text } = req.body;

    // checks to see if review with matching title exists
    const reviewExists = await ReviewModel.findOne(
        {"title": title}
    );

    // review with matching title exists
    if (reviewExists) {
        res.json({message: "A REVIEW WITH THIS TITLE ALREADY EXISTS!"});

    // review with title entered does not exist
    } else {
        // finds user that is currently logged in
        const user = await UserModel.findOne(
            {"_id": req.user.id}
        );

        // fills in missing values
        var author = user.username;
        var date = new Date();
        var date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        
        // creates new review
        const newReview = new ReviewModel({
            author: author,
            date: date,
            title: title,
            game: game,
            rating: rating,
            text: text
        });

        // saves review to database
        await newReview.save();
        res.json({message: "SUCCESSFULLY CREATED REVIEW!"})
    }
});

export { router as testRouter };