import express from "express";

import { ReviewModel } from "../models/Reviews.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();


// view a selection of reviews
router.get("/", async (req, res) => {

    var userSortChoice = req.body.sortBy;
    // user has not selected to sort reviews by a specific value
    if (userSortChoice == null) {
        userSortChoice = "date";
    }

    var reviews = [];
    // the user has asked to see specific reviews
    if (req.cookies.reviews != null) {
        reviews = await ReviewModel.find({"_id": {$in: req.cookies.reviews}}).sort("-" + userSortChoice);

    // the user has not asked to see specific reviews
    } else {
        reviews = await ReviewModel.find({}).sort("-" + userSortChoice);
    }

    res.json(reviews);
})


// select all reviews with a particular genre
router.get("/search", async (req, res) => {

    // user has entered a value for the genre they want to view
    if (req.body.genre != null) {
        var reviewQuery;

        // user wants to go back to viewing all reviews
        if (req.body.genre == "all") {
            reviewQuery = await ReviewModel.find({}, "_id");

        // user wants to view reviews for a specific genre
        } else {
            reviewQuery = await ReviewModel.find({"genre": req.body.genre}, "_id");
        }

        // formats query results into array
        var idList = [];
        for (var review of reviewQuery) { 
            idList.push(review._id);
        };

        // sends token to users browser
        res.cookie("reviews", idList, {httpOnly: true});
        res.redirect("/");
    
    // user has not entered value for genre
    } else {
        res.json({});
    }
})


// view selected review, allowing user to read in more detail
router.get("/view-:review", async (req, res) => {

    // gets review
    const review = await ReviewModel.findOne(
        {"title": req.params.review}
    );

    // sends review data to frontend
    res.json(review);
})


export { router as homeRouter };