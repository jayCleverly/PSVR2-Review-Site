import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { UserModel } from "../models/Users.js";

const router = express.Router();


// checks to see if user is already logged in before allowing them to authenticate
router.get("/auth-check", async (req, res) => {

    var loggedIn = false;

    // user is already logged in
    if (req.user != undefined) {
        loggedIn = true;
    }

    res.json({loggedIn, "user": req.user});
})


// login to account
router.post("/login", async (req, res) => {

    // gets data entered by user
    const { username, password } = req.body;

    // checks to see if entered details match an existing account
    const userExists = await UserModel.findOne(
        {"username": username}
    );

    // a user does exist with matching information
    if (userExists) {
        // compares password entered to stored password
        const passwordValid = await bcrypt.compare(password, userExists.password);

        // entered password does match
        if (!passwordValid) {
            // creates token so browser remembers user is logged in
            const token = jwt.sign({id: userExists._id}, "secretKey");
            // sends token to users browser
            res.cookie("token", token, {httpOnly: false});

            res.json({message: "LOGGED IN!"})

        // entered password does not match
        } else {
            res.json({message: "INCORRECT PASSWORD ENTERED!"});
        }

    // a user does not exist with matching information
    } else {
        res.json({message: "INCORRECT DETAILS!"});
    }
});


// create new account 
router.post("/sign-up", async (req, res) => {

    // gets data entered by user
    const { username, email, password } = req.body;
    
    // makes sure user has entered all details
    if (username != "" && email != "" && password != "") {
        // checks to see if entered details match an existing account
        const userExists = await UserModel.findOne({$or:
            [
                {"username": username},
                {"email": email}
            ] 
        });

        // a user does not exist with matching information
        if (!userExists) {
            // hashes password
            const hashedPassword = await bcrypt.hash(password, 12);
            // creates new user model with entered information
            const newUser = new UserModel({
                username: username,
                email: email,
                password: hashedPassword
            });

            // saves user to database
            await newUser.save();

            // creates token so browser remembers user is logged in
            const token = jwt.sign({id: newUser._id}, "secretKey");
            // sends token to users browser
            res.cookie("token", token, {httpOnly: false});
            
            res.json({message: "ACCOUNT CREATED!"})

        // a user does exist with matching information
        } else {
            res.json({message: "ACCOUNT ALREADY EXISTS WITH THIS INFORMATION!"});
        }

    } else {
        res.json({message: "MISSING DETAILS!"})
    }

});


export {router as authRouter};