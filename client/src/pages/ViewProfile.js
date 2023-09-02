import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";





    // create something to check if user is logged in before showing create / delete buttons
    // also something to delete reviews if user owns them




// front end allowing users to view other user's profiles, reviews
function ViewProfile() {

    // gets username of user that is being viewed
    const profileName = useParams();
    const [reviews, setReviews] = useState([]);

    // api call to get reviews chosen user has created
    useEffect(() => {
        axios.get("http://localhost:3001/profile/view/" + profileName.username).then((response) => {
          setReviews(response.data);
        })
      }, [])

    return (
        <MainLayout>
          
          <div>
            <br></br>
            <h1><u>{profileName.username}</u></h1>
            <br></br>

            <div className="reviews">
              {reviews.map((review) => {
                return (
                  <div>
                    <h1><Link to={"/view/" + review.title}>{review.title}, {review.date}</Link></h1>
                    <h1>{review.game}, Rating: {review.rating} / 5</h1>
                    <br></br>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
          <Link to={"/profile/create-review"}>Create Review</Link>
          </div>
        </MainLayout>
    );
}

export default ViewProfile;