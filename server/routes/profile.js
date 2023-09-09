import express from "express";

import { ReviewModel } from "../models/Reviews.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();


// view all created reviews and basic profile info
router.get("/view/:userId", async (req, res) => {

    var userReviews = []; // intialises empty review collection
    var author = {};

    // makes sure user is logged in before using resources
    if (req.user != undefined) {

        // finds all reviews selected user has created
        userReviews = await ReviewModel.find(
            {"authorId": req.params.userId}
        ).catch((error) => {});
        
        // finds user associated with reviews
        author = await UserModel.findOne(
            {"_id": req.params.userId}
        ).catch((error) => {});        
    }
    // sends these reviews to frontend
    res.json({"reviews": userReviews, "currentUser": req.user, "author": author});
})


// create review
router.post("/create-review", async (req, res) => {

    // gets data entered by user
    const { title, game, genre, rating, text } = req.body;

    // makes sure user has entered all fields
    if (title != "" && game != "" && genre != "" && rating != "" && text != "") {
        // checks to see if review with matching title exists
        const reviewExists = await ReviewModel.findOne(
            {"title": title}
        );

        // review with matching title does not exist
        if (!reviewExists) {
            // finds user that is currently logged in
            const user = await UserModel.findOne(
                {"_id": req.user.id},
            );
            
            // creates new review
            const newReview = new ReviewModel({
                authorId: user.id,
                author: user.username,
                date: new Date(),
                title: title,
                game: game,
                genre: genre,
                rating: rating,
                text: text,
            });

            // saves review to database
            await newReview.save();
            res.json({message: "SUCCESSFULLY CREATED REVIEW!", profile: user.id})

        // review with title entered does exist
        } else {
            res.json({message: "A REVIEW WITH THIS TITLE ALREADY EXISTS!"});
        }

    } else {
        res.json({message: "MISSING DETAILS!"})
    }
});


// delete review
router.post("/delete-review", async (req, res) => {

    // deletes review that user has chosen and checks correct user has chosen to delete
    try {
        await ReviewModel.findOneAndRemove(
            {"_id": req.body.reviewId}
        )
        res.json({message: "SUCCESSFULLY DELETED REVIEW!"})

    // user does not have permission to delete review
    } catch (err) {
        res.json({message: "ERROR!"})
    }
});


// logs user out of current session
router.post("/logout", async (req, res) => {

    res.clearCookie("token");
    res.json({message: "SUCCESSFULLY LOGGED OUT!"})
});


export { router as profileRouter };