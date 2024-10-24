import jwt from "jsonwebtoken";
import 'dotenv/config';


export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        console.log("no token");
        return res.status(401).json("no token provided!")
    }
    jwt.verify(token, process.env.JWT_SEKRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json("Invalid Token")
        }
        req.user = user;
        next();
    })
}
