import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from '../layout/MainLayout';
import "../style/Home.css";


axios.defaults.withCredentials = true; // allows cookies to be stored


// the landing page of the website allowing users to see reviews and filter results
function Home() {

  // intitlaises hooks
  const [reviews, setReviews] = useState([]);
  const [genre, setGenre] = useState("all");

  
  // api request to load in reviews
  useEffect(() => {
    axios.get("http://localhost:3001/").then((response) => {
      setReviews(response.data.reviews); // loads reviews
      setGenre(response.data.genre); // gets genre user had chosen
    })
  }, [])

  // function that calls endpoint to create a cookie with a selected genre the user wants to view
  const filter = (genre) => {
    setGenre(genre); // sets genre
    axios.post("http://localhost:3001/filter", {genre}).then((response) => {
      window.location.href = "http://localhost:3000/";
    })
  }

  return (
      <MainLayout>
        <div className="home-filter">
          <div>
            <h1>Choose a genre to view reviews for:</h1>
            <select class="genre-choice" id="genreChoice" onChange={(event) => {filter(event.target.value)}} value={genre}>
              <option value="all">All</option>
              <option value="racing">Racing</option>
              <option value="shooter">Shooter</option>
              <option value="sports">Sports</option>
              <option value="horror">Horror</option>
              <option value="adventure">Adventure</option>
              <option value="action">Action</option>
              <option value="casual">Casual</option>
              <option value="role-play">Role Play</option>
            </select>
          </div>
          <hr></hr>
        </div>

        <br></br>

        <div className="home-reviews">
          <br></br>
          {reviews.map((review) => {
            return (
              <div class="review">
                <h2><Link to={"/view/" + review._id}>{review.title}</Link></h2>
                <h2>Author: <Link to={"/profile/view/" + review.authorId}>{review.author}</Link></h2>
                <h2>Game: {review.game}, Rating: {review.rating} / 5</h2>
              </div>
            );
          })}
        </div>
      </MainLayout>

  );
}

export default Home;
