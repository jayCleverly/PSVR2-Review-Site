import jwt from "jsonwebtoken";


// middleware designed to check if a user is authenticated
const cookieJwtAuth = (req, res, next) => {

    // gets token from browser
    const token = req.cookies.token;

    try {
        // verifys that token is correct
        const user = jwt.verify(token, "secretKey");
        // sends user value back to browser
        req.user = user;
        next();

    } catch (err) {
        // gets rid of token as it is not correct
        res.clearCookie("token");
        next();
    }
}


export { cookieJwtAuth };