import mongoose, { mongo } from "mongoose";

// defines new blueprint for a review
const ReviewSchema = new mongoose.Schema({

    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    game: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    text: {
        type: String,
        required: true
    },
    likes: {
        type: Number
    }
})

// creates a model of blueprint
const ReviewModel = mongoose.model("reviews", ReviewSchema);
export { ReviewModel };