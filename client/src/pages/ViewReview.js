import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";


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
            <div>
              <br></br>
              <h1><u>{review.title}</u></h1>
              <h1>Author: <Link to={"/profile/view/" + review.authorId}>{review.author}</Link>, {review.date}</h1>
              <h1>{review.game}, Rating: {review.rating} / 5</h1>
              <p>{review.text}</p>
              <br></br>
            </div>
          }
        </MainLayout>
    );
}

export default ViewReview;