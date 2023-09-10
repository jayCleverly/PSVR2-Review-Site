import { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import "../style/CreateReview.css"


// the front end side to create a review and store in the database
function CreateReview() {

    // intitlaises hooks for data the user will enter
    const [title, setTitle] = useState("");
    const [game, setGame] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    
    // api call to check if user is logged in
    useEffect(() => {
        axios.get("http://localhost:3001/authenticate/auth-check").then((response) => {
  
          // user is logged in
          if (response.data.loggedIn) {
            setLoggedIn(true);

          // user is not logged in
          } else {
            window.location.href = "http://localhost:3000/authenticate/login";
            alert("NOT LOGGED IN!");
          }
        })
      }, [])


    // api request to the backend calling relevant endpoint
    const createReview = () => {
        axios.post("http://localhost:3001/profile/create-review", {title, game, genre, rating, text}).then((response) => {
          alert(response.data.message);
          
          // makes sure everything is correct and sends user back to profile
          if (response.data.message == "SUCCESSFULLY CREATED REVIEW!") {
            window.location.href = "http://localhost:3000/profile/view/" + response.data.profile;
          }
        })
    }

    return (
        <MainLayout>
          <h1>Create a review:</h1>
          <hr></hr>
          {loggedIn && // make sure user is logged in before allowing them to create a review
            <div class="create-review">
          
              <input type="text" placeholder="Title.." 
              onChange={(event) => setTitle(event.target.value)} required></input>
 
              <input type="text" placeholder="Game.." 
              onChange={(event) => setGame(event.target.value)} required></input>

              <select class="genre-choice" id="genreChoice" onChange={(event) => {setGenre(event.target.value)}}>
                <option value="" disabled selected>Genre..</option>
                <option value="racing">Racing</option>
                <option value="shooter">Shooter</option>
                <option value="sports">Sports</option>
                <option value="horror">Horror</option>
                <option value="adventure">Adventure</option>
                <option value="action">Action</option>
                <option value="casual">Casual</option>
                <option value="role-play">Role Play</option>
              </select>

              <select class="genre-choice" id="ratingChoice" onChange={(event) => {setRating(event.target.value)}}>
                <option value="" disabled selected>Rating..</option>
                <option value={1}>1 / 5</option>
                <option value={2}>2 / 5</option>
                <option value={3}>3 / 5</option>
                <option value={4}>4 / 5</option>
                <option value={5}>5 / 5</option>
              </select>

              <textarea type="text" rows="9" placeholder="Review.." 
              onChange={(event) => setText(event.target.value)} required></textarea>

              <button onClick={createReview}>Create</button>
            </div>
          }
        </MainLayout>
    );
}

export default CreateReview;