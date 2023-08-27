import express from "express";

import { ReviewModel } from "../models/Reviews.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();


// view all created reviews and basic profile info
router.get("/", async (req, res) => {

    // gets current user logged in
    const user = await UserModel.findOne(
        {"_id": req.user.id}
    )

    // finds all reviews current user has created
    const existingReviews = await ReviewModel.find(
        {"authorId": req.user.id}
    )
    // sends these reviews to frontend
    res.json({username: user.username, reviews: existingReviews});
})


// create review
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
            {"_id": req.user.id},
        );

        // formats data to be more understandable
        var date = new Date();
        var date = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
        
        // creates new review
        const newReview = new ReviewModel({
            authorId: user.id,
            author: user.username,
            date: date,
            title: title,
            game: game,
            rating: rating,
            text: text,
            likes: 0
        });

        // saves review to database
        await newReview.save();
        res.json({message: "SUCCESSFULLY CREATED REVIEW!"})
    }
});


// delete review
router.get("/delete-review", async (req, res) => {
    // deletes review that user has chosen and checks correct user has chosen to delete
    try {
        await ReviewModel.findOneAndRemove({$and:
            [
                {"title": req.body.title},
                {"authorId": req.user.id}
            ] 
        })
        res.json({message: "SUCCESSFULLY DELETED REVIEW!"})

    // user does not have permission to delete review
    } catch (err) {
        res.json({message: "ERROR!"})
    }
});


export { router as profileRouter };