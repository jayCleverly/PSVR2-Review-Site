import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import "../style/ViewReview.css"


// allows users to read a chosen review
function ViewReview() {

    // gets review title that has been chosen
    const reviewId  = useParams(0);
    const [review, setReview] = useState({});

    
    // api call to load information about selected review
    useEffect(() => {
      axios.post("http://localhost:3001/view/" + reviewId.reviewId).then((response) => {
      
      // checks that a review does exist with given id
      if (response.data.message == "SUCCESS!") {
        setReview(response.data.review);

      // review does not exist with entered id
      } else {
        window.location.href = "http://localhost:3000/";
        alert(response.data.message);
      }
      })
    }, [])


    return (
        <MainLayout>
          {typeof(review.title) == "string" && // checks that loaded review is not empty object
            <div class="view-review">
              <br></br>
              <h1><u>{review.title}</u></h1>
              <h2>Author: <Link to={"/profile/view/" + review.authorId}>{review.author}</Link>, {review.date.split("T")[0]}</h2>
              <h2>Game: {review.game}, Rating: {review.rating} / 5</h2>
              <p>{review.text}</p>
              <br></br>
            </div>
          }
        </MainLayout>
    );
}

export default ViewReview;