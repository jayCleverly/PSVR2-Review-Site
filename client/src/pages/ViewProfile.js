import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import "../style/ViewProfile.css";


// front end allowing users to view other user's profiles, reviews / users must be logged in
function ViewProfile() {

    // gets username of user that is being viewed
    const profileId = useParams();
    const [reviews, setReviews] = useState([]);
    const [author, setAuthor] = useState({});
    const [currentUser, setCurrentUser] = useState({});


    // api call to get reviews chosen user has created
    useEffect(() => {
        axios.get("http://localhost:3001/profile/view/" + profileId.userId).then((response) => {

          // profile does exist
          if (response.data.author != undefined) {
            setCurrentUser(response.data.currentUser);
            setAuthor(response.data.author);
            setReviews(response.data.reviews);

          // profile does not exist
          } else {
            window.location.href = "http://localhost:3000/";
            alert("PROFILE DOES NOT EXIST");
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
          
          {author._id != undefined && // makes sure profile exists
            <>
              <div class="profile">
                <br></br>
                <h1><u>{author.username}'s Reviews</u></h1>
                <br></br>

                {currentUser != undefined && currentUser.id == author._id && // checks to see if user logged in and author are same
                  <div>
                    <h2><Link to={"/profile/create-review"}>Create Review</Link></h2>
                  </div>
                }

                <hr></hr>

                <div>
                    <br></br>
                    {reviews.map((review) => {
                      return (
                        <div class="review">
                          <h2><Link to={"/view/" + review._id}>{review.title}</Link></h2>
                          <h2>Author: <Link to={"/profile/view/" + review.authorId}>{review.author}</Link></h2>
                          <h2>Game: {review.game}, Rating: {review.rating} / 5</h2>
                          
                          {currentUser != undefined && currentUser.id == author._id && // checks to see if user logged in and author are same
                            <button onClick={() => deleteReview(review._id)}>Delete</button>
                          }
                          <br></br>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          }

        </MainLayout>
    );
}

export default ViewProfile;