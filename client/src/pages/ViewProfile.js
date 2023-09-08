import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";


// front end allowing users to view other user's profiles, reviews / users must be logged in
function ViewProfile() {

    // gets username of user that is being viewed
    const profileId = useParams();
    const [reviews, setReviews] = useState([]);

    const [currentUser, setCurrentUser] = useState({});
    const [author, setAuthor] = useState({});

    // api call to get reviews chosen user has created
    useEffect(() => {
        axios.get("http://localhost:3001/profile/view/" + profileId.userId).then((response) => {

          // user is logged in
          if (response.data.currentUser != undefined) {
            setCurrentUser(response.data.currentUser);
            setAuthor(response.data.author);
            setReviews(response.data.reviews);

          // user is not logged in
          } else {
            alert("MUST BE LOGGED IN TO VIEW THIS PROFILE!");
            window.location.href = "http://localhost:3000/authenticate/login";
          }
      })
    }, [])

    // api call to run backend logic for deleting a review
    const deleteReview = (reviewId) => {
      axios.post("http://localhost:3001/profile/delete-review", {reviewId}).then((response) => {
        alert(response.data.message);

        // review has been deleted successfully
        if (response.data.message == "SUCCESSFULLY DELETED REVIEW!") {
          window.location.href = "http://localhost:3000/profile/view/" + profileId.userId;
        }
      })
    }


    return (
        <MainLayout>
          
          {currentUser.id != undefined &&
            <div>
              <br></br>
              <h1><u>{author.username}'s Reviews</u></h1>
              <br></br>

              <div className="reviews">
                  {reviews.map((review) => {
                    return (
                      <div>
                        <h1><Link to={"/view/" + review._id}>{review.title}</Link>, {review.date}</h1>
                        <h1>{review.game}, Rating: {review.rating} / 5</h1>
                        
                        {currentUser.id == author._id &&
                          <button onClick={() => deleteReview(review._id)}>Delete</button>
                        }
                        <br></br>
                      </div>
                    );
                  })}
              </div>
            </div>
          }

          {currentUser.id == author._id && // checks to see if user logged in and author are same
            <div>
              <br></br>
              <br></br>
              <Link to={"/profile/create-review"}>Create Review</Link>
            </div>
          }

        </MainLayout>
    );
}

export default ViewProfile;