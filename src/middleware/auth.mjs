import jwt from "jsonwebtoken";
import RegisteredStudents from "../models/regStudent.mjs";

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifyUser);

        const user = await RegisteredStudents.findOne({_id:verifyUser.id});
        const isTokenValid = user.tokens.some(({ token }) => token === token);

        if (isTokenValid === false) {
            throw new Error('Session has been expired.');
        }

        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        // res.status(401).send(error.message);
        // res.status(401).send("login required");
        res.status(401).redirect("/login-page");

        
    }
}
export default auth;