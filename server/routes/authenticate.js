import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { UserModel } from "../models/Users.js";

const router = express.Router();


// login to account
router.post("/login", async (req, res) => {
    // gets data entered by user
    const { username, password } = req.body;

    // checks to see if entered details match an existing account
    const userExists = await UserModel.findOne({$and:
        [
            {"username": username}
        ] 
    });

    // a user does not exist with matching information
    if (!userExists) {
        res.json({message: "NO ACCOUNT WITH MATCHING INFORMATION!"});

    // a user does exist with matching information
    } else {
        // compares password entered to stored password
        const passwordValid = await bcrypt.compare(password, userExists.password);

        // entered password does not match
        if (!passwordValid) {
            res.json({message: "INCORRECT DETAILS ENTERED!"});

        // entered password does match
        } else {
            // creates token so browser remembers user is logged in
            const token = jwt.sign({username: username}, "secretKey");
            res.json({message: "LOGGED IN!", token, username: username})
        }
    }
});


// create new account 
router.post("/sign-up", async (req, res) => {
    // gets data entered by user
    const { username, email, password } = req.body;

    // checks to see if entered details match an existing account
    const userExists = await UserModel.findOne({$or:
        [
            {"username": username},
            {"email": email}
        ] 
    });

    // a user does exist with matching information
    if (userExists) {
        res.json({message: "ACCOUNT ALREADY EXISTS WITH THIS INFORMATION!"});

    // a user does not exist with matching information
    } else {
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
        const token = jwt.sign({username: username}, "secretKey");
        res.json({message: "ACCOUNT CREATED!", token, username: username})
    }
});

export {router as authRouter};