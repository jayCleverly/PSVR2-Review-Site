import jwt from "jsonwebtoken";


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
    }
}


export { cookieJwtAuth };