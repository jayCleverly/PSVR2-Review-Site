import React from "react";
import { useState } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";



// make something that doesnt allow users to come to this page if they are already logged in



// the front end side to create a review and store in the database
function CreateReview() {

    // intitlaises hooks for data the user will enter
    const [title, setTitle] = useState("");
    const [game, setGame] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");

    // api request to the backend calling relevant endpoint
    const createReview = () => {
        axios.post("http://localhost:3001/profile/create-review", {title, game, genre, rating, text}).then((response) => {
          alert(response.data.message);
          
          // makes sure everything is correct
          if (response.data.message == "SUCCESSFULLY CREATED REVIEW!") {
            window.location.href = "http://localhost:3000/";
          }
        })
    }

    return (
        <MainLayout>
          <input type="text" placeholder="Title.." 
            onChange={(event) => setTitle(event.target.value)} required></input>
          <input type="text" placeholder="Game.." 
            onChange={(event) => setGame(event.target.value)} required></input>
          <input type="text" placeholder="Genre.."                                                  // make something here that only allows uer to select from a few options
            onChange={(event) => setGenre(event.target.value)} required></input>
          <input type="number" placeholder="Rating.."                                                   // make something here the same as above - few options
            onChange={(event) => setRating(event.target.value)} required></input>
          <input type="text" placeholder="Text.." 
            onChange={(event) => setText(event.target.value)} required></input>

          <button onClick={createReview}>Create</button>
        </MainLayout>
    );
}

export default CreateReview;