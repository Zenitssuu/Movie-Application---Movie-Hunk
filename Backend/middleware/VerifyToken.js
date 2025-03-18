import errorHandler from "../utils/errorhandler.js"
import jwt from "jsonwebtoken"

export const VerifyToken = (req, res, next) => {

    let token = req.cookies.token;
    if (!token) {
        console.log("No Tokon!")
        return next(errorHandler(401, "Login To Continue !"));
    }

    let result = jwt.verify(token, process.env.JWT_SECRET);
    if (!result) {
        console.log("Token Expired!")
        return next(errorHandler(401, "Login To Continue !"));
    }

    let user = jwt.decode(token);

    req.user = user;
    next();
}