import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from '../layout/MainLayout';

axios.defaults.withCredentials = true; // allows cookies to be stored


// the landing page of the website allowing users to see reviews and filter results
function Home() {

  // intitlaises hooks
  const [reviews, setReviews] = useState([]);
  const [genre, setGenre] = useState("all");

  // api request to load in reviews
  useEffect(() => {
    axios.get("http://localhost:3001/").then((response) => {
      setReviews(response.data.reviews);
      setGenre(response.data.genre); // gets genre user had chosen
      document.getElementById("genreChoice").value = response.data.genre; // sets default value to chosen genre
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
            <h2>Choose a genre to view reviews for:</h2>
            <select id="genreChoice" onChange={(event) => {filter(event.target.value)}}>
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

          <br></br>

          <div className="home-reviews">
            <h1>Reviews for {genre} games:</h1>
            <br></br>

            {reviews.map((review) => {
              return (
                <div>
                  <h1><Link to={"/view/" + review.title}>{review.title}</Link></h1>
                  <h1>Author: {review.author}, {review.date}</h1>
                  <h1>{review.game}, Rating: {review.rating} / 5</h1>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      </MainLayout>

  );
}

export default Home;
