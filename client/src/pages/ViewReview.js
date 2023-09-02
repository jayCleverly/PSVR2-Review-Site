import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";




// fix url deleting question marks
    // create ewrror checkers




// allows users to read a chosen review
function ViewReview() {

    // gets review title that has been chosen
    const reviewTitle  = useParams();
    const [review, setReview] = useState();

    // api call to load information about selected review
    useEffect(() => {
        axios.get("http://localhost:3001/view/" + reviewTitle.review).then((response) => {
          setReview(response.data);
        })
      }, [])


    return (
        <MainLayout>
          <div>
            <br></br>
            <h1>{review.title}</h1>
            <h1>Author: {review.author}, {review.date}</h1>
            <h1>{review.game}, Rating: {review.rating} / 5</h1>
            <p>{review.text}</p>
            <br></br>
          </div>
        </MainLayout>
    );
}

export default ViewReview;