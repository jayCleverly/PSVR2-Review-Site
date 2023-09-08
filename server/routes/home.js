import express from "express";

import { ReviewModel } from "../models/Reviews.js";

const router = express.Router();


// view a selection of reviews
router.get("/", async (req, res) => {
    
    const reviewGenre = req.cookies.reviewGenre; // game genre the user wants to view reviews for

    var reviews = [];
    // the user has asked to see specific reviews
    if (reviewGenre != null && reviewGenre != "all") {
        reviews = await ReviewModel.find({"genre": reviewGenre}).sort({date: -1});;

    // the user has not asked to see specific reviews
    } else if (reviewGenre == null || reviewGenre == "all") {
        reviews = await ReviewModel.find({}).sort({date: -1});;
        if (reviewGenre != "all") { reviewGenre = "all" }; // makes sure genre is set to a value
    }

    res.json({"reviews":reviews, "genre":reviewGenre});
})


// select all reviews with a particular genre
router.post("/filter", async (req, res) => {

    // sends token to users browser
    res.cookie("reviewGenre", req.body.genre, {httpOnly: false});
    res.json();
})


// view selected review, allowing user to read in more detail
router.get("/view/:review", async (req, res) => {

    // gets review
    const review = await ReviewModel.findOne(
        {"title": req.params.review}
    );

    // sends review data to frontend
    res.json(review);
})


export { router as homeRouter };